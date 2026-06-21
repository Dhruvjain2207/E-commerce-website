import connectDb from "@/lib/ConnectDb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";



export async function GET(){
    try{
        await connectDb();
    let admin=await User.findOne({role:"admin"})
    return NextResponse.json(
        {exists: !!admin}
    )
    }catch(err){
        return NextResponse.json(
            {message:`Check admin error ${err}`},
            {status:500}
        )

    }
    

}