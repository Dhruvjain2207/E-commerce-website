'use client'
import React from 'react'
import { motion,AnimatePresence } from "motion/react"
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { redirect, useRouter } from 'next/navigation';
import { ClipLoader } from "react-spinners";
import { signIn, useSession } from 'next-auth/react';






function page() {
     const router=useRouter()
     const[email,setEmail]=useState("");
        const[password,setPassword]=useState("");
            const [showPassword,setShowPassword]=useState(false);
            const[loading,setLoading]=useState(false);
            const session=useSession()
            console.log(session.data?.user);

            const handleSignIn=async (e:React.FormEvent)=>{
              setLoading(true)
              e.preventDefault()
              try{
                const result= await signIn('credentials',{email,password,redirect:false})
                if(result?.error){
                  alert("incorrect email or password");
                  setLoading(false)
                  return
                }
                alert("signIn sucessfully");
                router.push("/")
                setLoading(false)
                


              }catch(err){
                alert(err)
                setLoading(false)
              }

            }
  return (
    <div className='min-h-screen flex justify-center items-center text-white p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <AnimatePresence>
             <motion.div
        className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
          initial={{opacity:0 , y:40}}
      animate={{opacity:1 , y:0}}
      exit={{opacity:0 , y:-40}}
      transition={{duration:0.5}}
        >
          <h1 className='text-2xl font-semibold mb-6 text-blue-300 text-center'>Login</h1>
          <form 
          onSubmit={handleSignIn}
          className='flex flex-col gap-4'>
           

             <input
            type='email'
            className='bg-white/10 border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></input>

            
               <input
            type={showPassword ? "text" : "password"}
            className='relative bg-white/10 border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            placeholder='Enter Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <button 
            type='button'
            onClick={()=>setShowPassword(!showPassword)}
            className='absolute right-12 top-43 -translate-y-1/2 text-gray-400 hover:text-white transition'>
              {showPassword ? <FaEyeSlash />  : <FaEye /> }
            </button>

            <motion.button 
           
         type="submit"
         whileHover={{scale:1.03}}
         whileTap={{scale:0.95}}
         className='mt-4 w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium '>
         {loading ? <ClipLoader size={20} color="white"/>   : "Login"}
        </motion.button>
            
            <div className='flex items-center my-3'>
              <div className='flex-1 h-px bg-gray-600'></div>
              <span className='px-3 text-sm text-gray-400'>or</span>
              <div className='flex-1 h-px bg-gray-600'></div>
            </div>

            <motion.button 
            onClick={()=>signIn("google",{callbackUrl:"/"})}
         
         whileHover={{scale:1.03}}
         whileTap={{scale:0.95}}
         className='flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition'
         >
          <FcGoogle  className='w-5 h-5'/>
           <span className='font-medium'>Login with Google </span>
        </motion.button>

        <p className='text-center text-sm mt-4 text-gray-400'>
          Don't have an acoount ? &nbsp; {" "} <span onClick={()=>router.push("/register")} className='hover:underline text-blue-500'>Register</span>
        </p>


          </form>
      </motion.div> 
        </AnimatePresence>
    </div>
  )
}

export default page