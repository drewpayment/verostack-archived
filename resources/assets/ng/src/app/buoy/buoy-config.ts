import { environment } from '@env/environment';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { IToken, ILocalStorage } from '@app/models';
import { HttpHeaders } from '@angular/common/http';
import { HeaderManipulator } from './middleware/header-manipulator';

export const buoyConfig = <BuoyConfig>{
    uri: environment.graphql
};

export class BuoyHeadersManipulator implements HeaderManipulator {

    constructor(public localStorage: LocalStorage) {}
    
    manipulateHeaders(headers: HttpHeaders, query: any, variables: any): HttpHeaders {
        this.localStorage.getItem('token').subscribe((token: ILocalStorage<IToken>) => {
            if (!token || !token.data || !headers) return;

            headers.append('Authorization', `Bearer ${token.data.access_token}`);
        });

        return headers;
    }

}

export class BuoyConfig {
    uri ? = '/graph';

    headers?: () => HttpHeaders;

    extensions?: () => any;

    middleware?: any[] = [];

    subscriptions?: any;

    paginatorType?: 'paginator' = 'paginator';

    defaultLimit ? = 25;
}
