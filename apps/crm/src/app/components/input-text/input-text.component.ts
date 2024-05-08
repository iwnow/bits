import { Component, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'b-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
})
export class InputTextComponent {
  formControlName = input('');
}
