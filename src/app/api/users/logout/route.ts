import { NextResponse } from "next/server";

export async function GET(req : any){
    try{
        const response  = await NextResponse.json({
            message : "logout Successful",
            success: true
        })
        response.cookies.set("token" , "",
            {
                path: "/", // Ensure this matches the path of the original cookie
                expires: new Date(0), // Expire in the past
            })
        return response
    }catch(e : any){
        return NextResponse.json({error : e.message} ,{status : 500})
    }
}