import _ from 'lodash';

const buildInnerTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unitedKeys = _.sortBy(_.union(keys1, keys2));

  const innerTree = unitedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        status: 'removed',
        value: data1[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        status: 'nested',
        children: buildInnerTree(data1[key], data2[key]),
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        status: 'changed',
        // valueBefore: data1[key],
        // valueAfter: data2[key],
        value: [data1[key], data2[key]],
      };
    }
    return {
      key,
      status: 'unchanged',
      value: data1[key],
    };
  });
  return innerTree;
};
export default buildInnerTree;
