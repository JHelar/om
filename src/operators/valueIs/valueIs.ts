import { ValueIsOperator } from './valueIs.types';

export const valueIs: ValueIsOperator = (operator, valueOrPred) => (from) => {
  const compareValue = operator(from);

  if (typeof valueOrPred === 'function') {
    return valueOrPred(compareValue);
  }

  return compareValue === valueOrPred;
};
