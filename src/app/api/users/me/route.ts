import { getData } from "@/helpers/getData";
import mongoose from "mongoose";
import jwt  from "jsonwebtoken";
import { User } from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/app/dbConnection/dbConnection";

connect()

export async function GET(req: NextRequest) {
    try{
        const userId = await getData(req)
        const user = await User.findOne({_id: userId}).select("-password -isVerified")
        return NextResponse.json({message: "user found",
            data: user
        } )
        
    }catch(e:any){
        return NextResponse.json({error: e.message} ,{status: 500})
    }
}