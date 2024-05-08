import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FrmSchema, formGroupFromSchema, schemaFromEntity } from './frms.core';
import { Extendable } from 'crm-utils';

@Component({
  selector: 'b-frms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './frms.component.html',
  styleUrl: './frms.component.scss',
})
export class FrmsComponent {
  value = input();
  entity = input();
  schema = input<FrmSchema>(null as any as FrmSchema);
  components = input<Record<string, Extendable<{ type: any }>>>({});

  _fb = inject(FormBuilder);

  _entityScehma = computed(() => schemaFromEntity(this.entity()));
  _schema = computed<FrmSchema>(() =>
    this.schema() ? this.schema() : this._entityScehma()
  );
  _fg = computed(() => {
    const fg = formGroupFromSchema(this._schema(), this._fb);
    return fg;
  });
}
