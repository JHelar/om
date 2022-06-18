import { isValueTruthy } from '~/utils';
import { When } from './when.types';

export const when: When = (operator, success) => (fromObject) => {
  if (isValueTruthy(operator(fromObject))) {
    return success(fromObject);
  }

  return null;
};
