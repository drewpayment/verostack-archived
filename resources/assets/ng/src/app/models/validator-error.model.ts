import { HttpErrorResponse } from '@angular/common/http';

export interface ValidatorErrorDetail {
    [name:string]:string[]
}

export interface ValidatorError {
    errors:ValidatorErrorDetail,
    message:string
}

export interface LaravelErrorResponse extends HttpErrorResponse {
    error:ValidatorError
}