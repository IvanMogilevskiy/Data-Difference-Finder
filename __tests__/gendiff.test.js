import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedOutputNested = readFile('expectedOutputNested.txt');
const expectedOutputPlain = readFile('expectedOutputPlain.txt');

test('gendiff json', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(expectedOutputNested);
});

test('gendiff yaml', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(expectedOutputNested);
});

test('gendiff json & yaml', () => {
  expect(gendiff('file1.json', 'file2.yml')).toEqual(expectedOutputNested);
});

test('gendiff json plain', () => {
  expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(expectedOutputPlain);
});

test('gendiff yaml plain', () => {
  expect(gendiff('file1.yml', 'file2.yml', 'plain')).toEqual(expectedOutputPlain);
});

test('gendiff json & yaml plain', () => {
  expect(gendiff('file1.json', 'file2.yml', 'plain')).toEqual(expectedOutputPlain);
});
