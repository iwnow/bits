import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { jsonTryParse, jsonTryStringify } from 'crm-utils';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'b-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, InputTextareaModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonComponent extends FrmsControlBaseComponent implements OnInit {
  ngOnInit() {
    const fc = this.formControl();
    (fc as any).$controlValueGetter = this.controlValueGetter.bind(this);
    const value = fc.value;
    if (typeof value !== 'string') {
      const json = JSON.stringify(
        typeof value === 'object' ? value : {},
        null,
        4
      );
      this.formControl().patchValue(json);
    }
  }

  controlValueGetter() {
    const json = this.formControl().value;
    const value = jsonTryParse(json);
    return value;
  }
}
