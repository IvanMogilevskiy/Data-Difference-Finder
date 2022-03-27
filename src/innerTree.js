import _ from 'lodash';

const buildInnerTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unitedKeys = _.sortBy(_.union(keys1, keys2));

  const innerTree = unitedKeys.map((key) => {
    const currentValue1 = data1[key];
    const currentValue2 = data2[key];

    if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
      return {
        key,
        status: 'nested',
        children: buildInnerTree(currentValue1, currentValue2),
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'added',
        value: currentValue2,
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        status: 'removed',
        value: currentValue1,
      };
    }
    if (!_.isEqual(currentValue1, currentValue2)) {
      return {
        key,
        status: 'changed',
        valueBefore: currentValue1,
        valueAfter: currentValue2,
      };
    }
    return {
      key,
      status: 'unchanged',
      value: currentValue1,
    };
  });
  return innerTree;
};
export default buildInnerTree;
