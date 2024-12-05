import mongoose, { model, Schema } from 'mongoose'
import { unique } from 'next/dist/build/utils'

const userSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: [true, " Please provide a email"],
        unique: true
    },
    username : {
        type: String,
        required: [true, " Please provide a username"],
        unique: true
    },
    password : {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry : Date
})

export const User = mongoose.model('User' , userSchema)

