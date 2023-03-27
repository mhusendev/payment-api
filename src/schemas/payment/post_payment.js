const data  = {
    type:'object',
    properties:{
        transaction_details: {
            type:'object',
            properties: {
                order_id: {
                    type:'string'
                },
                gross_amount:{
                    type:'string'
                }
            }
        },
        credit_card: {
            type:'object',
            properties: {
                secure:{
                    type:'boolean'
                }
            }
        },
        customer_details: {
            type:'object',
            properties: {
                first_name:{
                    type:'string'
                },
                last_name:{
                    type:'string'
                },
                email: {
                    type:'string'
                }
            }
        },
        expiry: {
            type:'object',
            properties: {
                start_time:{
                    type:'string'
                },
                unit: {
                    type: 'string'
                },
                duration: {
                    type: 'number'
                }
            }
        }
    }
}
module.exports = data