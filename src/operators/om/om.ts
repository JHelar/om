import { Om } from './om.types';

export const om: Om = (schema) => (fromObject) =>
  Object.keys(schema).reduce(
    (prev, current) => ({
      ...prev,
      [current]: prev[current](fromObject)
    }),
    schema
  ) as any;
