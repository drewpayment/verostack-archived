import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, IClient, IClientOption, ICampaign, SaleStatus } from '../models';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user-features/user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { SessionService } from '../session.service';

interface DataStore {
  client: IClient,
  options: IClientOption,
  campaigns: ICampaign[]
}

@Injectable({
    providedIn: 'root'
})
export class ClientService {
  private url: string;
  client: Observable<IClient>;
  private client$: BehaviorSubject<IClient>;
  options: Observable<IClientOption>;
  private options$: BehaviorSubject<IClientOption>;
  campaigns: Observable<ICampaign[]>;
  private campaigns$: BehaviorSubject<ICampaign[]>;

  private user: User;

  dataStore: DataStore = {
    client: <IClient>{},
    options: <IClientOption>{},
    campaigns: <ICampaign[]>[]
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private msg: MessageService,
    private session:SessionService
  ) {
    this.url = this.auth.apiUrl;
    this.client$ = new BehaviorSubject<IClient>(null);
    this.options$ = new BehaviorSubject<IClientOption>(null);
    this.campaigns$ = new BehaviorSubject<ICampaign[]>(null);
    this.client = this.client$.asObservable();
    this.options = this.options$.asObservable();
    this.campaigns = this.campaigns$.asObservable();

    this.userService.user.subscribe((next: User) => {
      if(next == null) return;
      this.user = next;

      // store client
      this.dataStore.client = next.sessionUser.client;
      this.client$.next(this.dataStore.client);

      // store client options
      this.dataStore.options = next.sessionUser.client.options;
      this.options$.next(this.dataStore.options);

      // this.loadCampaigns();
    });
  }

  updateClient(client: IClient): void {
    this.http.post(this.url + 'api/clients/' + client.clientId, client)
      .subscribe((data: IClient) => {
        this.dataStore.client = data;
        this.client$.next(Object.assign({}, this.dataStore.client));
      },
      err => console.dir(err)
    );
  }

  loadClientOptions(): void {
    this.http.get(this.url + 'api/clients/' + this.user.sessionUser.sessionClient)
      .subscribe((options: IClientOption) => {
        this.dataStore.options = options;
        this.options$.next(this.dataStore.options);
      },
      err => console.dir(err)
    );
  }

  updateClientOptions(options: IClientOption): void {
    this.http.post(this.url + 'api/clients/' + options.clientId + '/client-options', options)
      .subscribe((next: IClientOption) => {
        this.dataStore.options = next;
        this.dataStore.client.options = this.dataStore.options;
        this.options$.next(this.dataStore.options);
        this.client$.next(this.dataStore.client);
        this.user.sessionUser.client = this.dataStore.client;
        this.userService.cacheUser(this.user);
      },
      err => console.dir(err)
    );
  }

  loadCampaigns(): void {
    this.http.get(this.url + 'api/clients/' + this.user.sessionUser.sessionClient + '/campaigns')
      .subscribe((next: ICampaign[]) => {
        this.dataStore.campaigns = next;
        this.campaigns$.next(this.dataStore.campaigns);
      });
  }

  getSaleStatuses(clientId:number):Observable<SaleStatus[]> {
    const url = `${this.url}api/clients/${clientId}/sale-statuses`;
    return this.http.get<SaleStatus[]>(url);
  }

  updateSaleStatus(clientId:number, dto:SaleStatus):Observable<SaleStatus> {
    const url = `${this.url}api/clients/${clientId}/sale-statuses/${dto.saleStatusId}`;
    return this.http.post<SaleStatus>(url, dto);
  }

  setDefaultStatuses(clientId:number, dtoList:SaleStatus[]):Observable<SaleStatus[]> {
    const url = `${this.url}api/clients/${clientId}/sale-statuses/all`;
    return this.http.post<SaleStatus[]>(url, dtoList);
  }

  createSaleStatus(clientId:number, dto:SaleStatus):Observable<SaleStatus> {
    const url = `${this.url}api/clients/${clientId}/sale-statuses`;
    return this.http.post<SaleStatus>(url, dto);
  }

  getClientOptions():Observable<IClientOption> {
    const url = `${this.url}api/clients/0/client-options`;
    return this.http.get<IClientOption>(url);
  }

  updateUseExistingContacts(dto:IClientOption):Observable<IClientOption> {
    const url = `${this.url}api/clients/${dto.clientId}/client-options/use-existing-contacts`;
    return this.http.post<IClientOption>(url, dto);
  }

}
