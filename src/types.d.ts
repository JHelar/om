import _ from 'ts-toolbelt';

type KeyPath = _.List<_.A.Key>;
type KeyPathString = string;
type ToKeyPath<TKeyString extends KeyPathString> = _.A.Cast<
  _.S.Split<TKeyString, '.'>,
  KeyPath
>;

type KeyValue<TKey extends KeyPath, TShape extends _.O.Object> = _.O.Path<
  TShape,
  TKey
>;

type KeyShape<TKey extends KeyPath> = _.O.Nullable<
  _.O.P.Record<TKey, unknown, ['?', 'W']>,
  _.A.Key,
  'deep'
>;

type OperatorResult<TValue> = TValue | null;

type Operator = <TShape>(from: TShape) => OperatorResult<any>;

type TakeResultValue<TKeyPath extends KeyPath, TShape> = OperatorResult<
  KeyValue<TKeyPath, TShape>
>;

type TakeResult<TKeyPath extends KeyPath> = <TShape = KeyShape<TKeyPath>>(
  from: TShape
) => KeyValue<TKeyPath, TShape>;

type TakeOperationResultValue<TOperation, TShape> =
  TOperation extends TakeResult<infer TKeyPath>
    ? KeyValue<TKeyPath, TShape>
    : never;

type OperatorResultValue<TOperator, TShape> = TakeOperationResultValue<
  TOperator,
  TShape
>;
