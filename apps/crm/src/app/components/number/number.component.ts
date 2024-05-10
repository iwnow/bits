import { Component, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'b-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css'],
  standalone: true,
  imports: [InputNumberModule, ReactiveFormsModule],
})
export class NumberComponent extends FrmsControlBaseComponent {
  inputId = input<
    'minmaxfraction' | 'minmax' | 'integeronly' | 'withoutgrouping'
  >('integeronly');

  useGrouping = input(true);
}
