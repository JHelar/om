import type { NullableValues, OmMapper, OmSchema } from './types';

export const createOm =
  <TFromObject = any, TToObject = any>(
    schema: OmSchema<TFromObject, TToObject>
  ): OmMapper<TFromObject, TToObject> =>
  (fromObject) => {
    const result = Object.keys(schema).reduce(
      (prev, current) => ({
        ...prev,
        [current]: (schema as any)[current](fromObject)
      }),
      {} as NullableValues<TToObject>
    );

    return result;
  };
