import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedOutput = readFile('expectedOutput.txt');

test('gendiff json', () => {
  expect(gendiff('filepath1.json', 'filepath2.json')).toEqual(expectedOutput);
});

test('gendiff yaml', () => {
  expect(gendiff('filepath1.yml', 'filepath2.yml')).toEqual(expectedOutput);
});

test('gendiff json & yaml', () => {
  expect(gendiff('filepath1.json', 'filepath2.yml')).toEqual(expectedOutput);
});
