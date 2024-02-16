const isObject = (obj: object): boolean => obj && Object.prototype.toString.call(obj) === '[object Object]';

const isArray = (arr: object): boolean => arr && Object.prototype.toString.call(arr) === '[object Array]';

const isSameType = (item1: object, item2: object): boolean => Object.prototype.toString.call(item1)
=== Object.prototype.toString.call(item2);

export { isObject, isArray, isSameType };
