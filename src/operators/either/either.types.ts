import _ from 'ts-toolbelt';
import { EitherResult, Operator } from '~/types';

export type Either = <TOperators extends Operator[]>(
  ...operators: TOperators
) => EitherResult<TOperators>;
