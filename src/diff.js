import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

const genDiff = (file1, file2) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const data1 = JSON.parse(readFile(file1));
  const data2 = JSON.parse(readFile(file2));

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unitedKeys = (_.union(keys1, keys2)).sort();

  const compare = unitedKeys.map((key) => {
    let acc = '';
    if (!_.has(data1, key)) {
      acc = `${acc}  + ${key}: ${data2[key]}`;
    } else if (!_.has(data2, key)) {
      acc = `${acc}  - ${key}: ${data1[key]}`;
    } else if (data1[key] !== data2[key]) {
      acc = `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    } else {
      acc = `${acc}    ${key}: ${data1[key]}`;
    }
    return acc;
  });
  const outputData = compare.join('\n');
  return `{\n${outputData}\n}`;
};
export default genDiff;
