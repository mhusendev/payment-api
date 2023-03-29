const paymentController = require('../../../../controllers/controller_payment')

module.exports = function () {
    let operations = {
      GET,

    };
  
    async function GET(req, res, next) {
        let paymentStatus = await paymentController.paymentStatus(req)
        console.log(JSON.stringify(payment))
        res.send(paymentStatus)
        // res.send(req.params['order_id'])
       
    }
 


    GET.apiDoc = {
        tags: ['Payment API'],
        summary: "get payment status.",
        operationId: "paymentStatus",
        consumes: ["application/json"],
        parameters: [
          {
            in: 'path',
            name: 'order_id',
            required: true,
            type:'string'
          },
          
        ],
        responses: {
          200: {
            description: "success",
            
          },
        },
      };
    
     
 
    return operations;
  };
