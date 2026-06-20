import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/ConnectDb"
import User from "./models/user.model";
import bcrypt from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type:"Email"},
        password: { label: "Password", type: "password" },
      },
    async authorize(credentials,request){
        await connectDb();
        let email=credentials.email as string;
        let password=credentials.password as string;

        if(!email || !password){
            throw new Error("email or password not found");
        }

        let user=await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
        let isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            throw new Error("INCORRECT PASSWORD");
        }
        return{
            id:user._id.toString(),
            email:user.email,
            name:user.name,
            image:user.image,
            role:user.role
        }

    }
    }),
  ],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id;
             token.name=user.name;
              token.email=user.email;
               token.role=user.role;
                
        }
        
        return token;
    },
    session({session,token}){
        if(session.user){
           session.user.id=token.id as string;
           session.user.name=token.name as string;
           session.user.email=token.email as string
           session.user.id=token.id as string;
        }
        return session;
    }
  },
  session:{
    strategy:'jwt',
    maxAge:1000*60*60*24*10
  },
  pages:{
    signIn:'/login',
    error:'/login'
  },
  secret:process.env.AUTH_SECRET
})