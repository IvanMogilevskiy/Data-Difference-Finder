import _ from 'lodash';

const returnValue = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return _.isString(item) ? `'${item}'` : item;
};

const makePlain = (data) => {
  const iter = (currentValue, acc = '') => currentValue
    .flatMap(({
      key, status, value, valueBefore, valueAfter, children,
    }) => {
      const currentPath = ([...acc, key]);
      const path = currentPath.join('.');
      switch (status) {
        case 'nested':
          return iter(children, currentPath);
        case 'changed':
          return `Property '${path}' was updated. From ${returnValue(valueBefore)} to ${returnValue(valueAfter)}`;
        case 'added':
          return `Property '${path}' was added with value: ${returnValue(value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        default:
          return 'skip';
      }
    });

  const output = iter(data);
  return output.filter((str) => str !== 'skip').join('\n');
};
export default makePlain;
