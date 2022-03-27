import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parseData = (file) => {
  const format = path.extname(file);
  const data = fs.readFileSync(file, 'utf-8');

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      return 'Format is not supported';
  }
};
export default parseData;
