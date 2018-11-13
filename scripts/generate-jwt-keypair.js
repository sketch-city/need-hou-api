// TODO consider switching to just running a bash script calling openssl

const NodeRSA = require('node-rsa');
const fs = require('fs');

const AUTH_KEY_PATH = './auth/'

const PUBLIC_KEY_FILENAME = 'public.key'
const PRIVATE_KEY_FILENAME = 'private.key'

const ALL_KEY_FILES = [PUBLIC_KEY_FILENAME, PRIVATE_KEY_FILENAME]

const currentAuthFiles = fs.readdirSync(AUTH_KEY_PATH)

const hasBothKeys = ALL_KEY_FILES.reduce(function(result, filename) {
  return currentAuthFiles.includes(filename) && result
}, true)

if (!hasBothKeys) {
  let key = new NodeRSA({b: 512});
  key.generateKeyPair()

  fs.writeFileSync(`${AUTH_KEY_PATH}${PUBLIC_KEY_FILENAME}`, key.exportKey('public'), 'utf8')
  fs.writeFileSync(`${AUTH_KEY_PATH}${PRIVATE_KEY_FILENAME}`, key.exportKey('private'), 'utf8')
}