const helper = require('../../../keycloak/helper')
const { getAccountData } = require('../../../controllers/controller_auth')

module.exports = function () {
    let operations = {
      GET,


    };
  

    async function GET(req, res, next) {
      var response = await getAccountData(req)

      // console.log(respond.status)
      // res.send(req.session)
      res.status(response.status).send(response.data)
      // res.send(response)
  }



  GET.apiDoc = {
    tags: ['Account'],
    summary: "Fetch Account.",
    description:'no need id , the id included in token session',
    operationId: "getAccount",
    security: [
      {
        Bearer: [],
        
      },
    ],
    responses: {
      200: {
        description: "Info of Customer.",
        schema: {
          type: 'object',
          properties: {
            schema_frontend: {
              type: 'array',
              items: {
               type:'string'
              }
            },
            data:{
              type: 'object',
                $ref: "#/definitions/account_info",
              

            }
          }
        },
      },
      401: {
          description: "Unauthorized"
      }
    },
  };


   

  
    return operations;
  };
