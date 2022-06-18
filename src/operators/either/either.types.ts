import _ from 'ts-toolbelt';
import { Operator, OperatorResultValue } from '~/types';

export type Either = <TOperators extends Operator[]>(
  ...operators: TOperators
) => <TShape extends _.O.Object>(
  from: TShape
) => OperatorResultValue<TOperators[number], TShape>;
