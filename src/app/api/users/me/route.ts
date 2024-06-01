import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request:NextRequest){
    try {
        const userId:any = getDataFromToken(request);
        const user= await User.findById(userId);
 
        return NextResponse.json({
            user,
            statusCode:200
        })
    } catch (error:any) {
        const response = NextResponse.json({
            message:error.message,
            statusCode:500,
            
        })
        return response
    }
}