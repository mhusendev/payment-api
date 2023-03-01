const { midleware } = require('../../controllers/controller_auth')

module.exports = function () {
    let operations = {
      GET,

    };
  
    async function GET(req, res, next) {
         let getAuth = await midleware(req)
         if(!getAuth) return res.sendStatus(401)
         return res.status(200).send({message: 'Authorized'})
    }
 


    GET.apiDoc = {
      tags: ['Auth'],
      description:'Middleware for Authorization',
      summary: "Authorized your apps.",
      operationId: "getAuth",
      responses: {
        200: {
          description: "Authorized",
        },
        401: {
            description: "Unauthorized"
        }
      },
    };
  
 
    return operations;
  };
