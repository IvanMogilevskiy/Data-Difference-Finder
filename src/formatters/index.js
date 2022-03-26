import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const formatData = (data, formatName) => {
  switch (formatName) {
    case 'plain':
      return makePlain(data);
    case 'stylish':
      return makeStylish(data);
    case 'json':
      return makeJson(data);
    default:
      throw new Error('Unknown format');
  }
};
export default formatData;
