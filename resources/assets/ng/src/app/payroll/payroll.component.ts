import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';
import { User, ICampaign, IPayrollMap, IAgent, IOverride, IAgentSale, IUserDetail, InvoiceDto } from '../models';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

import { MessageService } from '@app/message.service';
import { CampaignService } from '../campaigns/campaign.service';
import { UserService } from '../user-features/user.service';
import { PayrollService } from './payroll.service';

// import * as XLSX from 'xlsx';
import * as moment from 'moment';
import * as _ from 'lodash';
import {
  MatDatepickerInputEvent,
  MatDialog
} from '@angular/material';
import { RejectNoteDialogComponent } from './dialogs/reject-note.component';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { IExpense } from '../models/expense.model';
import { States, IState } from '@app/shared/models/state.model';

interface IPayrollInvoice {
  agentId: number,
  campaignId: number,
  issueDate: string | moment.Moment | Date,
  weekEnding: string | moment.Moment | Date,
  sales?: IAgentSale[],
  overrides?: IOverride[],
  expenses?: IExpense[]
}

interface DialogResult {
    agent:IAgentSale,
    index:number
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  viewProviders: [FileSelectDirective]
})
export class PayrollComponent implements OnInit {

  $indexVal:number = -1;
  form:FormGroup;
  invoiceInfo:FormGroup;

