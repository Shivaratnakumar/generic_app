/*
ng generate component two-way-binding

import {Component, Input, Output, EventEmitter} from core;

@Component({
    slector:
    template:`
        <input [(ngModel)]="value" (ngModelChange) = "OnVlaueChange($event)" />
    `
    styleUrls:[]
})

export class TwoayBinding {
    @Input() value: string
    @Output() valueChaneg = new EventEmitter<string>();

    OnValueCahnge(newVal: string){
        this.valueCahnge.emit(newVal);
    }
}

// app.module.ts
import {FormsModule} from angular/forms;

NgModule{
    imports:[FormsModule]
}

//app.component.html
<two-way-binding [(value)]="appValue"></two-way-binding>
{{appValue}}

//app.componetn.ts
appValue = test data""

*/