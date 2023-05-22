/* eslint-disable @typescript-eslint/no-var-requires */
const base64Url = require('base64-url');
const crypt = require('crypto');

const header = {
  alg: 'HS256',
  type: 'JWT',
};

const payload = {
  username: 'raphael121angel@hotmail.com',
  name: 'rafa',
  exp: new Date().getTime(), //timestamp
};

const headerEncoded = base64Url.encode(JSON.stringify(header));
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

console.log(headerEncoded, payloadEncoded);

const key = 'abcd123456';

//certificado - chave privada e outro publica

const signature = crypt
  .createHmac('sha256', key)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest('bin');

console.log(
  `${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`,
);
