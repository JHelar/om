import {
  Operator,
  type OperatorDefinition,
  type OperatorAny
} from '../../types';

export type TakeOperatorResult<
  TOperator extends Operator,
  InputShape
> = TOperator extends TakeOperator<infer TKey, infer TDefaultValue>
  ? TakeOperator<TKey, TDefaultValue, InputShape>
  : never;

export type constructShape<
  TKey extends string,
  TValue = OperatorAny
> = TKey extends `${infer part}.${infer rest}`
  ? {
      [k in part]?: constructShape<rest, TValue> | null;
    }
  : {
      [k in TKey]?: TValue | null;
    };

export type getValueAt<TKey extends string, TShape> = TShape extends Record<
  string,
  OperatorAny
>
  ? TKey extends `${infer part}.${infer rest}`
    ? getValueAt<rest, NonNullable<TShape[`${part & string}`]>>
    : TShape[`${TKey}`]
  : never;

type either<TOutput, TDefaultValue> = [TOutput] extends [never]
  ? TDefaultValue
  : TOutput;

type KeyPath = string[];

interface TakeDef<TKey extends string, TDefaultValue>
  extends OperatorDefinition {
  key: TKey;
  defaultValue: TDefaultValue;
}

export class TakeOperator<
  TKey extends string,
  TDefaultValue = null,
  InputShape = constructShape<TKey> | null | undefined,
  Output = either<getValueAt<TKey, InputShape>, TDefaultValue>
> extends Operator<InputShape, Output, TakeDef<TKey, TDefaultValue>> {
  private _isDefined<TValue>(
    value: TValue | null | undefined
  ): value is TValue {
    if (value === null) return false;
    if (value === undefined) return false;
    return true;
  }

  private _propAt<TShape extends Record<string, OperatorAny>>(
    [key, ...rest]: KeyPath,
    shape: TShape
  ): OperatorAny {
    const value = shape[key] ?? null;
    if (!this._isDefined(value)) return this._def.defaultValue;
    if (rest.length === 0) return value;
    return this._propAt(rest, value);
  }

  transform<TInputShape extends InputShape>(
    input: TInputShape
  ): TakeOperator<TKey, TDefaultValue, TInputShape>['_output'] {
    const value = this._propAt(this._def.key.split('.'), input as OperatorAny);
    return value;
  }

  default<TDefaultValue>(
    defaultValue: TDefaultValue
  ): TakeOperator<TKey, TDefaultValue> {
    return new TakeOperator({
      defaultValue,
      key: this._def.key
    });
  }

  static create<TKey extends string>(key: TKey): TakeOperator<TKey> {
    return new TakeOperator({
      defaultValue: null,
      key
    }) as OperatorAny;
  }
}

export const take = TakeOperator.create;
