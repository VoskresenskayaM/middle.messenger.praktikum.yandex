export type Indexed<T = any> = {
    [key in string]: T;
  };

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const isObject = (obj: any) => obj && typeof obj === 'object';
  if (!isObject(lhs) || !isObject(rhs)) {
    return rhs;
  }

  Object.keys(rhs).forEach((key) => {
    const lhstValue = lhs[key];
    const rhsValue = rhs[key];

    if (Array.isArray(lhstValue) && Array.isArray(rhsValue)) {
      // eslint-disable-next-line no-param-reassign
      lhs[key] = lhstValue.concat(rhsValue);
    } else if (isObject(lhstValue) && isObject(rhsValue)) {
      // eslint-disable-next-line prefer-object-spread, no-param-reassign
      lhs[key] = merge(Object.assign({}, lhstValue), rhsValue);
    } else {
      // eslint-disable-next-line no-param-reassign
      lhs[key] = rhsValue;
    }
  });

  return lhs;
}
