import { PasswordResetError } from '@app/models';

export class ResetPasswordError implements PasswordResetError {
    errors: { username: string[]; password: string[]; };    
    message: string;

    ResetPasswordError(errors: { username: string[]; password: string[]; }, message: string) {
        this.errors = errors;
        this.message = message;
    }
} 
