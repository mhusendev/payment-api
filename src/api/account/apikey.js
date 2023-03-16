const helper = require('../../../keycloak/helper')
const { generateKey } = require('../../../controllers/controller_auth')

module.exports = function () {
    let operations = {
      GET,


    };
  

    async function GET(req, res, next) {
      var response = await generateKey(req)

      // console.log(respond.status)
      res.send(response)
    //   res.status(response.status).send(response.data)
      // res.send(response)
  }



  GET.apiDoc = {
    tags: ['Account'],
    summary: "Fetch Apikey.",
    description:'generate apikey to access the payment endpoints || no need id , the id included in token session',
    operationId: "getAPikey",
    security: [
      {
        Bearer: [],
        
      },
    ],
    responses: {
      200: {
        description: "Info of Customer."
      },
      401: {
          description: "Unauthorized"
      }
    },
  };


   

  
    return operations;
  };
