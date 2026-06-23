'use client'
import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence } from "motion/react"
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Editroleandphone() {
  const roles=[
    {label:"Admin",value:"admin",icon:<AiOutlineTool size={40}/>},
    {label:"Vendor",value:"vendor",icon:<AiOutlineShop size={40}/>},
    {label:"User",value:"user",icon:<AiOutlineUser size={40}/>}
  ];

  const [role,setRole]=useState<string>("")
  const [phone,setPhone]=useState<string>("")
  const [adminExist,setAdminExist]=useState(false)
  const[loading,setLoading]=useState(false)
  const router=useRouter();

  useEffect(()=>{
    const checkAdmin=async()=>{
      try{
        const res=await axios.get("/api/admin/checkAdmin")
        setAdminExist(res.data.exists)
      }catch(err){
        setAdminExist(false)
        console.log(err)

      }
    }
    checkAdmin();

  },[])

  const handleSubmit=async (e:React.FormEvent)=>{
       e.preventDefault()
       if(!role || !phone){
        alert("please select the role and enter the phone number")
        return
       }
       setLoading(true)
       
       try{
        const res=await axios.post("/api/user/role_phone",{role,phone})
        console.log(res.data);
        setLoading(false)
        router.push("/")
       }catch(error){
        console.log(error)
        setLoading(false)
       }

  }



  return (
    <div className='flex items-center min-h-screen justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-6'>
    <AnimatePresence> 
      <motion.div
      initial={{opacity:0,y:40}}
      animate={{opacity:1,y:0}}
      exit={{opacity:0,y:-40}}
      className='w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10 border border-white/10'
      >
        <h1 className='text-3xl sm:text-4xl font-semibold text-center mb-4'>Choose your role</h1>
        <p className='text-center text-gray-300 mb-8 text-base'>Select your role and mobile number to continue</p>

       <form onSubmit={handleSubmit}>
        <input
        type='text'
        placeholder="Enter your mobile number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        maxLength={10}
        required
        className='bg-white/10 border border-white/30 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
        >
        </input>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8'>
          {
            roles.map((rol)=>{
              const isAdminBlocked=rol.value=="admin" && adminExist==true
              return (
                <motion.div key={rol.value}
               
                onClick={()=>{
                  if(isAdminBlocked){
                    alert("Admin already exists you cannot select admin role")
                    return;

                  }
                  setRole(rol.value)
                }}

                className={`cursor-pointer p-4 sm:p-6 text-center rounded-2xl border font-medium text-lg transition 
                ${
                  role === rol.value
                  ? "border-blue-500 bg-blue-500/40" 
                   : "border-white/20 bg-white/10 hover:bg-white/30"
                }
                ${isAdminBlocked && "opacity-40 cursor-not-allowed"}
                `}>
                  <div className='flex justify-center mb-3'>{rol.icon}</div>
                  <p className="">{rol.value}</p>

                  {isAdminBlocked && <p className='text-xs text-red-400 mt-2'>Admin already exist</p>}
           
                </motion.div>

                

                 
              )
            })
          }
          </div>
           <motion.button 
            disabled={loading}
         type="submit"
         whileHover={{scale:1.03}}
         whileTap={{scale:0.95}}
         className='mt-10 w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium '>
           {loading ? <ClipLoader size={20} color="white"/>   : "Submit Now"}
        </motion.button>
      
       </form>
         

     </motion.div>
     </AnimatePresence>
    </div>
  )
}

export default Editroleandphone
