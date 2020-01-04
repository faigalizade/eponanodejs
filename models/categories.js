const {Schema, model} = require('mongoose')

const Categories = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    records: {
        type: Number,
        default: 0,
        required: false
    },
    child:{
        type: Array,
        default: []
    },
    parent:{
        type: String,
        default: ''
    }
})

module.exports = model('Categories',Categories)