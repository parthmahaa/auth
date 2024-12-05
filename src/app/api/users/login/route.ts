import {connect} from '@/app/dbConnection/dbConnection'
import {User} from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req:NextRequest) {
    try{
        const reqBody = await req.json()
        const {email,password}  = reqBody
        console.log(email,password);

        const user = await User.findOne({email : email})
        if(!user){
            return NextResponse.json({error : "Email does not exist"},{status: 402})
        }
        const validPassword = await bcryptjs.compare(password , user.password)
        if(!validPassword){
            return NextResponse.json({error: "Password is invalid"} ,{status: 403})
        }
        
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        const token = await jwt.sign(tokenData, process.env.token!, {expiresIn : "1h"} )

        const response = NextResponse.json({
            message: "Login Successful",
            success : true,
        })
        response.cookies.set("token" , token, {httpOnly: true})

        return response
    }catch(e : any){
        return NextResponse.json({error: e.message},{status : 501})
    }
}