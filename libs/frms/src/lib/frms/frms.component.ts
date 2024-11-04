import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FrmComponents,
  FrmSchema,
  FrmsMeta,
  formGroupFromSchema,
  frmsMeta,
  schemaFromEntity,
} from './frms.core';

@Component({
  selector: 'b-frms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './frms.component.html',
  styleUrl: './frms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrmsComponent {
  _componentsInitial = inject(FrmComponents, { optional: true });

  value = input();
  entity = input();
  schema = input<FrmSchema>(null as any as FrmSchema);
  components = input<FrmComponents>(this._componentsInitial || {});
  formClass = input('');
  fieldClass = input('');

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

  get valid() {
    return this._fg().valid;
  }

  reset() {
    this._fg().reset();
  }

  getValue<T>(): T {
    return this.getValueFormGroup(this._fg());
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

  isFormGroup(e: any) {
    return e instanceof FormGroup;
  }

  isFormControl(e: any) {
    return e instanceof FormControl;
  }

  getControlDesc(control, field) {
    const components = this.components();
    const options = control.$options;
    const componentType = components[options.type]?.type;
    const componentInputs = {
      ...(components[options.type]?.inputs || {}),
      placeholder: options.placeholder || options.label,
      ...(options.inputs || {}),
      formControl: control,
    };
    return {
      field,
      options,
      componentType,
      componentInputs,
    };
  }

  addPath(path: string[], ...fields) {
    return [...path, ...fields];
  }

  getControlOrder(path: string[]) {
    let prefm: FrmsMeta;
    const meta = path.reduce((fm, field) => {
      prefm = fm;
      fm = fm.groups?.[field]?.type ? frmsMeta(fm.groups[field].type) : fm;
      return fm;
    }, this._entityScehma().meta);
    const order = prefm.fields.indexOf(path[path.length - 1]);
    return order;
  }

  getValueFormGroup(fg: FormGroup) {
    const ret = {} as any;
    Object.entries(fg.controls).forEach(([name, control]) => {
      if (this.isFormGroup(control)) {
        ret[name] = this.getValueFormGroup(control);
      } else {
        ret[name] = control.value;
      }
    });
    return ret;
  }
}
