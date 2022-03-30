import _ from 'lodash';

const returnValue = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return _.isString(item) ? `'${item}'` : item;
};

const makePlain = (data) => {
  const iter = (currentValue, acc = '') => currentValue
    .flatMap((node) => {
      const currentPath = ([...acc, node.key]);
      const path = currentPath.join('.');
      switch (node.status) {
        case 'nested':
          return iter(node.children, currentPath);
        case 'changed':
          return `Property '${path}' was updated. From ${returnValue(node.value[0])} to ${returnValue(node.value[1])}`;
        case 'added':
          return `Property '${path}' was added with value: ${returnValue(node.value)}`;
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
