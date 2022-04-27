import { Either, Take, When } from './types';
import { isValueDefined, propAt } from './utils';

export const take: Take = (key) => propAt((key as string).split('.'));

export const either: Either =
  (...takes) =>
  (fromObject) => {
    for (const t of takes) {
      const value = t(fromObject);
      if (isValueDefined(value)) return value;
    }

    return null;
  };

export const when: When = (predTake, pred, takeValue) => (fromObject) => {
  const predValue = (predTake as any)(fromObject);
  if (pred(predValue)) {
    return (takeValue as any)(fromObject);
  }

  return null;
};
