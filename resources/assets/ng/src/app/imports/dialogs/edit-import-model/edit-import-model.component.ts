import { Component, OnInit, Inject, AfterViewInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { ImportModel, User, ICampaign, DailySaleMapType, DailySaleFields } from '@app/models';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionListChange, MatBottomSheet } from '@angular/material';
import { SessionService } from '@app/session.service';
import { ImportsService } from '@app/imports/imports.service';
import { startWith, delay } from 'rxjs/operators';
import { Observable, Observer, forkJoin } from 'rxjs';
import { ConfirmAgentBottomSheetComponent } from '@app/imports/bottom-sheets/confirm-agent-code.component';

interface DialogData {
    importModel: ImportModel
}

@Component({
    selector: 'vs-edit-import-model',
    templateUrl: './edit-import-model.component.html',
    styleUrls: ['./edit-import-model.component.scss']
})
export class EditImportModelComponent implements OnInit, AfterViewInit {

    form = this.createForm();
    user: User;
    model: ImportModel;

    get map() {
        return this.form.get('map') as FormArray;
    }

    @ViewChildren('keyInputs') keys: QueryList<ElementRef>;

    tabAdded = false;

    campaigns: Observable<ICampaign[]>;

    fieldTypes = Object.keys(DailySaleMapType);
    fieldDescriptions = DailySaleFields;

    splitCustomerName = false;
    matchAgentBySalesCode = false;

    constructor(
        private fb: FormBuilder,
        public ref: MatDialogRef<EditImportModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private session: SessionService,
        private service: ImportsService,
        private bs: MatBottomSheet
    ) { 
        this.model = this.data.importModel;
    }

    ngOnInit() {
        this.user = this.session.lastUser;

        this.campaigns = this.service.campaigns;

        if (this.model) {
            this.matchAgentBySalesCode = this.model.matchByAgentCode;
            this.splitCustomerName = this.model.splitCustomerName;
            const map = JSON.parse(this.model.map) as {key: string, value: string}[];

            this.form.patchValue({
                shortDesc: this.model.shortDesc,
                fullDesc: this.model.fullDesc,
            });

            if (map && map.length > this.map.length) {
                map.forEach((m, i, a) => {
                    this.map.push(this.fb.group({
                        key: m.key,
                        value: m.value,
                    }));
                });
            }
        } else {
            this.addMapRow();
        }
    }

    ngAfterViewInit() {
        this.keys.changes
            .pipe(
                startWith([]),
                delay(0),
            )
            .subscribe((rows: QueryList<ElementRef>) => {
                if (rows.length && !this.tabAdded) {
                    rows.last.nativeElement.focus();
                } else {
                    this.tabAdded = false;
                }
            });
    }

    onNoClick = () => this.ref.close();

    addMapRow() {
        this.map.push(this.fb.group({
            key: this.fb.control('', [Validators.required]),
            value: this.fb.control('', [Validators.required]),
            fieldType: this.fb.control('')
        }));
    }

    saveImportModel() {
        if (this.form.invalid) return;

        forkJoin(
            this.checkMatchByCode(), 
            this.checkForMissingSalesFields()
        ).subscribe(results => {
            const missingFields = results[1];

            // TODO: need to handle missing fields communication
        });

        if (!this.matchAgentBySalesCode) {
            this.bs.open(ConfirmAgentBottomSheetComponent)
                .afterDismissed()
                .subscribe(result => {
                    if (!result) {
                        this.closeAndSaveModel();
                    } else {
                        this.matchAgentBySalesCode = true;
                        this.closeAndSaveModel();
                    }
                });
        } else {
            this.closeAndSaveModel();
        }
    }

    checkMatchByCode(): Observable<void> {
        return Observable.create((ob: Observer<void>) => {
            if (!this.matchAgentBySalesCode) {
                this.bs.open(ConfirmAgentBottomSheetComponent)
                    .afterDismissed()
                    .subscribe(result => {
                        if (!result) {
                            ob.complete();
                        } else {
                            this.matchAgentBySalesCode = true;
                            ob.complete();
                        }
                    });
            } else {
                ob.complete();
            }
        });
    }

    checkForMissingSalesFields(): Observable<string[]> {
        return Observable.create((ob: Observer<string[]>) => {
            /** TODO: NEED TO RETURN A LIST OF THE FIELDS USER DIDN'T FINISH */
        });
    }

    closeAndSaveModel = () => this.ref.close(this.prepareModel());

    tabAdd(event: KeyboardEvent, index: number) {
        if (event.keyCode == 9 && index == (this.map.length - 1)) {
            this.tabAdded = true;
            this.addMapRow();
        }
    }

    fieldTypeChanged(event: MatSelectionListChange, fieldType: FormControl) {
        console.dir([event, fieldType]);
    }

    prepareModel(): ImportModel {
        const importModelId = this.model ? this.model.importModelId : null;

        return {
            importModelId: importModelId,
            userId: this.user.id,
            clientId: this.user.selectedClient.clientId,
            campaignId: this.form.value.campaign,
            shortDesc: this.form.value.shortDesc,
            fullDesc: this.form.value.fullDesc,
            map: this.map.value,
            matchByAgentCode: this.matchAgentBySalesCode,
            splitCustomerName: this.splitCustomerName,
        } as ImportModel;
    }

    private createForm(): FormGroup {
        return this.fb.group({
            shortDesc: this.fb.control('', [Validators.required]),
            fullDesc: this.fb.control(''),
            campaignId: this.fb.control('', [Validators.required]),
            map: this.fb.array([]),
        });
    }

}
