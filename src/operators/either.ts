import { Either } from '../types';
import { isValueDefined } from '../utils';

export const either: Either =
  (...takes) =>
  (fromObject) => {
    for (const t of takes) {
      const value = t(fromObject);
      if (isValueDefined(value)) return value;
    }

    return null;
  };
