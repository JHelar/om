import { When } from '../types';

export const when: When = (predTake, pred, takeValue) => (fromObject) => {
  const predValue = (predTake as any)(fromObject);
  if (pred(predValue)) {
    return (takeValue as any)(fromObject);
  }

  return null;
};
