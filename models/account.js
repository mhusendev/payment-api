const mongoose = require('mongoose')

const Account = mongoose.Schema({
    apikey: {
        type: String,
        require: true
    },
    data:{
        type: String,
        require: true
    },
    app_code: {
        type: String,
        require:true
    }
})

module.exports = mongoose.model('Account',Account)