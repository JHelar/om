import * as _ from 'ts-toolbelt';
import { propAt } from '~/utils';
import type { Take } from './take.types';

export const take: Take = (key) => propAt(key.split('.'));
