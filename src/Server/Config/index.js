
const productionConfig = require('./prod');
const stagingConfig = require('./uat');
const localConfig = require('./local');

const NODE_ENV = process.env.NODE_ENV;

var configBuffer;

switch (NODE_ENV) {
   case 'production':
      configBuffer = productionConfig;
      break;
   case 'uat':
      configBuffer = stagingConfig;
      break;
   default:
      configBuffer = localConfig;
}

module.exports = configBuffer;