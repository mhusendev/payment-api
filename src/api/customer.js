const helper = require('../../keycloak/helper')
const { register,getDataCustomer,updateDataCustomer } = require('../../controllers/customer_controllers')

module.exports = function () {
    let operations = {
      POST,
      GET,
      PUT

    };
  
 
  
    async function POST(req, res, next) {
       console.log(req.body)
       const query = await register(req)
      //  console.log(JSON.stringify(query))
      if(query.status == 201) return res.status(201)
       res.status(query.status).send(query);
    }
    async function GET(req, res, next) {
      var response = await getDataCustomer(req)
      // console.log(respond.status)
      res.status(response.status).send(response.value)
  }


  async function PUT(req, res, next) {
    let query = await updateDataCustomer(req)
    if(query.status == 204 || query.status === 200) return res.status(200).send({status:200, message: 'success update data'})
    res.sendStatus(query.status)

  }

  // function DELETE(req, res, next) {
  //   console.log(`About to delete Customer id: ${req.query.id}`);
  //   res.status(200).send();
  // }

  GET.apiDoc = {
    tags: ['users'],
    summary: "Fetch Customer.",
    description:'no need id , the id included in token session',
    operationId: "getCustomer",
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
                $ref: "#/definitions/customer_get",
              

            }
          }
        },
      },
      401: {
          description: "Unauthorized"
      }
    },
  };


  PUT.apiDoc = {
    tags: ['users'],
    summary: "Update Customer.",
    description:'no need id , the id included in token session',
    operationId: "updateCustomer",
    parameters: [
      {
        in: "body",
        name: "Customer",
        schema: {
          $ref: "#/definitions/customer_put",
        },
      },
    ],
    responses: {
      200: {
          description: "success update.",
          schema: {
              type:"object",
              properties: {
                  status: {
                      type: "number",
                  },
                  message: {
                      type: "string",
                  }
              },
          },
        },
    },
  };


  
 
    POST.apiDoc = {
      tags: ['users'],
      summary: "Create Customer.",
      operationId: "createCustomer",
      consumes: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "Customer",
          schema: {
            $ref: "#/definitions/customer_post",
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
