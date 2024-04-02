import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntryComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
            title: 'Вход',
          },
          {
            path: '**',
            redirectTo: 'login',
          },
        ],
      },
    ]),
  ],
  declarations: [EntryComponent, LoginComponent],
})
export default class EntryModule {}
