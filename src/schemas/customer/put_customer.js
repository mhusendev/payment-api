let data = {
    type: "object",
    description:'Models for (PUT)',
    properties: {
    
      gender: {
        type: "string",
      },
      phone: {
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
  
      first_name: {
        type: "string",
      },
      last_name: {
        type: "string",
      },
  

    },
    required: ["first_name","last_name","birth","gender","phone"],
  }

  module.exports = data