import { HttpErrorResponse } from '@angular/common/http';

export function parseErrorMessage(err: any) {
  if (err instanceof HttpErrorResponse) {
    const detail = err?.error?.detail || err?.error?.details;
    if (Array.isArray(detail)) {
      const details = detail
        .map((i) => {
          if (Array.isArray(i.loc)) {
            return i.loc.join('.') + ' ' + i.msg;
          }
          return i.msg;
        })
        .filter(Boolean)
        .join('\n ');
      return `${err.message}\n ${details}`;
    }
    if (Array.isArray(detail?.errors)) {
      const details = detail.errors.join('\n ');
      return `${err.message}\n ${details}`;
    }
    if (err.error?.sysinfo?.message) {
      return err.message + '\n' + err.error?.sysinfo?.message;
    }
    return err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === 'string') {
    return err;
  }
  return `Неизвестная ошибка. ${err}`;
}
