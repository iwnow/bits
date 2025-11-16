/**
@example

entity decorator (code) -> frms schema (json) -> render

@formGroup()
class User {

    @formControl({ type: 'text' })
    name: string;

    @formControl({ type: 'number' })
    age: number;

    @formGroup(Address)
    address: Address;

    @formArray({ type: 'role' })
    roles: Role[];

}

@formGroup()
class Address {

    @formControl({ type: 'text' })
    street: string;

}

class Role {
    id: number;
    name: string;
}

 */

import { Provider } from '@angular/core';
import {
  AsyncValidator,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  isFormControl,
  isFormGroup,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Extendable, WithRequired } from 'crm-utils';

const SYM_FRMS = Symbol('frms metadata');

export function frmsMeta(type: any) {
  const proto = type?.prototype || type;
  proto[SYM_FRMS] = proto[SYM_FRMS] || {};
  return proto[SYM_FRMS] as FrmsMeta;
}

export function frmGroup(type?: any, options?: Partial<FrmControlOptions>) {
  return (ctor: any, field?: string) => {
    const meta = frmsMeta(ctor);
    if (typeof field === 'string') {
      meta.groups = meta.groups || {};
      meta.groups[field] = { type, options };
      meta.fields = meta.fields || [];
      meta.fields.push(field);
    }
  };
}

export function frmControl(options: FrmControlOptions) {
  return (ctor: any, field: string) => {
    const meta = frmsMeta(ctor);
    if (typeof field === 'string') {
      meta.controls = meta.controls || {};
      meta.controls[field] = options;
      meta.fields = meta.fields || [];
      meta.fields.push(field);
    }
  };
}

export function frmArray(options: FrmControlOptions) {
  return (ctor: any, field?: string) => {
    const meta = frmsMeta(ctor);
    if (typeof field === 'string') {
      meta.arrays = meta.arrays || {};
      meta.arrays[field] = options;
    }
  };
}

export function schemaFromEntity(e: any): FrmSchema {
  return {
    meta: frmsMeta(e),
  };
}

export function formGroupFromSchema(
  sc: FrmSchema,
  fb: FormBuilder,
  components: FrmComponents
): FormGroup {
  const controls: any = {};
  const isGroup = (f: string) => f in (sc.meta.groups || {});
  for (const field of sc.meta?.fields || []) {
    if (isGroup(field)) {
      const options = sc.meta.groups[field];
      const meta = frmsMeta(options.type);
      controls[field] = formGroupFromSchema({ meta }, fb, components);
      controls[field].$options = options;
    } else {
      const options = sc.meta.controls[field];
      const componentTypeOptions = components[options.type]?.options || {};
      Object.assign(componentTypeOptions, options);
      Object.assign(options, componentTypeOptions);
      controls[field] = fb.control(
        { value: options.defaultValue, disabled: options.disabled },
        options.validators
      );
      controls[field].$options = options;
      if (typeof options.valueGetter === 'function') {
        controls[field].$controlValueGetter = options.valueGetter;
      }
      if (typeof options.valueSetter === 'function') {
        const realSetter = controls[field].setValue;
        controls[field].setValue = function setValue(...args) {
          args[0] = options.valueSetter({ value: args[0] });
          return realSetter.call(controls[field], ...args);
        };
      }
    }
  }
  const fg = fb.group(controls);
  return fg;
}

export type FrmsMeta = {
  controls: Record<string, FrmControlOptions>;
  groups: Record<string, FrmControlOptions>;
  arrays: Record<string, FrmControlOptions>;
  fields: string[];
};

export type FrmControlOptions = Extendable<
  WithRequired<
    Partial<{
      type: any;
      label: string | boolean;
      validators:
        | ValidatorFn
        | AsyncValidatorFn
        | ValidatorFn[]
        | AsyncValidatorFn[];
      disabled: boolean;
      defaultValue: any;
      inputs: Record<string, any>;
      valueGetter: (opt: { control: FormControl; value: any }) => any;
      valueSetter: (opt: { value: any }) => any;
      hide: boolean;
    }>,
    'type'
  >
>;

export type FrmSchema = Extendable<{
  meta: FrmsMeta;
}>;

export type FrmComponentDesc = Extendable<{
  type: any;
  inputs?: Record<string, any>;
  options?: Partial<FrmControlOptions>;
}>;

export abstract class FrmComponents {
  [key: string]: FrmComponentDesc;
}

export function provideFrmsComponents(cs: FrmComponents): Provider {
  return {
    provide: FrmComponents,
    useFactory: () => cs,
  };
}

export function iterateControls(
  fg: FormGroup,
  cb: (control: FormControl) => void
) {
  for (const control of Object.values(fg.controls)) {
    if (isFormGroup(control)) {
      iterateControls(control, cb);
    } else if (isFormControl(control)) {
      cb(control);
    }
  }
}
