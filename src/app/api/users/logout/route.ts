import { NextResponse } from "next/server";


export async function GET(){
    try {
        
        const response = NextResponse.json({
            message:"user logged out",
            statusCode:400
        })
        response.cookies.set("token","",{
            httpOnly:true
        })
        return response

    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            statusCode:500
        })
    }
}