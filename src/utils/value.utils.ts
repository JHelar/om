export const isValueDefined = <TValue>(
  value: TValue | null | undefined
): value is TValue => value !== null && value !== undefined;

export const isValueTruthy = <TValue>(value: TValue): boolean => Boolean(value);
