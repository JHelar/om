import _ from 'ts-toolbelt';

type KeyPath = _.List<_.A.Key>;
type KeyPathString = string;
type ToKeyPath<TKeyString extends KeyPathString> = _.A.Cast<
  _.S.Split<TKeyString, '.'>,
  KeyPath
>;

type KeyValue<
  TKeyPath extends KeyPath,
  TShape extends _.O.Object,
  State extends number[] = []
> = [...State, 1]['length'] extends TKeyPath['length']
  ? _.O.Pick<TShape, TKeyPath[State['length']]>[TKeyPath[State['length']]]
  : KeyValue<
      TKeyPath,
      _.O.Pick<TShape, TKeyPath[State['length']]>[TKeyPath[State['length']]],
      [...State, 1]
    >;

type KeyShape<TKey extends KeyPath> = _.O.Nullable<
  _.O.P.Record<TKey, unknown, ['?', 'W']>,
  _.A.Key,
  'deep'
>;

type OperatorResult<TValue> = TValue extends undefined ? null : TValue | null;

type Operator = <TShape>(from: TShape) => OperatorResult<any>;

type TakeResult<TKeyPath extends KeyPath> = <TShape = KeyShape<TKeyPath>>(
  from: TShape
) => OperatorResult<KeyValue<TKeyPath, TShape>>;

type TakeOperationResultValue<TOperation, TShape> =
  TOperation extends TakeResult<infer TKeyPath>
    ? KeyValue<TKeyPath, TShape>
    : never;

type EitherResult<TOperators> = <TShape extends _.O.Object>(
  from: TShape
) => OperatorResult<OperatorResultValue<TOperators[number], TShape>>;

type EitherOperationResultValue<TOperation, TShape> =
  TOperation extends EitherResult<infer TOperators>
    ? OperatorResultValue<TOperators[number], TShape>
    : never;

type WhenResult<TOperator> = <TShape extends _.O.Object>(
  from: TShape
) => OperatorResult<OperatorResultValue<TOperator, TShape>>;

type WhenOperationResultValue<TOperation, TShape> =
  TOperation extends WhenResult<infer TOperator>
    ? OperatorResultValue<TOperator, TShape>
    : never;

type OmResult<TSchema> = <TShape extends _.O.Object>(
  from: TShape
) => {
  [k in keyof TSchema]: OperatorResultValue<TSchema[k], TShape>;
};

type OmOperationResultValue<TOperation, TShape> = TOperation extends OmResult<
  infer TSchema
>
  ? {
      [k in keyof TSchema]: OperatorResultValue<TSchema[k], TShape>;
    }
  : never;

type OperatorResultValue<TOperator, TShape> =
  | TakeOperationResultValue<TOperator, TShape>
  | EitherOperationResultValue<TOperator, TShape>
  | WhenOperationResultValue<TOperator, TShape>
  | OmOperationResultValue<TOperator, TShape>;
