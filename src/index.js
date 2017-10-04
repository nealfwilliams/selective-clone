import _ from 'lodash';

const _splitOnFirstPeriod = (string) => {
  let firstPeriodIndex = string.indexOf('.');
  if (firstPeriodIndex >= 0) {
    return [
      string.substring(0, firstPeriodIndex),
      string.substring(firstPeriodIndex + 1)
    ];
  } else {
    return [string];
  }
};

/*
    Accepts on object and dot paths to properties.
    Returns an object that may be mutated at any of
    the dot paths (or subpaths thereof) without mutating
    any reference contained in the original object.
    @param obj -- An object to be copiedKeys
    @param dotPaths -- A dot path to an object property to be modified
*/
const selectiveClone = (obj, ...dotPaths) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  let nestedPathsByFirstKey = {};
  let singlePaths = [];

  for (let dotPath of dotPaths) {
    let pathParts = _splitOnFirstPeriod(dotPath);
    if (pathParts.length === 2) {
      let firstKey = pathParts[0];
      if (firstKey in obj) {
        nestedPathsByFirstKey[firstKey] =
          (nestedPathsByFirstKey[firstKey] || [])
          .concat(
            pathParts[1]
          );
      }
    } else if (pathParts.length === 1) {
      singlePaths.push(pathParts[1]);
    }
  }

  obj = _.clone(obj);

  _.forEach(singlePaths, (path) => {
    if (obj[path] && typeof obj[path] === 'object') {
      newObj[path] = _.clone(obj[path]);
    }
  });

  let copiedKeys = _.mapValues(
    nestedPathsByFirstKey,
    (shiftedDotPaths, key) => selectiveClone(obj[key], ...shiftedDotPaths)
  );

  return _.assign(obj, copiedKeys);
}

export default selectiveClone;
