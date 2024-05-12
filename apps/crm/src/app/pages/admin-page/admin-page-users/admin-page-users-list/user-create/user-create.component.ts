import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { DTOUser } from 'crm/core/dto';

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

  userEntity = DTOUser;

  get valid() {
    return this.frms.valid;
  }

  getUser(): DTOUser {
    return this.frms?.getValue();
  }
}
