import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'b-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule],
})
export class CheckboxComponent
  extends FrmsControlBaseComponent
  implements OnInit
{
  ngOnInit(): void {
    // const fc = this.formControl();
    // if (typeof fc.value !== 'boolean') {
    //   fc.setValue(false);
    // }
  }
}
