const apiDoc = {
    swagger: "2.0",
    tags:[{
      name:"users",
      description: "The Users Managing API"},
      {
        name:"users address",
        description: "API"}],
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
      Customer: {
        type: "object",
        properties: {
          sub: {
            type: "string",
          },
          image: {
            type: "object",
            properties: {
              filename: {
                type: "string",
              },
              file_ext: {
                type: "string",
              },
            },
          },
          gender: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          name: {
            type: "string",
          },
          birth: {
            type: "object",
            properties: {
              day: {
                type: "string",
              },
              month: {
                type: "string",
              },
              year: {
                type: "string",
              },
            },
          },
          preferred_username: {
            type: "string",
          },
          given_name: {
            type: "string",
          },
          family_name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          alamat_info: {
            type: "object",
            properties: {
              default: {
                type: "boolean",
              },
              provinsi: {
                type: "string",
              },
              kota: {
                type: "string",
              },
              kecamatan: {
                type: "string",
              },
              jalan: {
                type: "string",
              },
              penerima: {
                type: "string",
              },
              tlp: {
                type: "string",
              },
            }
          },
        },
        required: ["sub"],
      },
    },
    paths:{}
    
  };
  
  

  const helper = require('../../../../../keycloak/helper')

  module.exports = function () {
      let operations = {
        GET,
        POST,
        PUT,
        DELETE,
      };
    
      async function GET(req, res, next) {
          var respond = await helper.getInfocustomer(req)
          console.log(respond.status)
          res.status(respond.status).send(respond.value)
      }
    
      function POST(req, res, next) {
        console.log(`About to create Customer: ${JSON.stringify(req.body)}`);
        res.status(201).send();
      }
    
      function PUT(req, res, next) {
        console.log(`About to update Customer id: ${JSON.stringify(req.query)}`);
          if(req.query.id == 2){
              res.status(404).json({ id:0, error_message: " data kosong" });
          }
          res.status(200).json({ id:0, message: req.query.id+" data valid" });
      }
    
      function DELETE(req, res, next) {
        console.log(`About to delete Customer id: ${req.query.id}`);
        res.status(200).send();
      }
    
      GET.apiDoc = {
        tags: ['users'],
        summary: "Fetch Customer.",
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
              type: "array",
              items: {
                $ref: "#/definitions/Customer",
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
              $ref: "#/definitions/Customer",
            },
          },
        ],
        responses: {
          201: {
            description: "Created",
          },
        },
      };
    
      PUT.apiDoc = {
        tags: ['users'],
        summary: "Update Customer.",
        operationId: "updateCustomer",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            type: "number",
          },
          {
            in: "body",
            name: "Customer",
            schema: {
              $ref: "#/definitions/Customer",
            },
          },
        ],
        responses: {
          400:{
              description: "Fail Customer.",
              schema: {
                  type:"object",
                  properties: {
                      id: {
                          type: "number",
                      },
                      error_message: {
                          type: "string",
                      }
                  },
                } ,
            },
          200: {
              description: "success update.",
              schema: {
                  type:"object",
                  properties: {
                      id: {
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
  
    
      return operations;
    };


  module.exports = apiDoc;
  