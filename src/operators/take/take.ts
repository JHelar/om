import type { Take } from '~/types';
import { propAt } from '~/utils';

export const take: Take = (key) => propAt(key.split('.'));
