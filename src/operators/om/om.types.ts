import _ from 'ts-toolbelt';
import { OmResult, Operator } from '~/types';

export type Om = <TSchema extends Record<string, Operator>>(
  schema: TSchema
) => OmResult<TSchema>;
