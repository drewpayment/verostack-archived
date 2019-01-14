import * as moment from 'moment';
import { Moment } from 'moment';

export interface Moment extends Moment {
    toDateString?():string
}

type Inclusivity = "()" | "[)" | "(]" | "[]";

interface IMomentInclusivity {
    includeNone:Inclusivity,
    includeStart:Inclusivity,
    includeEnd:Inclusivity,
    includeBoth:Inclusivity
}

export const MomentInclusivity:IMomentInclusivity = {
    includeNone:'()',
    includeStart: '[)',
    includeEnd: '(]',
    includeBoth: '[]'
}

export class MomentExtensions {

    constructor() {
        (<any>moment.fn).toDateString = this.toDateString;
    }

    toDateString = function():string {
        return moment(this).clone().format('YYYY-MM-DD');
    }

    static init = () => new MomentExtensions();
}