import Bitly from 'bitly';
import bitlyConfig from './../../config/bitly.config';

const bitly = new Bitly(bitlyConfig.Access_Token);

const shorten = (url) => {  
  return bitly.shorten(url);
};

export default{
  shorten: shorten
}
