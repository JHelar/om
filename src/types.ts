type Keys<TShape> = TShape extends TShape ? keyof TShape : never;

type PropertyKeys<TShape> = TShape extends Record<string, unknown>
  ?
      | `${string & Keys<TShape>}`
      | `${string & Keys<TShape>}.${PropertyKeys<TShape[Keys<TShape>]>}`
  : never;

type AssertKeyType<
  TStringKey,
  TFromShape,
  TType,
  S extends string = ''
> = TStringKey extends `${infer TKey}.${infer TRestKey}`
  ? TKey extends Keys<TFromShape>
    ? S extends ''
      ? AssertKeyType<TRestKey, TFromShape[TKey], TType, TKey>
      : AssertKeyType<TRestKey, TFromShape[TKey], TType, `${S}.${TKey}`>
    : never
  : TStringKey extends `${infer TKey}`
  ? TKey extends Keys<TFromShape>
    ? TFromShape[TKey] extends TType
      ? S extends ''
        ? TKey
        : `${S}.${TKey}`
      : never
    : never
  : never;

export type TakeValue<TValue> = TValue | null;

export type TakeValueFn<TFromShape, TValue> = (
  fromObject: TFromShape
) => TakeValue<TValue>;

export type Take = <TFromShape = any, TValue = any>(
  key: AssertKeyType<PropertyKeys<TFromShape>, TFromShape, TValue>
) => TakeValueFn<TFromShape, TValue>;

export type Either = <TFromShape = any, TValue = any>(
  ...takes: TakeValueFn<TFromShape, TValue>[]
) => TakeValueFn<TFromShape, TValue>;

export type When = <TFromShape = any, TValue = any, TResultValue = any>(
  key: AssertKeyType<PropertyKeys<TFromShape>, TFromShape, TValue>,
  pred: (value: TakeValue<TValue>) => boolean,
  take: TakeValueFn<TFromShape, TResultValue>
) => TakeValueFn<TFromShape, TResultValue>;

export type NullableValues<TObject> = {
  [k in keyof TObject]: TObject[k] | null;
};

export type OmSchema<TFromShape, TToShape> = {
  [k in keyof TToShape]: TakeValueFn<TFromShape, TToShape[k]>;
};

export type OmMapper<TFromShape, TToShape> = (
  from: TFromShape
) => NullableValues<TToShape>;
