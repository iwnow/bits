import { Type } from 'crm-utils';

const mappers = new Set<any>();

export function addDTOMapper<T extends { toDTO: () => any }>(mapper: Type<T>) {
  mappers.add(mapper);
}

export function toDTO<R>(model: unknown, domainType?: any): Partial<R> {
  if (domainType) {
    const dto = domainType.prototype.toDTO.call(model);
    return dto;
  }
  const mapper = Array.from(mappers).find((i) => model instanceof i);
  const dto = mapper.prototype.toDTO.call(model);
  return dto as Partial<R>;
}
