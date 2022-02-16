import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/diff.js';

/* eslint-disable-next-line no-undef */
test('gendiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  /* eslint-disable-next-line no-undef */
  expect(gendiff(filepath1, filepath2).toEqual(readFile('expectedOutput.txt')));
});
