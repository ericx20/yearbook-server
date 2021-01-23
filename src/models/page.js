const mongoose = require('mongoose')

const Page = mongoose.model('Page', {
    lineData: {
        type: String
    },
    code: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }

})

module.exports = Page