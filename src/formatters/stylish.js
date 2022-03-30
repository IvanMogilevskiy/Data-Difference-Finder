import _ from 'lodash';

const makeStylish = (data, depth = 1, basicIndent = ' ', spacesAmount = 4) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = currentDepth * spacesAmount;
    const currentIndent = basicIndent.repeat(indentSize);
    const bracketIndent = basicIndent.repeat(indentSize - spacesAmount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const indentSize = depth * spacesAmount - 2;
  const currentIndent = basicIndent.repeat(indentSize);
  const bracketIndent = basicIndent.repeat(indentSize - 2);

  const output = data.flatMap((node) => {
    switch (node.status) {
      case 'nested':
        return `${currentIndent}  ${node.key}: ${makeStylish(node.children, depth + 1)}`;
      case 'changed':
        return `${currentIndent}- ${node.key}: ${iter(node.value[0], depth + 1)}\n${currentIndent}+ ${node.key}: ${iter(node.value[1], depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${node.key}: ${iter(node.value, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${node.key}: ${iter(node.value, depth + 1)}`;
      default:
        return `${currentIndent}  ${node.key}: ${iter(node.value, depth + 1)}`;
    }
  });
  return [
    '{',
    ...output,
    `${bracketIndent}}`,
  ].join('\n');
};
export default makeStylish;
