import { Injectable } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import * as XLSX from 'xlsx';
import { InvoiceDto, IAgentSale, IOverride, IExpense, IAgent } from '../models';
import { environment } from '@env/environment';

interface DataStore {
  sales: IAgentSale[],
  overrides: IOverride[],
  expenses: IExpense[]
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl:string = environment.apiUrl;
  data: any;

  dataStore: DataStore = {
    sales: <IAgentSale[]>[this.insertSalesRow()],
    overrides: <IOverride[]>[],
    expenses: <IExpense[]>[]
  }

  sales: Observable<IAgentSale[]>;
  sales$: BehaviorSubject<IAgentSale[]>;
  overrides: Observable<IOverride[]>;
  overrides$: BehaviorSubject<IOverride[]>;
  expenses: Observable<IExpense[]>;
  expenses$: BehaviorSubject<IExpense[]>;

  constructor(private http: HttpClient) {
    this.sales$ = new BehaviorSubject<IAgentSale[]>(this.dataStore.sales);
    this.sales = this.sales$.asObservable();
    this.overrides$ = new BehaviorSubject<IOverride[]>(this.dataStore.overrides);
    this.overrides = this.overrides$.asObservable();
    this.expenses$ = new BehaviorSubject<IExpense[]>(this.dataStore.expenses);
    this.expenses = this.expenses$.asObservable();
  }

  reloadSales(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.sales$.next(this.dataStore.sales);
    });
  }

  reloadOverrides(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.overrides$.next(this.dataStore.overrides);
    });
  }

  reloadExpenses(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.expenses$.next(this.dataStore.expenses);
    });
  }

  addEmptyOverride(): void {
    this.dataStore.overrides.push(this.insertOverrideRow());
    this.overrides$.next(this.dataStore.overrides);
  }

  addEmptyExpense(): void {
    this.dataStore.expenses.push(this.insertExpenseRow());
    this.expenses$.next(this.dataStore.expenses);
  }


  saveInvoice(invoiceDto: InvoiceDto, invoiceId: number = null): Promise<InvoiceDto> {
    let url = invoiceId === null ?
      this.apiUrl + 'api/invoices' :
      this.apiUrl + 'api/invoices/' + invoiceId;
    return <Promise<InvoiceDto>>this.http.post(url, invoiceDto).toPromise();
  }

  saveNewInvoice(
    clientId:number,
    agentId:number,
    data:InvoiceDto
  ):Observable<InvoiceDto> {
    let url = this.apiUrl + '/api/clients/' + clientId + '/agents/'
      + agentId + '/invoices';
    return this.http.post<InvoiceDto>(url, data);
  }

  /**
   * Can pass any of the three datasources with descriptive string that will update their
   * behavior subject and private data stores.
   *
   * @param sourceType string
   * @param data any
   */
  updateDataSource(sourceType: string, data: any): void {
    switch(sourceType) {
      case 'overrides':
        this.dataStore.overrides = data;
        this.overrides$.next(this.dataStore.overrides);
        break;
      case 'expenses':
        this.dataStore.expenses = data;
        this.expenses$.next(this.dataStore.expenses);
        break;
      case 'sales':
      default:
        this.dataStore.sales = data;
        this.sales$.next(this.dataStore.sales);
        break;
    }
  }



  // private methods

  insertSalesRow(): IAgentSale {
    return {
      invoiceId: null,
      agentSalesId: null,
      agentId: null,
      saleDate: null,
      firstName: null,
      lastName: null,
      address: null,
      city: null,
      state: null,
      postalCode: null,
      statusType: null,
      amount: null,
      note: null,
      createdAt: null,
      updatedAt: null
    }
  }

  private insertOverrideRow(): IOverride {
    return {
      overrideId: null,
      agentId: null,
      invoiceId: null,
      commission: null,
      sales: null,
      total: null
    }
  }

  private insertExpenseRow(): IExpense {
    return {
      expenseId: null,
      agentId: null,
      invoiceId: null,
      title: null,
      description: null,
      amount: null,
      updatedAt: null,
      modifiedBy: null,
      createdAt: null
    }
  }

}
