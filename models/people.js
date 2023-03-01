const mongoose = require('mongoose')

const People = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('People',People);