import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN } from 'crm-core';

@Component({
  selector: 'b-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  standalone: true,
  imports: [CommonModule, FrmsComponent],
})
export class UserCreateComponent {
  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  userEntity = DOMAIN.User;

  get valid() {
    return this.frms.valid;
  }

  getUser(): DOMAIN.User {
    return this.frms?.getValue();
  }
}
