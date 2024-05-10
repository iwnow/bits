import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'b-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
  standalone: true,
  imports: [InputMaskModule, ReactiveFormsModule],
})
export class PhoneComponent extends FrmsControlBaseComponent {}
