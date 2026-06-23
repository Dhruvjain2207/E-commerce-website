import { auth } from "@/auth";
import connectDb from "@/lib/ConnectDb";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        await connectDb()
        const {phone , role}=await request.json();
        const session= await auth();
        const user= await User.findOneAndUpdate({email:session?.user?.email},{phone,role},{new:true});
        if(!user){
            return NextResponse.json(
                {message:"User is not found"},
                {status:400}
            )
        }
        return NextResponse.json(
            {user},
            {status:200}
        )
    }catch(error){
        return NextResponse.json(
            {messgae:`edit role and phone error ${error}`},
            {status:500}
        )
    }
}