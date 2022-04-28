type Keys<TShape> = TShape extends TShape ? keyof TShape : never;

type ObjectRecord<TKey = string> = { [k in `${string & TKey}`]?: unknown };

type NextShape<TStringKey, TShape> =
  TStringKey extends `${infer TMainKey}.${infer TNextKey}.${infer TRestKey}`
    ? TMainKey extends Keys<TShape>
      ? Extract<TShape[TMainKey], ObjectRecord<TNextKey>>
      : never
    : TStringKey extends `${infer TMainKey}.${infer TNextKey}`
    ? TMainKey extends Keys<TShape>
      ? Extract<TShape[TMainKey], ObjectRecord<TNextKey>>
      : never
    : TStringKey extends Keys<TShape>
    ? TShape[TStringKey]
    : never;

type ValidKeys<
  TStringKey,
  TShape,
  S extends string = ''
> = TStringKey extends `${infer TMainKey}.${infer TNextKey}`
  ? TMainKey extends Keys<TShape>
    ? S extends ''
      ? ValidKeys<TNextKey, NextShape<TStringKey, TShape>, TMainKey>
      : ValidKeys<TNextKey, NextShape<TStringKey, TShape>, `${S}.${TMainKey}`>
    : S
  : TStringKey extends Keys<TShape>
  ? S extends ''
    ? TStringKey
    : `${S}.${string & TStringKey}`
  : S;

type AllObjectKeys<TShape> = TShape extends ObjectRecord
  ?
      | `${string & Keys<TShape>}`
      | `${string & Keys<TShape>}.${AllObjectKeys<TShape[Keys<TShape>]>}`
  : never;

export type ObjectKeys<TShape extends object> = ValidKeys<
  AllObjectKeys<TShape>,
  TShape
>;

type TypeForKey<TStringKey, TShape> =
  TStringKey extends `${infer TKey}.${infer TRestKey}`
    ? TKey extends Keys<TShape>
      ? TypeForKey<TRestKey, NextShape<TStringKey, TShape>>
      : never
    : TStringKey extends Keys<TShape>
    ? TShape[TStringKey]
    : never;

export type Maybe<TValue> = TValue | null;
export type MapValueFn<TShape, TValue> = <TShapeInfered extends TShape>(
  from: TShapeInfered
) => Maybe<TValue>;
type Unwrap<TMaybe> = TMaybe extends Maybe<infer TValue> ? TValue : never;

type ValueFromTake<TTake> = TTake extends (from: any) => infer TResult
  ? Unwrap<TResult>
  : never;

type ShapeFromTake<TTake> = TTake extends (from: infer TShape) => infer TResult
  ? TShape
  : never;

type OmSchema<TShape extends ObjectRecord, TToShape extends ObjectRecord> = {
  [k in keyof TToShape]: MapValueFn<TShape, TToShape[k]>;
};
export type Om = <TShape extends ObjectRecord, TToShape extends ObjectRecord>(
  schema: OmSchema<TShape, TToShape>
) => MapValueFn<TShape, TToShape>;

export type Take = <
  TShape extends ObjectRecord,
  TKey extends ObjectKeys<TShape>
>(
  key: TKey
) => MapValueFn<TShape, TypeForKey<TKey, TShape>>;

export type Either = <TTake extends any[]>(
  ...takes: TTake
) => MapValueFn<ShapeFromTake<TTake[number]>, ValueFromTake<TTake[number]>>;

export type When = <TPredTake, TTake>(
  predTake: TPredTake,
  pred: (value: Maybe<ValueFromTake<TPredTake>>) => boolean,
  take: TTake
) => MapValueFn<ShapeFromTake<TPredTake>, ValueFromTake<TTake>>;
