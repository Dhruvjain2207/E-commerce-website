'use client'
import { Iuser } from '@/models/user.model'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import logo from '@/assests/logo.jpg'
import { motion,AnimatePresence } from "motion/react"
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSolution,
} from "react-icons/ai";
import { GoListUnordered } from 'react-icons/go'

function Navbar({user}:{user:Iuser}) {
    const router=useRouter()
  return (
    <div className='fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg  '>
        <div className='max-w-7xl mx-auto px-6 py-3 flex justify-between items-center'>
         <div onClick={()=>router.push("/")} className='flex items-center gap-2 cursor-pointer'>
             <Image src={logo} alt="logo image" width={40} height={40}
             className='rounded-full' />
             <span className='text-xl font-semibold hidden sm:inline'>Multicart</span>
         </div>
         <div>
            {user.role=="user" && <div className='hidden md:flex gap-8'>
                <NavItems label="Home" path="/" router={router}/>
                <NavItems label="Categories" path="/category" router={router}/>
                <NavItems label="Shop" path="/shop" router={router}/>
                <NavItems label="Orders" path="/order" router={router}/>
                 </div>}
                
            </div>
               {/* desktop icons */}
                 <div className='hidden md:flex items-center gap-6'>
                   {user?.role=="user" && <Iconbtn Icon={AiOutlineSearch} onClick={()=>router.push("/category")}/>}
                    <Iconbtn Icon={AiOutlinePhone} onClick={()=>router.push("/support")}  />
                 </div>
                  
        </div>
    </div>
  )
}

export default Navbar


const NavItems =({label , path, router}:any)=>(
    <motion.button  whileHover={{scale:1.1}} onClick={()=>router.push(path)} className='hover:text-gray-300'>{label}</motion.button>

)
const   Iconbtn=({Icon, onClick}:any)=>(
    <motion.button 
    whileHover={{scale:1.1}}
    onClick={onClick}
    >
        <Icon size={24}/>
      
    </motion.button>


)