const mongoose = require('mongoose')
const validator = require('validator')

const user = mongoose.model( 'user' , {
    username : {
        type:String,
        require : true,
        trim : true
    },
    password : {
        type : String,
        require : true,
        minlength : 8
    },
    email : {
        type : String,
        require : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age : {
        type : Number,
        default : 18,
        validate(value){
            if(value <= 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    city : {
        type : String
    }
}
)

module.exports = user