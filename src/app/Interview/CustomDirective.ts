/*
ng generate directive custom
custom.directive.ts

import {Directive} from core
import { ElementRef, HostListener, Input }

@Directive(
{
    selector:"[appHighLight]"
})

export class CustomDirective {
    @Input('appHighLight') highlightColor : string;

    constructor(private el: ElementRef){
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.setColor('red');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setColor(null)
    }

    setColor(color:string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

html
<p appHighLight> Hover over me</p>

*/