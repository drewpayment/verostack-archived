import * as moment from 'moment';
import { Moment } from 'moment';

export interface Moment extends Moment {
    toDateString?():string
}

export class MomentExtensions {

    constructor() {
        (<any>moment.fn).toDateString = this.toDateString;
    }

    toDateString = function():string {
        return moment(this).format('YYYY-MM-DD');
    }

    static init = () => new MomentExtensions();
}