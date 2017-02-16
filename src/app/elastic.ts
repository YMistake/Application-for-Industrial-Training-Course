import {HostListener, Directive} from '@angular/core';
@Directive({
  selector: '[elastic]'
})
export class Elastic {

  constructor() {}
    @HostListener('input', ['$event.target'])
    onInput(nativeElement: any): void {
      nativeElement.style.overflow = 'hidden';
      nativeElement.style.height = 'auto';
      nativeElement.style.height = nativeElement.scrollHeight + "px";
    }
}
