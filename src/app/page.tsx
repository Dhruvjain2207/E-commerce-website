import { auth } from '@/auth'
import Editroleandphone from '@/components/Editroleandphone'
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


  return (
    <div>

    </div>
  )
}

