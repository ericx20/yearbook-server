const mongoose = require('mongoose')

const Page = mongoose.model('Page', {
    canvas: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }

})

module.exports = Page