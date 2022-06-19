import _ from 'ts-toolbelt';
import { EitherResult, Operator } from '~/types';

export type EitherOperator = <TOperators extends Operator[]>(
  ...operators: TOperators
) => EitherResult<TOperators>;
