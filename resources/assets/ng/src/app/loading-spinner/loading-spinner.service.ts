import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class LoadingSpinnerService {

  showSpinner: Observable<boolean>;
  private showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.showSpinner = this.showSpinner$.asObservable();
  }

  show(): void {
    this.showSpinner$.next(true);
  }

  hide(): void {
    this.showSpinner$.next(false);
  }

}
