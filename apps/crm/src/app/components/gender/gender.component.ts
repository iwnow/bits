import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'b-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule],
})
export class GenderComponent extends FrmsControlBaseComponent {
  options = input([
    { name: 'Мужской', value: 1 },
    { name: 'Женский', value: 0 },
  ]);
  optionLabel = input('name');
  optionValue = input('value');
}
