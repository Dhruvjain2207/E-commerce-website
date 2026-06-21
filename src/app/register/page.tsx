'use client'
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";
import { motion,AnimatePresence } from "motion/react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from "react-spinners";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Register() {
  const router=useRouter()
    
    const[step,setStep]=useState<1|2>(1);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const[loading,setLoading]=useState(false);


    const handleSignUp =async (e:React.FormEvent)=>{
      e.preventDefault()
      setLoading(true)
      try{
        const result= await axios.post("/api/auth/register",{
          name,email,password
        })
        console.log(result.data)
        setLoading(false);
        setEmail("")
        setName("")
        setPassword("")
        router.push("/login")

      }catch(error){
        console.log(error)
        setLoading(false)

      }

    }
  return (
    <div className='min-h-screen flex justify-center items-center text-white p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900'>
    <AnimatePresence mode="wait">
     {step==1 &&
      <motion.div 
      initial={{opacity:0 , y:40}}
      animate={{opacity:1 , y:0}}
      exit={{opacity:0 , y:-40}}
      transition={{duration:0.5}}
      className='w-full max-w-lg bg-white/10 text-center backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-white/20'>
        <h1 className='text-4xl font-bold mb-4 text-blue-400'>Welcome to Multicart</h1>
        <p className='text-gray-300 mb-6'>Register with one of the following account type</p>
        <div className='grid grid-cols-3 gap-4 mb-6'>
            {
                [
                    {label:"user", icon:<FaUser />,value:"user"},
                    {label:"vendor", icon:<FaShop />,value:"vendor"},
                    {label:"Admin", icon:<RiAdminFill />,value:"admin"}
                ].map((item)=>(
                    <motion.div key={item.value}
                     whileHover={{scale:1.03}}
                     whileTap={{scale:0.95}}
                     className='p-4 hover:bg-white/20 cursor-pointer rounded-xl border border-white/30 shadow-lg flex flex-col items-center transition'

                    >
                        <span className='text-4xl mb-2'>{item.icon}</span>
                        <span className='text-sm font-medium '>{item.value}</span>
                    </motion.div>
                ))
            }

        </div>
        <motion.button 
        onClick={()=>setStep(2)}
         whileHover={{scale:1.1}}
         whileTap={{scale:0.95}}
         className='mt-4 w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium '>
           Next
        </motion.button>
      </motion.div>}



     { step==2 &&
        <motion.div
        className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
          initial={{opacity:0 , y:40}}
      animate={{opacity:1 , y:0}}
      exit={{opacity:0 , y:-40}}
      transition={{duration:0.5}}
        >
          <h1 className='text-2xl font-semibold mb-6 text-blue-300 text-center'>Create your account</h1>
          <form 
          onSubmit={handleSignUp}
          className='flex flex-col gap-4'>
            <input
            type='text'
            className='bg-white/10 border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            placeholder='Enter full Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            ></input>

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
            className='absolute right-12 top-61 -translate-y-1/2 text-gray-400 hover:text-white transition'>
              {showPassword ? <FaEyeSlash />  : <FaEye /> }
            </button>

            <motion.button 
            disabled={loading}
         type="submit"
         whileHover={{scale:1.03}}
         whileTap={{scale:0.95}}
         className='mt-4 w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium '>
           {loading ? <ClipLoader size={20} color="white"/>   : "Register Now"}
        </motion.button>
            
            <div className='flex items-center my-3'>
              <div className='flex-1 h-px bg-gray-600'></div>
              <span className='px-3 text-sm text-gray-400'>or</span>
              <div className='flex-1 h-px bg-gray-600'></div>
            </div>

            <motion.button 
         
         whileHover={{scale:1.03}}
         whileTap={{scale:0.95}}
         className='flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition'
         >
          <FcGoogle  className='w-5 h-5'/>
           <span className='font-medium'>Continue with Google</span>
        </motion.button>

        <p className='text-center text-sm mt-4 text-gray-400'>
          Already have an account ? &nbsp; {" "} <span onClick={()=>router.push("/login")} className='hover:underline text-blue-500'>Sign In</span>
        </p>


          </form>
      </motion.div> }
      </AnimatePresence>
    </div>
  )
}

export default Register