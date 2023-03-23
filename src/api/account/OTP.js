const helper = require('../../../keycloak/helper')
const { generateOTP, validateOTP } = require('../../../controllers/controller_otp')
const {generateKey} = require('../../../controllers/controller_auth')
module.exports = function () {
    let operations = {
      GET,
      POST,


    };
  

    async function GET(req, res, next) {
     var prosess = await generateOTP(req)
     if(prosess) {
        res.sendStatus(200)
     } else 
     {
        res.send({message: 'gagal mendapatkan OTP'})
     }
  }
   async function POST(req, res, next) {
    var validasi = await validateOTP(req)
    console.log(validasi)
    if(validasi) {
        let generatekey = await generateKey(req)
        console.log(generateKey)
        res.send(generatekey)
    } else {
        res.send({message: 'OTP tidak valid'})
    }
   }

 POST.apiDoc = {
      tags: ['Account'],
      summary: "Validate OTP.",
      operationId: "validateOTP",
      consumes: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "OTP",
          schema: {
            type: 'object',
            properties: {
                otp: {
                    type: 'string'
                }
            }
          },
        },
      ],
      responses: {
        201: {
          description: "Created",
        },
      },
    };
  
   

  GET.apiDoc = {
    tags: ['Account'],
    summary: "GET OTP.",
    description:'no need id , the id included in token session',
    operationId: "getOTP",
    security: [
      {
        Bearer: [],
        
      },
    ],
    responses: {
      200: {
        description: "GET OTP.",
    
      },
      401: {
          description: "Unauthorized"
      }
    },
  };


   

  
    return operations;
  };
