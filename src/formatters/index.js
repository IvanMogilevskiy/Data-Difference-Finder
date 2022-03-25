import makePlain from './plain.js';
import makeStylish from './stylish.js';

const formatData = (data, formatName) => {
  switch (formatName) {
    case 'plain':
      return makePlain(data);
    case 'stylish':
      return makeStylish(data);
    default:
      throw new Error('Unknown format');
  }
};
export default formatData;
