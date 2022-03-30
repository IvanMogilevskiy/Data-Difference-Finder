import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'expectedOutputNested.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'expectedOutputNested.txt'],
  ['file1.json', 'file2.yml', 'stylish', 'expectedOutputNested.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectedOutputPlain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'expectedOutputPlain.txt'],
  ['file1.json', 'file2.yml', 'plain', 'expectedOutputPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectedOutputJson.txt'],
  ['file1.yml', 'file2.yml', 'json', 'expectedOutputJson.txt'],
  ['file1.json', 'file2.yml', 'json', 'expectedOutputJson.txt'],
])('Compare %s and %s using %s formatter', (file1, file2, formatter, expected) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  const expectedOutput = readFile(expected);

  expect(gendiff(path1, path2, formatter)).toBe(expectedOutput);
});
