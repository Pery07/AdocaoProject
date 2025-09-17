import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `<div class="card"><ng-content></ng-content></div>`,
  styles: [`.card{background:#fff;border-radius:14px;box-shadow:0 10px 24px rgba(0,0,0,.08);padding:16px}`]
})
export class CardComponent {}
