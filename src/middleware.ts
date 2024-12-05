import { NextRequest,NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const path = req.nextUrl.pathname

    const isPublicPath = path==='/login' || path==='/signup'
    const token  = req.cookies.get("token") || ""

    if(isPublicPath && token ){
        return NextResponse.redirect(new URL('/profile' ,req.nextUrl))
    }

    if(!token && !isPublicPath){
        return NextResponse.redirect(new URL('/login' , req.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup'
    ]
}