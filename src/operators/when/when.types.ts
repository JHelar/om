import _ from 'ts-toolbelt';
import { Operator, WhenResult } from '~/types';

export type WhenOperator = <
  TOperator extends Operator,
  TSuccessOperator extends Operator
>(
  operator: TOperator,
  success: TSuccessOperator
) => WhenResult<TSuccessOperator>;
