const {Schema, model} = require('mongoose')

const UserScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hash:{
        type:String
    }
})

module.exports = model('users',UserScheme)