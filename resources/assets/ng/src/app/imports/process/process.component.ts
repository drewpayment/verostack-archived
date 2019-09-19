import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FileUploader } from 'ad-file-upload';
import { Spreadsheet } from 'dhx-spreadsheet';
import { ISheetData, IStyle, IDataCell, DailySale, ImportModel, 
    ImportModelMap, DailySaleMapType, User, GeocodingRequest, GeocodingResponse, DncContact, 
    DncContactRequest, ContactType, DailySaleRequest, IAgent, SaleStatus, PaidStatusType, SpreadsheetSerialized, ReportImport } from '@app/models';
import { Moment } from 'moment';
import * as moment from 'moment';
import { SessionService } from '@app/session.service';
import { ImportsService } from '../imports.service';
import { Contact, ContactRequest } from '@app/models/contact.model';
import { Observable, Subscription, Observer, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactService } from '@app/contact/contact.service';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';
import { AgentService } from '@app/agent/agent.service';

@Component({
    selector: 'vs-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, OnDestroy {

    fu = new FileUploader({
        url: null,
        autoUpload: false,
        allowedFileType: ['csv', 'xsl', 'xslx'],
    });
    hasFile = false;
    @ViewChild('fuRef', { static: false }) fileUploadElement: ElementRef;

    @ViewChild('spreadsheet', { static: false }) spreadsheetContainer: ElementRef;
    ss: Spreadsheet;

    currentlyViewedWb: number;
    workbooksToReview: ISheetData[] = [];
    styles: IStyle[];
    selectedImportModel: ImportModel;
    reportImportName: string;
    reportImports: ReportImport[];
    user: User;
    _agents: Observable<IAgent[]>;

    saleType = {
        agentId: DailySaleMapType[DailySaleMapType.salesAgentId],
        agentName: DailySaleMapType[DailySaleMapType.salesAgentName],
        podAccount: DailySaleMapType[DailySaleMapType.podAccount],
        utilityName: DailySaleMapType[DailySaleMapType.utilityName],
        saleDate: DailySaleMapType[DailySaleMapType.saleDate],
        firstName: DailySaleMapType[DailySaleMapType.contactFirstName],
        lastName: DailySaleMapType[DailySaleMapType.contactLastName],
        businessName: DailySaleMapType[DailySaleMapType.contactBusinessName],
        address: DailySaleMapType[DailySaleMapType.contactStreet],
        address2: DailySaleMapType[DailySaleMapType.contactStreet2],
        city: DailySaleMapType[DailySaleMapType.contactCity],
        state: DailySaleMapType[DailySaleMapType.contactState],
        zip: DailySaleMapType[DailySaleMapType.contactZip]
    };
    
    contactIdSub: Subscription;
    dtos = [] as DailySale[];

    constructor(
        private cd: ChangeDetectorRef, 
        private session: SessionService, 
        private service: ImportsService,
        private contactService: ContactService,
        private saleService: DailySaleTrackerService,
        private agentsService: AgentService        
    ) { }

    ngOnInit() {
        this.session.getUserItem().subscribe(u => this.user = u);
        this.agentsService.fetchGraphqlAgents();
        this.saleService.getReportImports().subscribe(r => this.reportImports = r.data.reportImports);
    }

    ngOnDestroy() {
        if (this.contactIdSub) this.contactIdSub.unsubscribe();
    }

    fileAddedHandler(item: FileList) {
        const file = item.item(0);
        this.reportImportName = file.name.split('.').shift();
        const ext = file.name.split('.').pop();


        if (ext == 'csv' || ext == 'xsl' || ext == 'xlsx') {
            const workerUrl = window.URL.createObjectURL(new Blob([
                'importScripts("https://cdn.dhtmlx.com/libs/excel2json/1.0/worker.js")',
            ], { type: 'text/javascript' }));
            const worker = new Worker(workerUrl);
            
            worker.postMessage({
                type: 'convert',
                data: file
            });

            worker.addEventListener('message', (e) => {
                if (e.data.type === 'ready') {
                    this.hasFile = true;
                    this.cd.detectChanges();

                    this.workbooksToReview = e.data.data as ISheetData[];
                    this.styles = e.data.styles as IStyle[];

                    this.currentlyViewedWb = 0;
                    this.loadWorkbook(this.workbooksToReview[this.currentlyViewedWb]);
                }
            });
            
        }

        
    }

    loadWorkbook(wb: ISheetData) {
        this.ss = new Spreadsheet(this.spreadsheetContainer.nativeElement, {
            menu: true,
            editLine: false,
            rowsCount: wb.rows.length,
            colsCount: wb.cols.length,
            autoFormat: false,
        });
        
        const data = {
            data: [],
            styles: {}
        };
        wb.cells.forEach((row, i) => {
            row.forEach((col, j) => {
                const cellLetters = this.getCellLetter(j);
                const rowNo = (i + 1);
                const cellDest = `${cellLetters}${rowNo}`;
                const styleClassName = `spreadsheet-${cellDest}`;
                const cellValue = this.autoFormat(col);

                data.data.push({
                    cell: cellDest,
                    value: cellValue,
                    css: styleClassName,
                });

                if (col) {
                    data.styles[styleClassName] = this.styles[col.s];
                }
            });
        });
        
        this.ss.parse(data);
    }

    /**
     * Evaluates the column to check if it's a number attempts to remove any zero-decimals
     * because the spreadsheet library turns integers into doubles and leaves ".0" at the end 
     * of all integers.... wrecking formatting of account numbers, etc.
     */
    private autoFormat(col: IDataCell): String {
        // if the col is not null, the value is not null and the value is a number
        if (col && col.v && !isNaN((<any>col.v))) {
            const numSplit = col.v.toString().split('.');
            // the number after the decimal is not '00'
            if ((<any>numSplit[numSplit.length - 1]) > 0) {
                return col.v;
            } else { // this is a number like '##.0' and should be considered an integer
                const formattedDate = this.excelDateToMoment(<any>numSplit[0]);

                if (formattedDate) return formattedDate.format('MM-DD-YYYY');

                return numSplit[0]; 
            }
        } else if (col) {
            return col.v;
        }
        return null;
    }

    private excelDateToMoment(serial: number): Moment {
        const utcDays = Math.floor(serial - 25569);
        const utcValue = utcDays * 86400;
        const dateInfo = moment(utcValue * 1000);
        if (!dateInfo.isValid()) return null;
        // TODO: Not the best way to do this... there is still a chance that some number converted to a moment date
        if (dateInfo.isBefore(moment().subtract(1, 'year'), 'day') || dateInfo.isAfter(moment(), 'day')) {
            return null;
        }
        const fractionalDay = serial - Math.floor(serial) + 0.0000001;
        let totalSeconds = Math.floor(86400 * fractionalDay);
        const seconds = totalSeconds % 60;
        totalSeconds -= seconds;
        const hours = Math.floor(totalSeconds / (60 * 60));
        const minutes = Math.floor(totalSeconds / 60) % 60;
        return dateInfo.hour(hours).minute(minutes).second(seconds);
    }

    private getCellLetter(index: number) {
        const adjIdx = index + 1;
        const dict = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
            'u', 'v', 'w', 'x', 'y', 'z'];

        if (adjIdx > dict.length && ((adjIdx % dict.length) % dict.length)) {
            const firstLetter = Math.floor((index + 1) / dict.length) - 1;
            const secondLetter = (adjIdx % dict.length) % dict.length - 1;
            return `${dict[firstLetter]}${dict[secondLetter]}`;
        } else if (adjIdx > dict.length) {
            const firstLetter = adjIdx % dict.length;
            const secondLetter = Math.floor((adjIdx - 1) % dict.length);
            return `${dict[firstLetter]}${dict[secondLetter]}`;
        }

        return `${dict[index]}`;
    }

    uploadFile() {
        this.fileUploadElement.nativeElement.click();
    }

    importReport() {
        if (!this.hasFile) return;

        const ssData = this.ss.serialize() as SpreadsheetSerialized;
        // console.dir(ssData);
        const rowsCount = this.ss._sizes.rowsCount;
        const colsCount = this.ss._sizes.colsCount;

        const map = JSON.parse(this.selectedImportModel.map) as ImportModelMap[];

        // get headers
        const headerMap = [] as {
            colName: string,
            mapName: string,
            value: string,
            fieldType: DailySaleMapType
        }[];
        for (let i = 0; i < colsCount; i++) {
            const val = ssData.data[i].value;
            const m = map.find(x => x.value == val);

            if (m) {
                headerMap.push({
                    colName: m.value,
                    mapName: m.key,
                    value: i.toString(),
                    fieldType: m.fieldType
                });
            }
        }

        const sales = [] as {[key: string]: any}[];
        for (let r = 0; r < rowsCount; r++) {
            const rowStart = (colsCount * r);
            if (rowStart == 0) continue;
            
            const sale = {
                clientId: this.user.sessionUser.sessionClient,
            } as DailySale;
            for (let i = 0; i < headerMap.length; i++) {
                const header = headerMap[i];
                const index = rowStart + +header.value;
                const item = ssData.data[index];

                if (item) sale[DailySaleMapType[header.fieldType]] = item.value;
            }
            
            if (Object.keys(sale).length > 1) sales.push(sale);
        }

        this.processSales(sales).subscribe((res) => {
            if (res) console.dir(this.dtos);


            const importModelId = this.selectedImportModel.importModelId;
            const dto: ReportImport = {
                importModelId: importModelId,
                name: this.reportImportName
            };
            
            this.saleService.saveReportImport(dto).subscribe(result => {
                const saved = result.data.saveReportImport;
                const exists = this.reportImports.findIndex(ri => ri.reportImportId == saved.reportImportId);

                if (exists) {
                    this.reportImports[exists] = saved;
                } else {
                    this.reportImports.push(saved);
                }
            });
        });
    }

    private processSales(sales: {[key: string]: any}[]): Observable<DailySale[]> {
        return Observable.create((ob: Observer<DailySale[]>) => {
            const joins:Observable<DailySale>[] = [];
            sales.forEach((s) => {
                const d = {} as DailySale;
                joins.push(this.buildDailySale(s, d));
            });

            forkJoin(joins).subscribe(sales => {
                const dncDtos: DncContactRequest[] = this.pendingContactQueue.map(p => {
                    const req: DncContactRequest = {
                        first_name: p.firstName,
                        last_name: p.lastName,
                        address: p.street,
                        city: p.city,
                        state: p.state,
                        zip: `${p.zip}`,
                    };

                    if (p.street2) req.address_cont = p.street2;
                    
                    return req;
                });

                // Save contacts
                forkJoin(
                    this.saveContacts(this.pendingContactQueue),
                    this.saveDncContacts(dncDtos),
                    this.getSaleStatuses()
                ).subscribe((resp: any[]) => {
                    const contacts: Contact[] = resp[0];
                    const statuses = resp[2] as SaleStatus[];
                    const sd: DailySaleRequest[] = [];
                    const agents = this.agentsService.agents$.getValue();
                    
                    sales.forEach((s, i, a) => {
                        a[i].contactId = contacts[i].contactId;

                        const selectedAgent = agents.find(a => a.salesPairings.find(sp => sp.salesId == `${s.agentId}`) != null);
                        if (!selectedAgent) return;

                        sd.push({
                            campaign_id: s.campaignId,
                            utility_id: s.utilityId,
                            agent_id: selectedAgent.agentId,
                            sale_date: moment(s.saleDate, 'MM-DD-YYYY').format('YYYY-MM-DD HH:mm:ss'),
                            last_touch_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                            contact_id: contacts[i].contactId,
                            pod_account: s.podAccount,
                            status: this.guessSaleStatus(statuses, `${s.saleStatus}`),
                            paid_status: s.paidStatus || PaidStatusType.unpaid,
                            has_geo: true
                        });
                    });

                    if (sd.length) {
                        this.saleService.saveSalesList(sd).subscribe(resp => {
                            const sales = resp.data.saveDailySales;
                            console.dir(sales);

                            ob.next(sales);
                            ob.complete();
                        });
                    } else {
                        ob.next([]);
                        ob.complete();
                    }
                });
            }, err => {
                ob.next([]);
                ob.complete();
            });
        });
    }

    private guessSaleStatus(statuses: SaleStatus[], input: string): number {
        statuses.forEach((s, i, a) => {
            if (input.trim().toLowerCase().includes(s.name.toLowerCase())) {
                return s.saleStatusId;
            }
        });

        const acceptedStatus = statuses.find(s => s.name.toLowerCase().includes('accept'));
        if (acceptedStatus) return acceptedStatus.saleStatusId;

        // unable to find any similar types, so we are going to return -1.
        return -1;
    }

    private getSaleStatuses(): Observable<SaleStatus[]> {
        return Observable.create((o: Observer<SaleStatus[]>) => {
            this.saleService.getSaleStatuses().subscribe(resp => {
                const statuses = resp.data.saleStatuses;
                o.next(statuses);
                o.complete();
            });
        });
    }

    private saveContacts(pending: Contact[]): Observable<Contact[]> {
        return Observable.create((o: Observer<Contact[]>) => {
            const dtos: ContactRequest[] = [];

            pending.forEach((p, i, a) => {
                const dto = {
                    first_name: p.firstName,
                    last_name: p.lastName,
                    contact_type: p.businessName ? ContactType.business : ContactType.residential,
                    street: p.street,
                    city: p.city,
                    state: p.state,
                    zip: `${p.zip}`,
                } as ContactRequest;
                
                if (p.businessName) dto.business_name = p.businessName;
                if (p.street2) dto.street2 = p.street2;
                if (p.dob) dto.dob = p.dob;
                if (p.email) dto.email = p.email;
                if (p.fax) dto.fax = p.fax;
                if (p.phone) dto.phone = p.phone;
                if (p.middleName) dto.middle_name = p.middleName;
                if (p.prefix) dto.prefix = p.prefix;
                if (p.ssn) dto.ssn = p.ssn;
                if (p.suffix) dto.suffix = p.suffix;

                dtos.push(dto);
            });

            if (dtos.length) {
                this.contactService.saveContactList(dtos)
                    .subscribe(resp => {
                        const contacts = resp.data.newContactList;
                        o.next(contacts);
                        o.complete();
                    });
            } else {
                o.next([]);
                o.complete();
            }
        });
    }

    private saveDncContacts(dtos: DncContactRequest[]): Observable<DncContact[]> {
        return Observable.create((ob: Observer<DncContact[]>) => {
            const joins: Observable<GeocodingResponse>[] = [];
            dtos.forEach((d, i, a) => {
                const req: GeocodingRequest = {
                    address: d.address, 
                    city: d.city,
                    state: d.state
                };
                joins.push(this.contactService.getGeocoding(req));
            });

            forkJoin(joins).subscribe(geocodingResponseList => {
                geocodingResponseList.forEach((g, ii, aa) => {
                    dtos[ii].lat = g.results[0].geometry.location.lat;
                    dtos[ii].long = g.results[0].geometry.location.lng;
                    dtos[ii].geocode = JSON.stringify(g.results[0].geometry);
                });

                this.contactService.saveDncContactList(dtos)
                    .subscribe(resp => {
                        const dncs = resp.data.newDncContactList;
                        ob.next(dncs);
                        ob.complete();
                    });
            });
        });
    }

    private buildDailySale(s: { [key: string]: any }, d: DailySale): Observable<DailySale> {
        return Observable.create((ob: Observer<DailySale>) => {
            for (const p in s) {
                switch (p) {
                    case this.saleType.agentId: 
                        d.agentId = s[p];
                        break;
                    case this.saleType.podAccount:
                        d.podAccount = s[p];
                        break;
                    case this.saleType.utilityName: 
                        const cmp = this.selectedImportModel.campaign;
                        if (cmp) {
                            d.campaignId = cmp.campaignId;
                            const ut = cmp.utilities.find(u => u.utilityName == s[p]);
                            if (ut) d.utilityId = ut.utilityId;
                        }
                        break;
                    case this.saleType.saleDate:
                        d.saleDate = s[p];
                        break;
                    case this.saleType.firstName: 
                    case this.saleType.lastName: 
                    case this.saleType.businessName:
                        this.addToCreateContactQueue(s);
                        break;
                }
            }

            if (this.contactIdSub) {
                this.contactIdSub.unsubscribe();
                this.contactIdSub = null;
            }

            ob.next(d);
            ob.complete();
        });
    }

    private resolveUtilityId(campaignId: number, utilityName: string): Observable<number> {
        return Observable.create((ob: Observer<number>) => {
            this.service.getUtilitiesByCampaign(campaignId).subscribe(resp => {
                const utils = resp.data.utilitiesByCampaign;
                const s = new RegExp(`\\b${utilityName}\\b`, `i`);
                const found = utils.find(u => u.utilityName.search(s) > -1);
                if (!found) 
                    ob.next(null);
                else 
                    ob.next(found.utilityId);
                ob.complete();
            }); 
        });
    }

    importModelChanged(value: ImportModel) {
        this.selectedImportModel = value;
    }

    pendingContactQueue: Contact[] = [];

    addToCreateContactQueue(item: {[key: string]: any}): void {
        const dto = {} as Contact;
        dto.clientId = this.user.sessionUser.sessionClient;
        dto.firstName = item[this.saleType.firstName];
        dto.lastName = item[this.saleType.lastName];
        dto.businessName = item[this.saleType.businessName];
        dto.street = item[this.saleType.address];
        dto.street2 = item[this.saleType.address2];
        dto.city = item[this.saleType.city];
        dto.state = item[this.saleType.state];
        dto.zip = item[this.saleType.zip];

        const matches = this.pendingContactQueue
            .find(pc => pc.firstName == dto.firstName && pc.lastName == dto.lastName);
        if (!matches)
            this.pendingContactQueue.push(dto);
    }
}
