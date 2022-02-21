import yaml from 'js-yaml';

const parseData = (file, format) => {
  let result;
  if (format === '.json') {
    result = JSON.parse(file);
  }
  if (format === '.yaml' || format === '.yml') {
    result = yaml.load(file);
  }

  return result;
};
export default parseData;
