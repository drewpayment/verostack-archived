import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { User, DncContact } from '@app/models';
import { SessionService } from '@app/session.service';
import { States } from '@app/shared';
import { distinctUntilChanged } from 'rxjs/operators';
import { MessageService } from '@app/message.service';

@Component({
    selector: 'vs-add-dnc-contact-dialog',
    templateUrl: './add-dnc-contact-dialog.component.html',
    styleUrls: ['./add-dnc-contact-dialog.component.scss']
})
export class AddDncContactDialogComponent implements OnInit {

    user:User;
    form:FormGroup;

    formSubmitted = false;
    states = States.$get();

    constructor(
        public ref: MatDialogRef<AddDncContactDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb:FormBuilder,
        private session:SessionService,
        private message:MessageService
    ) { }

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.initializeComponent();
        });
    }

    initializeComponent() {
        this.createForm();

        // TODO: this logic is buggy af
        // this.form.valueChanges
        //     .pipe(
        //         distinctUntilChanged()
        //     )
        //     .subscribe(value => {
        //         const firstName = value.firstName;
        //         const lastName = value.lastName;
        //         const desc = value.description;

        //         if (firstName) {
        //             this.form.get('description').clearValidators();
        //             this.form.get('lastName').setValidators(this.requiredValidator);
        //         }

        //         if (lastName) {
        //             this.form.get('description').clearValidators();
        //             this.form.get('firstName').setValidators(this.requiredValidator);
        //         }

        //         if (!firstName && !lastName) {
        //             this.form.get('description').setValidators(this.requiredValidator);
        //             // this.form.get('description').updateValueAndValidity({ emitEvent: false });
        //         }

        //         if (desc) {
        //             this.form.get('firstName').clearValidators();
        //             this.form.get('lastName').clearValidators();
        //         } else {
        //             this.form.get('firstName').setValidators(this.requiredValidator);
        //             this.form.get('lastName').setValidators(this.requiredValidator);
        //         }

        //         this.form.updateValueAndValidity({ emitEvent: false });
        //     });
    }

    requiredValidator(control:AbstractControl):ValidationErrors | null {
        if (control.value) return null;
        return {
            required: true
        };
    }

    createForm() { 
        this.form = this.fb.group({
            clientId: this.fb.control(this.user.selectedClient),
            firstName: this.fb.control(''),
            lastName: this.fb.control(''),
            description: this.fb.control(''),
            address: this.fb.control('', [Validators.required]),
            addressCont: this.fb.control(''),
            city: this.fb.control('', [Validators.required]),
            state: this.fb.control('', [Validators.required]),
            zip: this.fb.control('', [Validators.required, Validators.pattern(/\[0-9]+/)]),
            note: this.fb.control('')
        });
    }

    prepareModel():DncContact {
        return {
            dncContactId: null,
            clientId: this.form.value.clientId,
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            description: this.form.value.description,
            address: this.form.value.address,
            addressCont: this.form.value.addressCont,
            city: this.form.value.city,
            state: this.form.value.state,
            zip: this.form.value.zip,
            note: this.form.value.note
        } as DncContact;
    }

    onNoClick() {
        this.ref.close();
    }

    saveDncContact() {
        
        if (!this.form.value.firstName != null && !this.form.value.lastName != null && !this.form.value.description != null) {
            this.form.get('firstName').setErrors({ required: true });
            this.form.get('lastName').setErrors({ required: true });
            this.form.get('description').setErrors({ required: true });
            this.message.addMessage('Please enter one of the following: First & Last Names OR Description');
        }

        this.formSubmitted = true;
        this.form.updateValueAndValidity();
        console.log(`The form is valid: ${this.form.valid}`);
        console.dir(this.form);

        if (this.form.valid) {
            const model = this.prepareModel();
            this.ref.close(model);
        }
    }

}
