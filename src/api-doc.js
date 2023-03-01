const customerSchema_get = require('./schemas/customer/get_customer')
const customerSchema_post = require('./schemas/customer/post_customer')
const customerSchema_put = require('./schemas/customer/put_customer')
const peopleSchema = require('./schemas/people')
const address = require('./schemas/address')
const apiDoc = {
  swagger: "2.0",
  basePath:"/api/auth/v1/",
  tags: [{
    name: "users",
    description: "The Users Managing API"
  },
  {
    name: "users address",
    description: "API"
  }],
  info: {
    title: "Keycloak app API.",
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
apiDoc.definitions["customer_get"] = customerSchema_get
apiDoc.definitions['customer_post'] = customerSchema_post
apiDoc.definitions['customer_put'] = customerSchema_put
apiDoc.definitions['People'] = peopleSchema 
apiDoc.definitions['address'] = address

module.exports = apiDoc;
