import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';
import { ContactService } from '../contact.service';

@Component({
    selector: 'vs-contact-outlet',
    templateUrl: './contact-outlet.component.html',
    styleUrls: ['./contact-outlet.component.scss']
})
export class ContactOutletComponent implements OnInit {

    searchInput = new FormControl();
    showClearButton = false;
    userClickedSearch = false;

    constructor(private contactService:ContactService) { }

    ngOnInit() {
        this.searchInput.valueChanges
            .pipe(
                startWith(''),
                distinctUntilChanged()
            )
            .subscribe(value => this.showClearButton = value && value.length > 0);
    }

    searchContacts() {
        this.userClickedSearch = true;
        const value = this.searchInput.value.toLowerCase();
        let filtered = this.contactService.getAllRestrictedContacts();
        filtered = filtered.filter(f => {
            return f.firstName.toLowerCase().includes(value) ||
                f.lastName.toLowerCase().includes(value) ||
                f.address.toLowerCase().includes(value) ||
                f.city.toLowerCase().includes(value);
        });
        this.contactService._restrictedContacts$.next(filtered);
    }

    clearSearch() {
        this.searchInput.setValue('');
        const allContacts = this.contactService.getAllRestrictedContacts();
        this.contactService._restrictedContacts$.next(allContacts);
        this.showClearButton = false;
        this.userClickedSearch = false;
    }

}
