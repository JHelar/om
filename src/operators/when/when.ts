import { isValueTruthy } from '~/utils';
import { WhenOperator } from './when.types';

export const when: WhenOperator = (operator, success) => (fromObject) => {
  if (isValueTruthy(operator(fromObject))) {
    return success(fromObject);
  }

  return null;
};
