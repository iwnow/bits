import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'b-page-404',
  standalone: true,
  imports: [MessagesModule],
  template: `
    <p-messages
      [value]="messages"
      [enableService]="false"
      [closable]="false"
    ></p-messages>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 0 1rem;
      }
    `,
  ],
})
export class Page404Component {
  messages = [
    { severity: 'error', summary: '404', detail: 'Страницы не существует' },
  ];
}
