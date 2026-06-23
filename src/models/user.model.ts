import { timeStamp } from "console";
import mongoose from "mongoose";

export interface Iuser{
    id:mongoose.Types.ObjectId,


    name:string,
    email:string,
    password?:string,
    phone?:string,
    createdAt?:Date,
    updatedAt?:Date,
    image?:string,
    role:"user" | "admin" | 'vendor',
    
    // for Vendor
    shopName?:string,
    shopAddress?:string,
    gstNumber?:string,
    isApproved?:boolean,
    verificationStatus?:'pending' | 'approved' |'rejected',
    requestAt:Date,
    approvedAt:Date,
    rejectedReason?:string,
    vendorProducts?:mongoose.Types.ObjectId[],
    orders?:mongoose.Types.ObjectId[],



    cart?:{
        product:mongoose.Types.ObjectId,
        quantity:number
    }[],

   



}
const userSchema=new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
         
    },
    image:{
        type:String,
    },
    phone:{
        type:String,
    },
    role:{
      type:String,
      enum:["user","admin","vendor"],
      default:"user"
    },
    shopName:{
        type:String,
    },
    shopAddress:{
        type:String,
    },
    gstNumber:{
        type:String,
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    verificationStatus:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    approvedAt:{
        type:Date,
    },
    requestAt:{     
        type:Date,
    },
    rejectedReason:{
        type:String,
    },
    vendorProducts:[{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }
    ],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"Order"
    }],
    cart:[
        {
            product:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]

   
},{timestamps:true})


const User= mongoose.models?.User || mongoose.model<Iuser>("User",userSchema);

export default User;