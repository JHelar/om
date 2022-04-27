import { CreateOm } from './types';

export const createOm: CreateOm = (schema) => (fromObject) => {
  const result = Object.keys(schema).reduce(
    (prev, current) => ({
      ...prev,
      [current]: (schema as any)[current](fromObject)
    }),
    {} as any
  );

  return result;
};
