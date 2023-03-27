const account_register = require('./schemas/account/account_register')
const account_info = require('./schemas/account/account_info')
const payment_post = require('./schemas/payment/post_payment')
const apiDoc = {
  swagger: "2.0",
  basePath:"/api/payment/v1/",
 
  info: {
    title: "Payment app API.",
    version: "1.0.0",
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter the token"
    }
  },
  definitions: {
  },
  paths: {}

};
apiDoc.definitions['account_register'] = account_register
apiDoc.definitions['account_info'] = account_info
apiDoc.definitions['payment_post'] = payment_post        
module.exports = apiDoc;
