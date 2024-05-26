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
  FormGroup,
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

export function frmGroup(type?: any) {
  return (ctor: any, field?: string) => {
    const meta = frmsMeta(ctor);
    if (typeof field === 'string') {
      meta.groups = meta.groups || {};
      meta.groups[field] = { type };
    }
  };
}

export function frmControl(options: FrmControlOptions) {
  return (ctor: any, field: string) => {
    const meta = frmsMeta(ctor);
    if (typeof field === 'string') {
      meta.controls = meta.controls || {};
      meta.controls[field] = options;
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

export function formGroupFromSchema(sc: FrmSchema, fb: FormBuilder): FormGroup {
  const controls: any = {};
  Object.entries(sc.meta.controls).forEach(([name, options]) => {
    controls[name] = [undefined, options.validators];
  });
  const fg = fb.group(controls);
  return fg;
}

export type FrmsMeta = {
  controls: Record<string, FrmControlOptions>;
  groups: Record<string, FrmControlOptions>;
  arrays: Record<string, FrmControlOptions>;
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
