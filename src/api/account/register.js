const helper = require('../../../keycloak/helper')
const { register } = require('../../../controllers/controller_auth')

module.exports = function () {
    let operations = {
      POST,

    };
  
 
  
    async function POST(req, res, next) {
       console.log(req.body)
       const query = await register(req)
       console.log(query.status)
      if(query.status =- 201) return res.sendStatus(201)
       res.status(query.status).send(query);
    }
  


  
 
    POST.apiDoc = {
      tags: ['Account'],
      summary: "Create Account.",
      operationId: "createAccount",
      consumes: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "Account",
          schema: {
            $ref: "#/definitions/account_register",
          },
        },
      ],
      responses: {
        201: {
          description: "Created",
        },
      },
    };
  
   

  
    return operations;
  };
