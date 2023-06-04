import { TakeOperatorResult } from './operators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OperatorAny = any;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OperatorDefinition {}
type DefaultDef = OperatorDefinition;

export abstract class Operator<
  InputShape = OperatorAny,
  Output = OperatorAny,
  Def extends OperatorDefinition = DefaultDef
> {
  readonly _input!: InputShape;
  readonly _output!: Output;
  readonly _def: Def;

  constructor(def: Def) {
    this._def = def;
  }

  abstract transform<TInputShape extends InputShape>(
    input: TInputShape
  ): Operator<TInputShape>['_output'];
}

type extractOperators<
  TShape,
  Operators extends Operator[] = []
> = TShape extends {
  [Key in keyof TShape]: infer TOperator;
}
  ? TOperator extends Operator
    ? [TOperator, ...Operators]
    : TOperator extends Record<string, unknown>
    ? extractOperators<TOperator, Operators>
    : Operators
  : Operators;

type setOperatorInput<TShape, TInputShape> = {
  [Key in keyof TShape]: TShape[Key] extends Operator
    ? TakeOperatorResult<TShape[Key], TInputShape>['_output']
    : TShape[Key] extends Record<string, unknown>
    ? setOperatorInput<TShape[Key], TInputShape>
    : TShape[Key];
};

interface ObjectMapDef<TShape> extends OperatorDefinition {
  shape: TShape;
}
class ObjectMapOperator<
  TShape,
  InputShape = extractOperators<TShape>[number]['_input'],
  Output = setOperatorInput<TShape, InputShape>
> extends Operator<InputShape, Output, ObjectMapDef<TShape>> {
  transform<TInputShape extends InputShape>(
    input: TInputShape
  ): ObjectMapOperator<TShape, TInputShape>['_output'] {
    return '' as unknown as any;
  }

  static create<TShape extends Record<string, unknown>>(
    shape: TShape
  ): ObjectMapOperator<TShape> {
    return new ObjectMapOperator({
      shape
    });
  }
}
