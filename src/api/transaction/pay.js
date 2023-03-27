const paymentController = require('../../../controllers/controller_payment')

module.exports = function () {
    let operations = {
      POST,

    };
  
    async function POST(req, res, next) {
        let payment = await paymentController.pay(req)
        console.log(JSON.stringify(payment))
        res.send(payment)
       
    }
 


    POST.apiDoc = {
        tags: ['Payment API'],
        description:'Note: nomor order wajib menggunakan kombinasi [app_code - orderid] order untuk dikenali',
        summary: "generate payment.",
        operationId: "paymentGenerate",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "payment",
            schema: {
              $ref: "#/definitions/payment_post",
            },
          },
        ],
        responses: {
          200: {
            description: "Created",
            schema: {
                type:'object',
                properties: {
                    transactionToken: {
                        type:'string'
                    }
                }
            }
          },
        },
      };
    
     
 
    return operations;
  };
