import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/ConnectDb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";




export async function POST(request:NextRequest){

    try{
        await connectDb();
        const{name,email,password}=await request.json();

        if(!name || !email || !password){
            return NextResponse.json(
                {message:"All fields are required"},
                {status:400}
            )
        }
        const existUser=await User.findOne({email})
        if(existUser){
            return NextResponse.json(
                {message:"User already exist"},
                {status:400}
            )
        }
        if(password.length < 6){
             return NextResponse.json(
                {message:"Password must be atleast 6 character long"},
                {status:400}
            )
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const user=User.create({
            name,email,password:hashedPassword
        })
        return NextResponse.json(
            {messgae:"User added successfully"},
            {status:200}
        )

    }catch(error){
        return NextResponse.json(
            {message:`Register error ${error}`},
            {status:500}
        )
    }
}