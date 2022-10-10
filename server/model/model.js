const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    epwd:{
        type: String,
        required: true
    },
    usergroup:{
        type: String,
        required: true
    },
    aut:{
        type: String,
        required: true
    },
    appenv:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: false
    }
})

const Userdb = mongoose.model('userdb',schema)

module.exports=Userdb;