import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FrmComponents,
  FrmSchema,
  formGroupFromSchema,
  schemaFromEntity,
} from './frms.core';

@Component({
  selector: 'b-frms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './frms.component.html',
  styleUrl: './frms.component.scss',
})
export class FrmsComponent {
  _componentsInitial = inject(FrmComponents, { optional: true });

  value = input();
  entity = input();
  schema = input<FrmSchema>(null as any as FrmSchema);
  components = input<FrmComponents>(this._componentsInitial || {});

  _injector = inject(Injector);
  _fb = inject(FormBuilder);
  _frmsInjector = this.createInjector(this._injector);

  _entityScehma = computed(() => schemaFromEntity(this.entity()));
  _schema = computed<FrmSchema>(() =>
    this.schema() ? this.schema() : this._entityScehma()
  );
  _fg = computed(() => {
    const value = this.value();
    const fg = formGroupFromSchema(this._schema(), this._fb);
    if (value) {
      fg.patchValue(value);
    }
    return fg;
  });
  _controls = computed(() => {
    const components = this.components();
    const schema = this._schema();
    const fg = this._fg();
    const result = Object.entries(schema.meta.controls).map(
      ([name, options]) => {
        const componentType = components[options.type]?.type;
        const componentInputs = {
          ...(components[options.type]?.inputs || {}),
          placeholder: options.placeholder || options.label,
          ...(options.inputs || {}),
          formControl: fg.get(name),
        };
        return {
          name,
          options,
          componentType,
          componentInputs,
        };
      }
    );
    return result;
  });

  get valid() {
    return this._fg().valid;
  }

  reset() {
    this._fg().reset();
  }

  getValue<T>(): T {
    return this._fg().value;
  }

  createInjector(inj: Injector) {
    return Injector.create({
      parent: inj,
      name: 'FrmsInjector',
      providers: [
        {
          provide: FormGroup,
          useFactory: () => this._fg(),
        },
      ],
    });
  }
}
