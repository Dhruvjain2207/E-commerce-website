import { auth } from '@/auth'

import Editroleandphone from '@/components/Editroleandphone'
import Navbar from '@/components/Navbar'
import Userdashboard from '@/components/User/Userdashboard'

import connectDb from '@/lib/ConnectDb'
import User from '@/models/user.model'
import { redirect } from 'next/navigation'
import React from 'react'


 export default async function page() {
   await connectDb()
   const session=await auth()
   const user=await User.findById(session?.user?.id)
   if(!user){
    redirect("/login")
   }
   const incomplete = !user.role || !user.phone || (!user.phone && user.role=="user")
   if(incomplete){
    return <Editroleandphone></Editroleandphone>
   }
   const plainUser= JSON.parse(JSON.stringify(user))


  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-sans flex-col'>
      <Navbar user={plainUser}/>

      {user?.role=="user" ? <Userdashboard/>:""} 
     
    </div>
  )
}

