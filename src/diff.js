import fs from 'fs';
import path from 'path';
import buildInnerTree from './innerTree.js';
import parseData from './parsers.js';
import formatData from './formatters/index.js';

const getPath = (file) => path.resolve(process.cwd(), file);

const readFile = (file) => fs.readFileSync(getPath(file), 'utf-8');

const getFormat = (file) => path.extname(getPath(file));

const genDiff = (file1, file2, formatterName = 'stylish') => {
  const data1 = parseData(readFile(file1), getFormat(file1));
  const data2 = parseData(readFile(file2), getFormat(file2));

  const diffTree = buildInnerTree(data1, data2);

  return formatData(diffTree, formatterName);
};
export default genDiff;
