import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImportModel } from '@app/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImportsService {

    api = environment.apiUrl + 'api';

    constructor(private http:HttpClient) { }

    getImportModels():Observable<ImportModel[]> {
        const url = `${this.api}/import-models`;
        return this.http.get<ImportModel[]>(url);
    }
}
