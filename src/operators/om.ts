import { Om } from '../types_old';

export const om: Om = (schema) => (fromObject) => {
  const result = Object.keys(schema).reduce(
    (prev, current) => ({
      ...prev,
      [current]: (schema as any)[current](fromObject)
    }),
    {} as any
  );

  return result;
};
