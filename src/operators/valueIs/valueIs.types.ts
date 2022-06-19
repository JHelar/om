import _ from 'ts-toolbelt';
import { Operator, ValueIsResult, ValuePred } from '~/types';

export type ValueIsOperator = <
  TOperator extends Operator,
  TValueOrPred extends _.M.Primitive | ValuePred
>(
  operator: TOperator,
  valueOrPred: TValueOrPred
) => ValueIsResult;
