'use client'
import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence } from "motion/react"
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import axios from 'axios';

function Editroleandphone() {
  const roles=[
    {label:"Admin",value:"admin",icon:<AiOutlineTool size={40}/>},
    {label:"Vendor",value:"vendor",icon:<AiOutlineShop size={40}/>},
    {label:"User",value:"user",icon:<AiOutlineUser size={40}/>}
  ];

  const [role,setRole]=useState<string>("")
  const [phone,setPhone]=useState<string>("")
  const [adminExist,setAdminExist]=useState(false)

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



  return (
    <div className='flex items-center min-h-screen justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
    <AnimatePresence> 
      <motion.div
      initial={{opacity:0,y:40}}
      animate={{opacity:1,y:0}}
      exit={{opacity:0,y:-40}}
      className='w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-white/10'
      >
        <h1 className='text-4xl font-semibold text-center mb-4'>Choose your role</h1>
        <p className='text-center text-gray-300 mb-8 text-base'>Select your role and mobile number to continue</p>

       <form>
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
        <div className='grid grid-cols-3 sm:grid-cols-1 gap-8'>
          {roles.map((rol)=>{
            const isAdmiBlocked=rol.value=="admin" && adminExist==true
            return (
              <motion.div key={rol.value} 
              onClick={()=>{
                if(isAdmiBlocked){
                  alert("admin already exist you cannot select admin role")
                  return
                }
                setRole(rol.value);
              }}
              className={`cursor-pointer p-6 m-5 text-center rounded-2xl border transition text-lg font-medium
                ${role===rol.value? "border-blue-500/40" : "border-white/20 bg-white/10 hover:bg-white/20"}
                ${isAdmiBlocked && "opacity-40 cursoe-not-allowed"}
                `}
              >
                regeb
                

              </motion.div>
            )
          })}
        </div>
      
       </form>
         

     </motion.div>
     </AnimatePresence>
    </div>
  )
}

export default Editroleandphone
