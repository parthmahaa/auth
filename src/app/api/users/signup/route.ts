import {connect} from '@/app/dbConnection/dbConnection'
import { sendEmail } from '@/helpers/mailer'
import {User} from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest){
    try{
        const reqBody = await req.json()
        const {email,password,username,name} = reqBody

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({msg: "User already exists"},{status: 501})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword  = await bcryptjs.hash(password,salt)

        const newUser = await User.create({
            username,email,name,password : hashedPassword
        })

        await sendEmail({email, emailType: "VERIFY", userId: newUser._id})

        return NextResponse.json({message: "user added" , success: true,newUser})
    }catch(e : any){
        return NextResponse.json({error: e.message},{status: 500})
    }
}