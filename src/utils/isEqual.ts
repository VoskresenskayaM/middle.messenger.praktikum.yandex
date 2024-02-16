import { isObject, isArray, isSameType } from './IsType';

type ResultType = {[key: string]: any};
export default function isEqual(a: ResultType, b: ResultType): boolean {
  if (a === b) return true;

  // eslint-disable-next-line no-mixed-operators
  if (!isObject(a) && !isArray(a) || !isObject(b) && !isArray(b)) return false;

  if (!isSameType(a, b) || Object.keys(a).length !== Object.keys(b).length) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(a)) {
    // eslint-disable-next-line no-prototype-builtins
    if (!b.hasOwnProperty(key)) return false;
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
}
