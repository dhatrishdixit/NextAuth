import {connectDB} from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password}= reqBody ;
        const user = await User.findOne({email});
        if(!user) return NextResponse.json({
            error: "User not found",
            status:404
        })

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return NextResponse.json({
            error: "Invalid credentials",
            status:401
        })

        // const tokenData = {
        //     id:user._id
        // };
       
        if(!process.env.TOKEN_SECRET) return NextResponse.json({
            error: "Token secret not found",
            status:500
        });
        const tokenData = {
            _id:user._id,
        };
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET,{
            expiresIn: "1d"
        });
      
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
         return response ;
    } 
    catch (error:any) {
        return NextResponse.json({
            error: error.message,
        },{
            status:500
        })
    }
}