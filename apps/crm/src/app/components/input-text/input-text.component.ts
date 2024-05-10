import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'b-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
})
export class InputTextComponent extends FrmsControlBaseComponent {}
