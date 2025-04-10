import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { SignJWT } from "jose";
import { comparePassword } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const admin = await prisma.admin.findUnique({
      where:{
        email
      }
    })
    if(!admin){
      return NextResponse.json({
        message:"Admin not found",
        status:404
      })
    }
    const isPasswordValid = await comparePassword(password, admin.password);
    if(!isPasswordValid){
      return NextResponse.json({
        message:"Invalid password",
        status:401
      })
    }
    const token = await new SignJWT({id:admin.id})
    .setProtectedHeader({alg:"HS256"})
    .setExpirationTime("6h")
    .setSubject(admin.id.toString())
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    
    return NextResponse.json({
      message:"Admin logged in successfully",
      status:200,
      token
    });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Admin creation failed",
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    });
  }
}
