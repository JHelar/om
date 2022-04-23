import { isValueDefined } from './value.utils';

export const prop =
  (prop: string) =>
  (fromObject: any): any =>
    fromObject && isValueDefined(fromObject[prop]) ? fromObject[prop] : null;

export const propAt =
  ([key, ...rest]: string[]) =>
  <TObject>(fromObject: TObject): any | null => {
    const next = prop(key)(fromObject);
    if (!rest.length || next === null) return next;
    return propAt(rest)(next);
  };
