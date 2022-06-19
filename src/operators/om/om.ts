import { OmOperator } from './om.types';

export const om: OmOperator = (schema) => (fromObject) =>
  Object.keys(schema).reduce(
    (prev, current) => ({
      ...prev,
      [current]: prev[current](fromObject)
    }),
    schema
  ) as any;
