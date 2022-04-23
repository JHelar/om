import { Either, Take, When } from './types';
import { isValueDefined, propAt } from './utils';

export const take: Take = (key) => propAt(key.split('.'));

export const either: Either =
  (...takes) =>
  (fromObject) => {
    for (const take of takes) {
      const value = take(fromObject);
      if (isValueDefined(value)) return value;
    }

    return null;
  };

export const when: When = (key, pred, takeValue) => {
  const getPredValue = take(key);

  return (fromObject) => {
    const predValue = getPredValue(fromObject);
    if (pred(predValue)) {
      return takeValue(fromObject);
    }

    return null;
  };
};
