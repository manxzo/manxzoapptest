import { NextRequest } from "next/server";
import { jwtVerify} from 'jose';

export const verifyAdmin = async (request:NextRequest)=>{
    const token = request.headers.get("authorization")?.split(" ")[1];
    if(!token){
        return false;
    }
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return verified;
}   