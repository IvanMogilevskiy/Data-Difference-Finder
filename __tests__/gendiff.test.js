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
const expectedOutputJson = readFile('expectedOutputJson.txt');

test('gendiff json nested', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2)).toEqual(expectedOutputNested);
});

test('gendiff yaml nested', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2)).toEqual(expectedOutputNested);
});

test('gendiff json & yaml nested', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2)).toEqual(expectedOutputNested);
});

test('gendiff json plain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, 'plain')).toEqual(expectedOutputPlain);
});

test('gendiff yaml plain', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2, 'plain')).toEqual(expectedOutputPlain);
});

test('gendiff json & yaml plain', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2, 'plain')).toEqual(expectedOutputPlain);
});

test('gendiff json with json method', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, 'json')).toEqual(expectedOutputJson);
});

test('gendiff yaml with json method', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2, 'json')).toEqual(expectedOutputJson);
});

test('gendiff json & yaml with json method', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  expect(gendiff(file1, file2, 'json')).toEqual(expectedOutputJson);
});
