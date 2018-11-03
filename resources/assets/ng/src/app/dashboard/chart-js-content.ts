import { Directive, TemplateRef } from '@angular/core';


@Directive({
    selector: 'chart-js-content, [chartJsContent], [chart-js-content]'
})
export class ChartJsContent {
    constructor(public _template: TemplateRef<any>) { }
}