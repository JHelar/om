import * as _ from 'ts-toolbelt';
import { isValueDefined } from '~/utils';
import { Either } from './either.types';

export const either: Either =
  (...mapFns) =>
  (fromObject) => {
    for (const mapFn of mapFns) {
      const value = mapFn(fromObject);
      if (isValueDefined(value)) return value;
    }

    return null;
  };