  displayedColumns = ['saleDate', 'firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'statusType', 'amount', 'note'];
  pastedDataSource:Observable<IAgentSale[]>;
  dataSource$:BehaviorSubject<IAgentSale[]> = new BehaviorSubject<IAgentSale[]>([]);
  dataSource:Observable<IAgentSale[]>;
  overrideColumns = ['agentId', 'sales', 'commission', 'total', 'delete'];
  overrideDataSource$:BehaviorSubject<IOverride[]> = new BehaviorSubject<IOverride[]>([]);
  overrideDataSource:Observable<IOverride[]>;
  expenseColumns = ['title', 'description', 'amount', 'delete'];
  expenseDataSource$:BehaviorSubject<IExpense[]> = new BehaviorSubject<IExpense[]>([]);
  expenseDataSource:Observable<IExpense[]>;

  uploader: FileUploader = new FileUploader({ removeAfterUpload: true });

  overrideAgents: IAgent[];

  states:IState[] = States.$get();
  user:User;
  user$:Observable<User>;
  agent: IAgent; // currently selected agent
  agents:IAgent[];
  agents$:Observable<IAgent[]>;
  campaigns:ICampaign[];
  showRejectNotes: boolean = false;
  data: any;
  wsHeaders$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  wsHeaders: string[];
  wsData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  wsData: any[] = [];

  newFileUpload: boolean;
  mapped: IPayrollMap;
  users: User[];
  users$:Observable<User[]>;
  selectedOverrideAgent = new FormControl('', []);

  selectedAgentId:number;
  selectedCampaignId:number;
  issueDate:string | moment.Moment | Date;
  weekEnding:string | moment.Moment | Date;

  invoice: IPayrollInvoice;

  isMappedByUsername: boolean;
  userDetail: IUserDetail;
  salesId: number;

  disableOverrides:boolean = true;

  constructor(
    private campaignApi: CampaignService,
    private msg: MessageService,
    private userService: UserService,
    public dialog: MatDialog,
    private payrollService: PayrollService,
    private fb: FormBuilder
  ) {
    this.dataSource = this.dataSource$.asObservable();
    this.overrideDataSource = this.overrideDataSource$.asObservable();
    this.expenseDataSource = this.expenseDataSource$.asObservable();
    this.agents$ = this.userService.agents;
    this.user$ = this.userService.user;

    // gets active list of users to fill dropdown on invoice page
    this.userService.users.subscribe(next => { this.users = next; });

    this.userService.userDetail.subscribe((next: IUserDetail) => {
      this.userDetail = next;
    });
  }

  ngOnInit() {
    this.agents$.subscribe((agents:IAgent[]) => { this.agents = agents; });
    this.user$.subscribe((user:User) => {
      this.user = user;
      this.campaignApi.getCampaigns(user.sessionUser.sessionClient)
        .then((campaigns:ICampaign[]) => {
          this.campaigns = campaigns;
        })
        .catch(this.msg.showWebApiError);

      this.userService.loadAgents(true);
    });

    this.userService.reloadUserPromise();
    this.userService.loadAgents();

    this.isMappedByUsername = true;

    this.createForm();

    this.mapped = {
      agentId: null,
      agentName: null,
      entries: []
    }

    // assume that the page is going to have data at page load
    this.newFileUpload = false;

    this.showRejectNotes = _.find(this.dataSource, ['statusType', false]) !== null;

    this.wsHeaders$.subscribe(next => {
      this.wsHeaders = next;
    });

    this.wsData$.subscribe(next => {
      if(next !== undefined) this.wsData.push(next);
    });
  }

  private createForm():void {
    let salesArray = this.createFormGroup(this.dataSource$.getValue());
    let overridesArray = this.createFormGroup(this.overrideDataSource$.getValue(), 'overrides');
    let expensesArray = this.createFormGroup(this.expenseDataSource$.getValue(), 'expenses');

    this.form = this.fb.group({
      agentId: this.fb.control(this.selectedAgentId || '', Validators.required),
      campaignId: this.fb.control(this.selectedCampaignId || '', Validators.required),
      issueDate: this.fb.control(this.issueDate || '', Validators.required),
      weekEnding: this.fb.control(this.weekEnding || '', Validators.required),
      sales: this.fb.array(salesArray),
      overrides: this.fb.array(overridesArray),
      expenses: this.fb.array(expensesArray)
    });

    this.payrollService.sales.subscribe(sales => {
      if(!sales.length || sales == null) return;
      this.dataSource$.next(sales);

      this.form.controls.sales = this.fb.array(this.createFormGroup(sales));
      this.form.updateValueAndValidity();
    });

    this.payrollService.overrides.subscribe(overrides => {
      if(!overrides.length || overrides == null) return;
      this.overrideDataSource$.next(overrides);

      this.form.controls.overrides = this.fb.array(this.createFormGroup(overrides, 'overrides'));
      this.form.updateValueAndValidity();
    })

    this.payrollService.expenses.subscribe(expenses => {
      if(!expenses.length || expenses == null) return;
      this.expenseDataSource$.next(expenses);

      this.form.controls.expenses = this.fb.array(this.createFormGroup(expenses, 'expenses'));
      this.form.updateValueAndValidity();
    })
  }

  private createFormGroup(data:any[], keyType:string = null):FormGroup[] {
    let formGroups:FormGroup[] = [];
    let keys = ['saleDate', 'firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'statusType', 'amount'];

    if(keyType != null) {
      keys = keyType == 'overrides'
        ? ['agentId', 'sales', 'commission', 'total']
        : keyType == 'expenses'
          ? ['title', 'description', 'amount']
          : keys;
    }

    // loop through each row of the dataset
    for(let i = 0; i < data.length; i++) {
      let group = {};
      // loop through the keys
      for(let j = 0; j < keys.length; j++) {
        // append this rows properties as form controls to the form group
        group[keys[j]] = this.fb.control(data[i][keys[j]], Validators.required);
      }
      formGroups.push(this.fb.group(group));
    }
    return formGroups;
  }



  clickFileUploader():void {
    document.getElementById('file-uploader').click();
  }

  getErrorMessage(f: NgForm): any {
    let form = f.form;
    return form.controls.selectedAgent.errors.required ? 'You must select an agent' :
      form.controls.selectedCampaign.errors.required ? 'You must select a campaign' :
      form.controls.selectedIssueDate.errors.required ? 'You must select an issue date' :
      form.controls.selectedWeekending.errors.required ? 'You must select a weekending' : null;
  }

  saleDateEvent(item:IAgentSale, event: MatDatepickerInputEvent<any>) {
    let fieldValue:moment.Moment = event.value;
    let data = this.dataSource$.getValue();

    item.saleDate = fieldValue.format('YYYY-MM-DD');

    if(this.hasEditedLastRow(data)) {
      data.push(this.insertPayrollRow());
      const newDataSource:IAgentSale[] = data;
      this.dataSource$.next(newDataSource);
      this.form.controls.sales = this.fb.array(this.createFormGroup(this.dataSource$.getValue()));
    }
  }

  /**
   * Check if the last row in the array has any data in it. If it does,
   * we set our boolean to true that inserts a new row at the bottom of the table.
   */
  private hasEditedLastRow(data:any): boolean {
    let testValidity = data[data.length - 1];
    let result:boolean;
    for(let p in testValidity) {
      result = testValidity[p] != null;
      if(result) break;
    }
    return result;
  }

  /**
   * Handles changes to the sales rows and updates underlying objects and validity on form.
   *
   * @param prop
   * @param item
   * @param event
   * @param pos
   */
  handleRowEdit(prop:string, item:IAgentSale, event:any): void {
    let fieldValue: any = event.target.value;

    // set item property to field value
    item[prop] = fieldValue;

    // Insert a new row at the bottom of the table if there are is not an empty last row.
    if(this.hasEditedLastRow(this.dataSource$.getValue())) {
      let current = this.dataSource$.getValue();
      current.push(this.insertPayrollRow());
      this.payrollService.sales$.next(current);
    }
  }

  overrideRowEdit(prop: string, item:IOverride, event:any, index:number = null): void {
    let fieldValue:any = (prop == 'agentId') ? event.value : event.target.value;

    // set item property to field value
    item[prop] = +fieldValue;

    if(index != null) {
      let form = this.form.controls.overrides as FormArray;
      let patch = {};
      patch[prop] = fieldValue;
      (<FormGroup>form.controls[index]).patchValue(patch);

      if(prop == 'sales'
        || prop == 'commission'
        && item.sales > 0
        && item.commission > 0
      ) {
        item.total = item.sales * item.commission;
        (<FormGroup>form.controls[index]).patchValue({
          total: item.total
        });
      }
    }

    if(this.hasEditedLastRow(this.overrideDataSource$.getValue())) {
      let current = this.overrideDataSource$.getValue();
      current.push(this.insertOverrideRow());
      this.payrollService.overrides$.next(current);
    }
  }

  expenseRowEdit(prop:string, item:IExpense, event:any, index:number): void {
    let fieldValue: any = event.target.value;

    // set item property to field value
    item[prop] = fieldValue;

    if(index != null) {
      let form = this.form.controls.expenses as FormArray;
      let patch = {};
      patch[prop] = fieldValue;
      (<FormGroup>form.controls[index]).patchValue(patch);
    }

    if(this.hasEditedLastRow(this.expenseDataSource$.getValue())) {
      let current = this.expenseDataSource$.getValue();
      current.push(this.insertExpenseRow());
      this.payrollService.expenses$.next(current);
    }
  }

  openRejectDialog(item:IAgentSale, index:number): void {
    this.dialog
      .open(RejectNoteDialogComponent, {
        width: '400px',
        data: { item: item, index: index }
      })
      .afterClosed().subscribe((result:DialogResult) => {
        if(result == null) return;
        let agent = result.agent;
        let index = result.index;
        this.dataSource[index] = agent;
      });
  }

  updateSelectedAgent():void {
    if(this.overrideAgents == null
      || this.overrideAgents.length == 0) {
        this.userService.refreshAgents()
          .then((agents:IAgent[]) => {
            this.agent = _.find(agents, {'agentId': this.invoice.agentId});
            this.disableOverrides = !this.agent.isManager;
          });
    } else {
      this.agent = _.find(this.agents, {'agentId': this.invoice.agentId});
      this.disableOverrides = !this.agent.isManager
    }
  }



  validateInvoice():any {
    const dataSource = this.dataSource$.getValue();
    const overrideDataSource = this.overrideDataSource$.getValue();
    const expenseDataSource = this.expenseDataSource$.getValue();
    const lastSalesRow = dataSource.length - 1;
    const lastOverrideRow = overrideDataSource.length - 1;
    const lastExpenseRow = expenseDataSource.length - 1;
    const salesFormArray = this.form.controls.sales as FormArray;
    const overridesFormArray = this.form.controls.overrides as FormArray;
    const expensesFormArray = this.form.controls.expenses as FormArray;

    if(this.form.invalid && (<FormGroup>salesFormArray.controls[lastSalesRow]).dirty) return;

    this.removeEmptyDataSourceRow(salesFormArray, dataSource, lastSalesRow, 'dataSource$');
    this.removeEmptyDataSourceRow(overridesFormArray, overrideDataSource, lastOverrideRow, 'overrideDataSource$');
    this.removeEmptyDataSourceRow(expensesFormArray, expenseDataSource, lastExpenseRow, 'expenseDataSource$');
    this.form.updateValueAndValidity();

    this.saveInvoice(
      dataSource,
      overrideDataSource,
      expenseDataSource
    );
  }

  removeEmptyDataSourceRow(formArray:FormArray, dataSource:any[], pos:number, destinationDataSource:string):void {
    let hasData:boolean;
    const row = dataSource[pos];

    for(const p in row) {
      hasData = row[p] != null;
      if(hasData) break;
    }
    if(hasData) return;

    formArray.removeAt(pos);
    dataSource.splice(pos, 1);
    this[destinationDataSource].next(dataSource);
  }

  removeEmptyOverride(i:number):void {
    let data = this.overrideDataSource$.getValue();

    if(!_.isEmpty(data[i])) return;

    data.splice(i, 1);
    this.overrideDataSource$.next(data);
  }

  removeEmptyExpense(i:number):void {
    let data = this.expenseDataSource$.getValue();

    if(!_.isEmpty(data[i])) return;

    data.splice(i, 1);
    this.expenseDataSource$.next(data);
  }

  saveInvoice(
    sales: IAgentSale[],
    overrides: IOverride[],
    expenses: IExpense[]
  ): void {
    console.log('Form is invalid: ' + this.form.invalid);
    console.dir(this.form);
    if(this.form.invalid) return;

    let data:InvoiceDto = {
      invoiceId: null,
      agentId: this.selectedAgentId,
      campaignId: this.selectedCampaignId,
      agentSales: sales,
      overrides: overrides,
      expenses: expenses,
      issueDate: this.issueDate,
      weekEnding: this.weekEnding
    };

    for(let i = 0; i < data.agentSales.length; i++) {
      data.agentSales[i].agentId = this.selectedAgentId;
    }

    for(let i = 0; i < data.expenses.length; i++) {
      data.expenses[i].agentId = this.selectedAgentId;
    }

    console.dir(data);

    this.payrollService
      .saveNewInvoice(this.user.sessionUser.sessionClient, this.agent.agentId, data)
      .subscribe(result => {
        console.dir(result);
      });

    // let dto: InvoiceDto = <InvoiceDto>{
    //   invoiceId: null,
    //   agentId: form.control,
    //   campaignId: form.controls.campaign.value,
    //   agentSales: sales,
    //   overrides: overrides,
    //   expenses: expenses,
    //   issueDate: form.controls.issueDate.value,
    //   weekEnding: form.controls.weekEnding.value
    // }

    // this.payrollService
    //   .saveInvoice(dto)
    //   .then((result: InvoiceDto) => {
    //     console.dir(result);
    //   });

  }

  /**
   * finds the currently selected agent and checks to see if they're a manager so
   * that we can properly set the var that shows/hides the overrides panel.
   */
  changeAgent():void {
    this.agent = _.find(this.agents, {'agentId':this.form.value.agentId}) as IAgent;
    this.disableOverrides = !(this.agent.isActive && this.agent.isManager);
  }

  /**
   * Checks to make sure agent has suboridnates prior to expanding the
   * dataset and adding an override row.
   *
   * @param wasSectionHidden
   *
   */
  addOverrideRow(wasSectionHidden:boolean = false):void {
    if(wasSectionHidden && this.agent.agentId != null) {
      if(this.agent == null)
        this.agent = _.find(this.agents, {'agentId': this.selectedAgentId});

      this.userService.getAgentsByManagerId(this.agent.managerId)
        .then((agents:IAgent[]) => {
          this.overrideAgents = agents;
          this.payrollService.addEmptyOverride();
        })
        .catch(this.msg.showWebApiError);
    } else {
      if(this.overrideAgents == null || this.overrideAgents.length == 0) {
        this.msg.addMessage('Please make sure you select an agent before you start entering overrides.', 'dismiss', 6000);
        return;
      }

      this.payrollService.addEmptyOverride();
    }
  }

  addExpenseRow(): void {
    this.payrollService.addEmptyExpense();
  }

  removeRow(sourceType: string, index: number): void {
    let data;
    switch(sourceType) {
      case 'overrides':
        data = this.overrideDataSource$.getValue();
        data.splice(index, 1);
        this.overrideDataSource$.next(data);
        this.payrollService.updateDataSource(sourceType, this.overrideDataSource$.getValue());
        break;
      case 'expenses':
        data = this.expenseDataSource$.getValue();
        data.splice(index, 1);
        this.expenseDataSource$.next(data);
        this.payrollService.updateDataSource(sourceType, this.expenseDataSource$.getValue());
        break;
      case 'sales':
      default:
        data = this.dataSource$.getValue();
        data.splice(index, 1);
        this.dataSource$.next(data);
        this.payrollService.updateDataSource(sourceType, this.dataSource$.getValue());
        break;
    }
  }





  private insertPayrollRow(): IAgentSale {
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


  // updateMapping(f:FormGroup):void {
  //   if(f.controls.selectedAgent.invalid) this.msg.addMessage('Oops! Looks like we encountered an error, please refresh and try again.', 'dismiss', 6000);

  //   this.mapped.agentId = f.controls.selectedAgent.value;
  //   let user = _.find(this.users, { id: this.mapped.agentId });
  //   this.mapped.agentName = user.firstName + ' ' + user.lastName;

  //   let sales: IAgentSale[] = this.dataSource$.getValue();
  //   let salesTableHasData: boolean = false;
  //   _.each(sales, (sale: IAgentSale) => {
  //     for(let s in sale) {
  //       // check if there are any values in the first row and on... then do the check.
  //       if(salesTableHasData) break;
  //       salesTableHasData = sale[s] !== null;
  //     }
  //   });

  //   if(salesTableHasData) {
  //     let dialogRef = this.dialog.open(ChangeAgentDialogComponent, {
  //       width: '250px',
  //     });

  //     dialogRef.afterClosed().subscribe((result: boolean) => {
  //       if(result) {
  //         this.mapped.entries = [];
  //         this.mapped.entries.push(this.insertPayrollRow());
  //         this.dataSource$.next(this.mapped.entries);
  //         this.overrideDataSource$.next([]);
  //         this.expenseDataSource$.next([]);
  //       }
  //     });
  //   }
  // }

    // private createForm() {
  //   this.form = this.fb.group({
  //     sales: this.fb.array(this.dataSource$.getValue()),
  //     overrides: this.fb.array(this.overrideDataSource$.getValue()),
  //     expenses: this.fb.array(this.expenseDataSource$.getValue())
  //   });
  // }

  // private resetForm() {
  //   this.form = this.fb.group({
  //     sales: this.fb.array(this.dataSource$.getValue()),
  //     overrides: this.fb.array(this.overrideDataSource$.getValue()),
  //     expenses: this.fb.array(this.expenseDataSource$.getValue())
  //   });
  // }

  // openSalesMappingDialog(headers: any, rows: IAgentSale[]): void {
  //   // move this to import button click event... and highlight field that user needs to interact with before they continue
  //   if(!(this.invoice.agentId > 0)) {
  //     this.msg.addMessage('Please make sure you select a salesperson before continuing.', 'dismiss', 5000);
  //     return;
  //   } else if (!(this.invoice.campaignId > 0)) {
  //     this.msg.addMessage('Please select a campaign before continuing.', 'dismiss', 5000);
  //     return;
  //   }

  //   this.dialog
  //     .open(SelectMapperComponent, {
  //       width: '500px',
  //       data: {}
  //     })
  //     .afterClosed()
  //     .subscribe((mapBy:string) => {
  //       if(mapBy == undefined) return;

  //       // if the user is mapping by something other than username, we need to do the work to get the correct sales ID to map with here...
  //       if(mapBy === 'salesId') {
  //         // need to get user details here and get their sales id for the currently selected campaign and store the current sales id
  //         // to something that we can use... maybe store this as "currentSalesId" in the payroll service or something, so that it is
  //         // easily accessible from multiple components...?
  //         console.log('map by ' + mapBy);

  //         this.userService.getUserDetail()
  //           .then((detail:IUserDetail) => {
  //             if(detail == null) {
  //               this.msg.addMessage('Fatal error. Please refresh and try again.', 'dismiss', 6000);
  //             } else {
  //               switch(this.selectedCampaign.value) {
  //                 case this.userDetail.saleOneCampaignId:
  //                   this.salesId = this.userDetail.saleOneId;
  //                   break;
  //                 case this.userDetail.saleTwoCampaignId:
  //                   this.salesId = this.userDetail.saleTwoId;
  //                   break;
  //                 case this.userDetail.saleThreeCampaignId:
  //                   this.salesId = this.userDetail.saleThreeId;
  //                   break;
  //                 default:
  //                   this.salesId = 0;
  //                   break;
  //               }

  //               if(this.salesId === 0)
  //                 this.msg.addMessage('Please make sure that you have a sales ID for the specified campaign saved in your profile.', 'dismiss', 6000);
  //             }
  //           });

  //         console.dir(this.userDetail);
  //       } else {
  //         console.log("map by " + mapBy);
  //       }

  //       let dialogRef = this.dialog.open(SalesMappingComponent, {
  //         width: '500px',
  //         data: { headers: headers, rows: rows }
  //       });

  //       dialogRef.afterClosed().subscribe((result: IPayrollMap) => {
  //         if(result.entries == null) {
  //           this.msg.addMessage('Something went wrong. Please try again.', 'dismiss', 6000);
  //           return;
  //         }

  //         if(result != undefined && result.entries.length > 0) {
  //           this.mapped.entries = result.entries;
  //           // make sure our results only match the employee that the user has selected in the top left...
  //           _.remove(this.mapped.entries, (e: IAgentSale) => {
  //             return e.agentName.toLowerCase().trim() !== this.mapped.agentName.toLowerCase().trim();
  //           });

  //           for(let i = 0; i < this.mapped.entries.length; i++) {
  //             let data = this.mapped.entries[i];
  //             if(data['zip']) {
  //               data.postalCode = data['zip'];
  //               delete data['zip'];
  //             }
  //           }

  //           if(this.mapped.entries.length === 0) this.msg.addMessage('Looks like there are no results for that agent. Please try again.', 'dismiss', 5000);

  //           // if(this.newFileUpload) {
  //           //   for(let i = 0; i < this.mapped.entries.length; i++) {
  //           //     this.mapped.entries[i].agentSalesId = i + 1;
  //           //   }
  //           // }
  //           this.mapped.entries.push(this.insertPayrollRow());
  //           console.dir(this.mapped.entries);
  //           this.payrollService.updateDataSource('sales', this.mapped.entries);
  //         }
  //       });
  //     });
  // }

  // chooseFile(e:any):void {
  //   this.newFileUpload = true;
  //   let file:File = e.target.files[0];
  //   let reader:FileReader = new FileReader();

  //   reader.onload = (e: any) => {
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

  //     // grab first sheet
  //     let wsname: string;
  //     let ws: XLSX.WorkSheet;
  //     if(wb.SheetNames.length > 1) {
  //       wsname = wb.SheetNames[1] === 'Data' ? wb.SheetNames[1] : 'Data';
  //       ws = wb.Sheets[wsname];
  //     } else {
  //       wsname = wb.SheetNames[0];
  //       ws = wb.Sheets[wsname];
  //     }

  //     // save data
  //     this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
  //     let entry = [];
  //     let rows = [];

  //     for(var h = 0; h < this.data.length; h++) {
  //       let row = this.data[h];
  //       if(h === 0) {
  //         for(var i = 0; i < row.length; i++) {
  //           row[i] = row[i].toLowerCase().split(' ').map(function(w, idx){
  //             if(idx > 0 && w.length > 2) {
  //               return w.charAt(0).toUpperCase() + w.substr(1);
  //             } else {
  //               return w;
  //             }
  //           }).join(' ');

  //           entry.push(row[i]);
  //         }
  //         this.wsHeaders$.next(row);
  //       } else { // data form worksheet
  //         if(row.length > 0) rows.push(row);
  //       }
  //     }

  //     this.openSalesMappingDialog(entry, rows);
  //   };

  //   if(file) reader.readAsBinaryString(file);
  // }
