import _ from 'ts-toolbelt';
import { ToKeyPath, KeyPathString, TakeResult } from '~/types';

export type TakeOperator = <
  TKeyString extends KeyPathString,
  TKeyPath = ToKeyPath<TKeyString>
>(
  key: TKeyString
) => TakeResult<TKeyPath>;
