import { Component, OnInit, Inject, AfterViewInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { ImportModel, User } from '@app/models';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionService } from '@app/session.service';
import { ImportsService } from '@app/imports/imports.service';
import { startWith, delay } from 'rxjs/operators';

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

    constructor(
        private fb: FormBuilder,
        public ref: MatDialogRef<EditImportModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private session: SessionService,
        private service: ImportsService,
    ) { 
        this.model = this.data.importModel;
    }

    ngOnInit() {
        this.user = this.session.lastUser;

        if (this.model) {
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
        }));
    }

    saveImportModel() {
        if (this.form.invalid) return;
        this.ref.close(this.prepareModel());
    }

    tabAdd(event: KeyboardEvent, index: number) {
        if (event.keyCode == 9 && index == (this.map.length - 1)) {
            this.tabAdded = true;
            this.addMapRow();
        }
    }

    prepareModel(): ImportModel {
        const map = this.form.value.map;

        if (map.key == null || map.value == null) map.pop();

        return {
            importModelId: this.model.importModelId,
            userId: this.user.id,
            clientId: this.user.selectedClient.clientId,
            shortDesc: this.form.value.shortDesc,
            fullDesc: this.form.value.fullDesc,
            map: map,
        } as ImportModel;
    }

    private createForm(): FormGroup {
        return this.fb.group({
            shortDesc: this.fb.control('', [Validators.required]),
            fullDesc: this.fb.control(''),
            map: this.fb.array([]),
        });
    }

}
