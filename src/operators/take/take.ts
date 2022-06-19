import * as _ from 'ts-toolbelt';
import { propAt } from '~/utils';
import type { TakeOperator } from './take.types';

export const take: TakeOperator = (key) => propAt(key.split('.'));
