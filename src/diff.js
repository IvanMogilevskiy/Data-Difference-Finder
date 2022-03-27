import path from 'path';
import buildInnerTree from './innerTree.js';
import parseData from './parsers.js';
import formatData from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const getFixturePath = (filename) => path.resolve(process.cwd(), filename);
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);

  const data1 = parseData(path1);
  const data2 = parseData(path2);
  const diffTree = buildInnerTree(data1, data2);

  const result = formatData(diffTree, formatName);
  return result;
};
export default genDiff;
