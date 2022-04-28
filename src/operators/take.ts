import { Take } from '../types';
import { propAt } from '../utils';

export const take: Take = (key) => propAt((key as string).split('.'));
