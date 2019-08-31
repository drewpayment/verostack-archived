import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FileUploader } from 'ad-file-upload';
import { Spreadsheet } from 'dhx-spreadsheet';
import { ISheetData, IStyle, IDataCell, DailySale, ImportModel, 
    ImportModelMap, DailySaleMapType, User, GeocodingRequest, GeocodingResponse, DncContact, DncContactRequest } from '@app/models';
import { Moment } from 'moment';
import * as moment from 'moment';
import { SessionService } from '@app/session.service';
import { ImportsService } from '../imports.service';
import { Contact } from '@app/models/contact.model';
import { Observable, Subscription, Observer, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactService } from '@app/contact/contact.service';

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
    user: User;

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
        private contactService: ContactService
    ) { }

    ngOnInit() {
        this.session.getUserItem().subscribe(u => this.user = u);
    }

    ngOnDestroy() {
        if (this.contactIdSub) this.contactIdSub.unsubscribe();
    }

    fileAddedHandler(item: FileList) {
        const file = item.item(0);
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

        const ssData = this.ss.serialize() as {
            columns: {[key: string]: any},
            data: {
                cell: string,
                css: string,
                value: string
            }[],
            format: {[key: string]: any}[],
            styles: {[key: string]: any}
        };
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

            // TODO: 
            // send all pending contacts to graphql to add them all at the same time
            // 
            // this.service.saveContacts(this.pendingContactQueue).subscribe(res => {
            //  DO SOME STUFF IN HERE... 
            //
            //  NEED TO MATCH THE CONTACT IDS BACK AGAINST THE DAILY SALES SO THAT THE CONTACT IDS 
            //  ARE RELATED... 
            // })
            // 

        });
    }

    private processSales(sales: {[key: string]: any}[]): Observable<Boolean> {
        return Observable.create((ob: Observer<Boolean>) => {
            const joins:Observable<DailySale>[] = [];
            sales.forEach((s) => {
                const d = {} as DailySale;
                joins.push(this.buildDailySale(s, d));
                // this.buildDailySale(s, d).subscribe(sale => this.dtos.push(sale));
            });

            forkJoin(joins).subscribe(sales => {
                console.dir(this.pendingContactQueue);
                console.dir(sales);

                const dtos: DncContactRequest[] = this.pendingContactQueue.map(p => {
                    return {
                        first_name: p.firstName,
                        last_name: p.lastName,
                        address: p.street,
                    } as DncContactRequest;
                });

                this.saveDncContacts(dtos).subscribe(dncContacts => {
                    sales.forEach((s, i, a) => {
                        
                    });
                });

                ob.next(true);
                ob.complete();
            }, err => {
                ob.next(false);
                ob.complete();
            });
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
                    .subscribe(dncs => {
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
