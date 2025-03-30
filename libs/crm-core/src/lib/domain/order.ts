export const OrderState = {
  all: -1,
  new: 1,
  confirmed: 2,
  payed: 5,
  cancel: 4,
  WAIT_PREPAYM: 3,
  WAIT_CONF: 6,
};

export const OrderStateNames = Object.freeze({
  [OrderState.all]: 'Все',
  [OrderState.new]: 'Новый',
  [OrderState.confirmed]: 'Подтвержден',
  [OrderState.payed]: 'Оплачен',
  [OrderState.cancel]: 'Отменен',
  [OrderState.WAIT_PREPAYM]: 'Ожидает предоплаты',
  [OrderState.WAIT_CONF]: 'Ожидает подтверждения',
});
