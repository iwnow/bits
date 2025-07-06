/* eslint-disable @angular-eslint/use-pipe-transform-interface */
import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: true,
})
export class MoneyPipe extends CurrencyPipe {
  override transform(
    value: null | undefined | number,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string
  ): any {
    return super.transform(value, undefined, undefined, '1.0-0') as any;
  }
}
