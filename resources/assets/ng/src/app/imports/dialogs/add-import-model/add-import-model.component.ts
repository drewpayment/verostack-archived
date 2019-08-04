import { Component, OnInit, Inject, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User, Utility, ICampaign, ImportModel } from '@app/models';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SessionService } from '@app/session.service';
import { ImportsService } from '@app/imports/imports.service';
import { startWith, delay } from 'rxjs/operators';

interface DialogData {
    user:User,
}

@Component({
    selector: 'vs-add-import-model',
    templateUrl: '../edit-import-model/edit-import-model.component.html',
    styleUrls: ['./add-import-model.component.scss']
})
export class AddImportModelComponent implements OnInit, AfterViewInit {

    user: User;
    utilities: Utility[];
    campaigns: ICampaign[];
    form = this.createForm();

    get map() {
        return this.form.get('map') as FormArray;
    }

    @ViewChildren('keyInputs') keys: QueryList<ElementRef>;

    tabAdded = false;

    constructor(
        public ref: MatDialogRef<AddImportModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private session: SessionService,
        private fb: FormBuilder,
        private service: ImportsService,
    ) { 
        this.user = this.data.user;
    }

    ngOnInit() {
        // if (!this.user) this.session.getUserItem().subscribe(u => this.user = u);/
        // this.utilSubscription = this.service.utilities.subscribe(utilities => this.utilities = utilities);
        // this.campaignSub = this.service.campaigns.subscribe(campaigns => this.campaigns = campaigns);

        this.user = this.session.lastUser;
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

    onNoClick() {
        this.ref.close();
    }

    getUtilities():Utility[] {
        return this.utilities.filter(u => u.campaignId == this.form.get('map.campaignId').value);
    }

    saveImportModel() {
        if (this.form.invalid) return;
        const model = this.prepareModel();
        this.ref.close(model);
    }

    addMapRow(changeFocus = true) {
        this.map.push(this.fb.group({
            key: this.fb.control('', [Validators.required]),
            value: this.fb.control('', [Validators.required]),
        }));
    }

    prepareModel(): ImportModel {
        return {
            importModelId: null,
            userId: this.user.id,
            clientId: this.user.selectedClient.clientId,
            shortDesc: this.form.value.shortDesc,
            fullDesc: this.form.value.fullDesc,
            map: this.form.value.map,
        } as ImportModel;
    }

    tabAdd(event: KeyboardEvent, index: number) {
        if (event.keyCode == 9 && index == (this.map.length - 1)) {
            this.tabAdded = true;
            this.addMapRow(false);
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            shortDesc: this.fb.control('', [Validators.required]),
            fullDesc: this.fb.control(''),
            map: this.fb.array([
                this.fb.group({
                    key: this.fb.control('', [Validators.required]),
                    value: this.fb.control('', [Validators.required])
                }),
            ]),
        });
    }

}
