import { isEqual } from '../utils/isEqual';

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
    } else
    if (isObject(lhstValue) && isObject(rhsValue)) {
    // eslint-disable-next-line prefer-object-spread, no-param-reassign
      lhs[key] = merge(Object.assign({}, lhstValue), rhsValue);
    } else {
    // eslint-disable-next-line no-param-reassign
      lhs[key] = rhsValue;
    }
  });
  return lhs;
}

/* export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (!lhs) {
    return lhs;
  }

  Object.keys(rhs).forEach((key) => {
    if (key in rhs) {
      if (typeof rhs[key] === 'object' && typeof lhs[key] === 'object') {

        lhs[key] = merge(lhs[key], rhs[key]);
      } else {

        lhs[key] = rhs[key];
      }
    }
  });

  return lhs;
} */

/* const isObject = (obj: object): boolean => obj && Object.prototype.toString.call(obj) === '[object Object]';

  const isArray = (arr: object): boolean => arr && Object.prototype.toString.call(arr) === '[object Array]';

  const isSameType = (item1: object, item2: object): boolean => Object.prototype.toString.call(item1) === Object.prototype.toString.call(item2); */

/* export function merge(lhs: Indexed, rhs: Indexed): Indexed {
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

function deepCopyArray(arr: any) {
  const result = [...arr];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < result.length; i++) {
    if (isArray(result[i])) {
      result[i] = deepCopyArray(result[i]);
      // eslint-disable-next-line no-continue
      continue;
    }
    if (isObject(result[i])) {
      // eslint-disable-next-line no-use-before-define
      result[i] = deepCopyObject(result[i]);
      // eslint-disable-next-line no-continue
      continue;
    }
  }
  return result;
}

function deepCopyObject(obj: any) {
  const result = { ...obj };
  // eslint-disable-next-line no-restricted-syntax
  for (const i of Object.keys(obj)) {
    if (isArray(result[i])) {
      result[i] = deepCopyArray(result[i]);
      // eslint-disable-next-line no-continue
      continue;
    }
    if (isObject(result[i])) {
      result[i] = deepCopyObject(result[i]);
      // eslint-disable-next-line no-continue
      continue;
    }
  }
  return result;
}

function deepMergeArrays(arr1: any, arr2: any) {
  return deepCopyArray([...arr1, ...arr2]);
}

function deepMergeObjects(obj1: Indexed, obj2: Indexed) {
  const result = deepCopyObject(obj1);

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(obj2)) {
    // eslint-disable-next-line no-prototype-builtins
    if (!result.hasOwnProperty(key)) {
      if (isObject(obj2[key])) {
        result[key] = deepCopyObject(obj2[key]);
        // eslint-disable-next-line no-continue
        continue;
      }
      if (isArray(obj2[key])) {
        result[key] = deepCopyArray(obj2[key]);
        // eslint-disable-next-line no-continue
        continue;
      }
      result[key] = obj2[key];
      // eslint-disable-next-line no-continue
      continue;
    }
    // eslint-disable-next-line no-use-before-define
    result[key] = merge(result[key], obj2[key]);
  }
  return result;
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (!isObject(lhs) && !isArray(lhs) || !isSameType(lhs, rhs)) {
    if (isArray(rhs)) {
      return deepCopyArray(rhs);
    }
    if (isObject(rhs)) {
      return deepCopyObject(rhs);
    }
    return rhs;
  }
  if (isArray(lhs)) {
    return deepMergeArrays(lhs, rhs);
  }
  return deepMergeObjects(lhs, rhs);
}
*/
