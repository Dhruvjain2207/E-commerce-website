'use client'
import { Iuser } from '@/models/user.model'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
  AiOutlineProfile,
} from "react-icons/ai";
import { GoListUnordered } from 'react-icons/go'
import { signOut } from 'next-auth/react'

function Navbar({user}:{user:Iuser}) {
    const router=useRouter();
    const [openMenu,setOpenMenu]=useState(false)
    const[sidebarOpen,setSidebarOpen]=useState(false)
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

                    <div className='relative'>
                      {user?.image ? <Image className='w-10 h-10 rounded-full object-cover border-gray-700 cursor-pointer
                      ' onClick={()=>setOpenMenu(!openMenu)} src={user?.image} alt="user" width={40} height={40}/> :
                      <Iconbtn Icon={AiOutlineUser} onClick={()=>setOpenMenu(!openMenu)}/>}
                      
                      <AnimatePresence>
                        {openMenu && <motion.div className='absolute mt-3 right-0 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c] '
                        initial={{opacity:0 , y:-10}}
                        animate={{opacity:1 , y:0}}
                        exit={{opacity:0,y:-10}}
                        transition={{duration:0.5}}>
                         <DropDownbtn Icon={AiOutlineUser} label="Profile" onClick={()=>{router.push("/profile"); setOpenMenu(false)} }  />
                         <DropDownbtn Icon={AiOutlineLogin} label="SignIn" onClick={()=>{router.push("/login"); setOpenMenu(false)} }  />
                          <DropDownbtn Icon={AiOutlineLogout} label="Logout" onClick={()=>{signOut(); setOpenMenu(false)} }  />
                           
                        </motion.div>}
                      </AnimatePresence>

                     
                    </div>
                     {user?.role=="user" &&<Cart router={router} count={user.cart?.length}/>}
                 </div>

                 {/* mobile icons */}

                 <div className="md:hidden flex items-center gap-4">
                  {user?.role=="vendor" || user?.role=="admin" ? (
                     <>
                       <Iconbtn Icon={AiOutlinePhone} onClick={()=>router.push("/support")}  />
                         <div className='relative'>
                      {user?.image ? <Image className='w-8 h-8 rounded-full object-cover border-gray-700 cursor-pointer
                      ' onClick={()=>setOpenMenu(!openMenu)} src={user?.image} alt="user" width={32} height={32}/> :
                      <Iconbtn Icon={AiOutlineUser} onClick={()=>setOpenMenu(!openMenu)}/>}
                      
                      <AnimatePresence>
                        {openMenu && <motion.div className='absolute mt-3 right-0 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c] '
                        initial={{opacity:0 , y:-10}}
                        animate={{opacity:1 , y:0}}
                        exit={{opacity:0,y:-10}}
                        transition={{duration:0.5}}>
                         <DropDownbtn Icon={AiOutlineUser} label="Profile" onClick={()=>{router.push("/profile"); setOpenMenu(false)} }  />
                         <DropDownbtn Icon={AiOutlineLogin} label="SignIn" onClick={()=>{router.push("/login"); setOpenMenu(false)} }  />
                          <DropDownbtn Icon={AiOutlineLogout} label="Logout" onClick={()=>{signOut(); setOpenMenu(false)} }  />
                           
                        </motion.div>}
                      </AnimatePresence>

                     
                    </div>
                     

                     </>
                  ):(
                    <>
                     <Iconbtn Icon={AiOutlineSearch} onClick={()=>router.push("/category")}/>
                        <Iconbtn Icon={AiOutlinePhone} onClick={()=>router.push("/support")}  />
                          <Cart router={router} count={user.cart?.length}/>
                          <AiOutlineMenu size={28} className='cursor-pointer' onClick={()=>setSidebarOpen(true)}/>
                           <AnimatePresence>
                            { sidebarOpen &&<motion.div className="fixed top-0 right-0 h-screen w-[65%] bg-black/90 backdrop-blur-lg p-6 text-white "
                             initial={{x:"100%"}}
                             animate={{x:0}}
                             exit={{x:"100%"}}
                             transition={{type:"spring",stiffness:200,damping:24}}
                            >
                              <div className="flex justify-between items-center mb-6">
                                <h1 className="text-xl font-semibold">Menu</h1>
                                <AiOutlineClose className="cursor-pointer" onClick={()=>setSidebarOpen(false)} size={28}/>
                              </div>
                              <div className="flex flex-col gap-4 text-lg">
                                <SideBarBtn label="home" Icon={AiOutlineHome} path={"/"}  router={router} setSidebarOpen={setSidebarOpen}/>
                                <SideBarBtn label="Categories" Icon={AiOutlineAppstore} path={"/category"}  router={router} setSidebarOpen={setSidebarOpen}/>
                                <SideBarBtn label="Shops" Icon={AiOutlineShop} path={"/shop"}  router={router} setSidebarOpen={setSidebarOpen}/>
                                <SideBarBtn label="Orders" Icon={GoListUnordered} path={"/orders"}  router={router} setSidebarOpen={setSidebarOpen}/>
                                <SideBarBtn label="Profile" Icon={AiOutlineProfile} path={"/profile"}  router={router} setSidebarOpen={setSidebarOpen}/>
                                <SideBarBtn label="SignIn" Icon={AiOutlineLogin} path={"/login"}  router={router} setSidebarOpen={setSidebarOpen}/>
                                <Signout label="Logout" Icon={AiOutlineLogout} setSidebarOpen={setSidebarOpen}/>
                              </div>

                            </motion.div>}
                           </AnimatePresence>
                    </>

                  )}

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
const DropDownbtn= ({Icon,label,onClick}:any)=>(
  <button className=" relative flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left"
   onClick={()=>{onClick();
    
   }}>
    <Icon size={18}/>

    {label}
   
  
  </button>
)

const Cart=({router,count}:any)=>(
  <motion.button
   whileHover={{scale:1.1}}
   onClick={()=>router.push("/cart")}
   className='relative'>
   <AiOutlineShoppingCart size={24}/>
   {count>0 && <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1'>{count}</span>}
 
  </motion.button>


)

const SideBarBtn =({label,path,router,Icon,setSidebarOpen}:any)=>(
  <button className="flex items-center px-4 py-2 text-left gap-3 rounded-lg bg-[#6a69693c] hover:bg-white/10 "
  onClick={()=>{router.push(path);setSidebarOpen(false)}}>
     <Icon size={20}/>
     {label}
  </button>

)
const Signout =({label,Icon,setSidebarOpen}:any)=>(
  <button className="flex items-center px-4 py-2 text-left gap-3 rounded-lg bg-[#6a69693c] hover:bg-white/10 "
  onClick={()=>{signOut();setSidebarOpen(false)}}>
     <Icon size={20}/>
     {label}
  </button>

)


