import { NextResponse,NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const getData= (req : NextRequest) =>{
    try{
        const token  = req.cookies.get("token")?.value || ""
        const decodedToken:any = jwt.verify(token,process.env.token!)

        return decodedToken.id
    }catch(e : any){
        return NextResponse.json({error: e.message} ,{status:500})
    }
}