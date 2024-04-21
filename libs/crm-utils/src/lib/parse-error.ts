export function parseErrorMessage(err: any) {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === 'string') {
    return err;
  }
  return `Неизвестная ошибка. ${err}`;
}
