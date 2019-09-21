import { Component, OnInit } from '@angular/core';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';
import { Observable } from 'rxjs';
import { ReportImport } from '@app/models';

@Component({
    selector: 'vs-past-imports',
    templateUrl: './past-imports.component.html',
    styleUrls: ['./past-imports.component.scss']
})
export class PastImportsComponent implements OnInit {

    imports$: Observable<ReportImport[]>;
    pastImports: ReportImport[];
    displayColumns = ['name', 'date', 'importModel'];

    constructor(private saleService: DailySaleTrackerService) {     
        this.imports$ = this.saleService.pastImports$.asObservable();
    }

    ngOnInit() {
        // this.saleService.pastImports$.subscribe(imports => this.pastImports = imports);
    }

}
