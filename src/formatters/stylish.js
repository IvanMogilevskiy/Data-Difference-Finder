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

  const output = data.flatMap(({
    key, status, value, valueBefore, valueAfter, children,
  }) => {
    switch (status) {
      case 'nested':
        return `${currentIndent}  ${key}: ${makeStylish(children, depth + 1)}`;
      case 'changed':
        return `${currentIndent}- ${key}: ${iter(valueBefore, depth + 1)}\n${currentIndent}+ ${key}: ${iter(valueAfter, depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${key}: ${iter(value, depth + 1)}`;
      default:
        return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
    }
  });
  return [
    '{',
    ...output,
    `${bracketIndent}}`,
  ].join('\n');
};

export default makeStylish;
