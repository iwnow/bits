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

import { FormBuilder, FormGroup } from '@angular/forms';
import { Extendable } from 'crm-utils';

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
    controls[name] = ['']
  });
  const fg = fb.group(controls);
  return fg;
}

export type FrmsMeta = {
  controls: Record<string, any>;
  groups: Record<string, any>;
  arrays: Record<string, any>;
};

export type FrmControlOptions = Extendable<{
  type: any;
}>;

export type FrmSchema = Extendable<{
  meta: FrmsMeta;
}>;
