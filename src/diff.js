import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import buildInnerTree from './innerTree.js';
import parseData from './parsers.js';
import makeStylish from './formatters/stylish.js';

const genDiff = (file1, file2) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  const format = path.extname(getFixturePath(file1));

  const data1 = parseData(readFile(file1), format);
  const data2 = parseData(readFile(file2), format);
  const diffTree = buildInnerTree(data1, data2);

  const result = makeStylish(diffTree);
  return result;
};
export default genDiff;
