import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import { User } from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest){
    try { 
      const reqBody = await request.json();
      const {token} = reqBody;
      
      const user = await User.findOne({
        verifyToken:token,
        verifyTokenExpiry:{$gt:Date.now()}
      })

      if(!user){
        return NextResponse.json({
          message:"Invalid Token",
          status:400
        })
      }
      
      user.isVerified = true ;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();
      return NextResponse.json({
        message:"Email verified successfully",
        status:200
      })

    } catch (error:any) {
       return  NextResponse.json({
        message:error.message,
        status:500
       })  
    }
}