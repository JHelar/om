import * as _ from 'ts-toolbelt';
import { isValueDefined } from '~/utils';
import { EitherOperator } from './either.types';

export const either: EitherOperator =
  (...mapFns) =>
  (fromObject) => {
    for (const mapFn of mapFns) {
      const value = mapFn(fromObject);
      if (isValueDefined(value)) return value;
    }

    return null;
  };
