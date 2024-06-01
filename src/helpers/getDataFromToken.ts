import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";



export function getDataFromToken(request:NextRequest){
    const token = request.cookies.get("token")?.value||"";
    if(!process.env.TOKEN_SECRET) throw new Error("cookie not present")
    const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET);
    return decodedToken._id;
}