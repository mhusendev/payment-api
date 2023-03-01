let data = {
    type: 'object',
    description: 'Models For (POST)',
    properties: {
        birth: {
            type: 'object',
            properties: {
                day: {
                    type: 'string'
                },
                month: {
                    type: 'string'
                },
                year: {
                    type: 'string'
                }
            }
        },
        gender: {
            type: 'string'
        },
        username:{
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        province: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        subdistrict: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        phone: {
            type: 'string'
        }
    },
    required:["gender","birth","province","city","subdistrict","address","phone"],
}
module.exports = data