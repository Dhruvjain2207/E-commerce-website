'use client'
import React, { useState } from 'react'
import slide1 from'@/assests/silder.png'
import slide2 from'@/assests/silder1.png'
import slide3 from'@/assests/silder2.png'
import { motion,AnimatePresence } from 'motion/react';
import Image from 'next/image'

function Slider() {
    const[current,setCurrent]=useState(0);
    const slides = [
  {
    image: slide1,
    title: "RUN ON AIR",
    subtitle: "DO IT NOW.",
    description: "Running Shoes",
    button: "DISCOVER",
  },
  {
    image: slide2,
    title: "STYLE & COMFORT",
    subtitle: "NEW COLLECTION",
    description: "Women’s Fashion Accessories",
    button: "DISCOVER",
  },
  {
    image: slide3,
    title: "STEP INTO POWER",
    subtitle: "FEEL THE SPEED",
    description: "Smart Gadgets for Smart People",
    button: "DISCOVER",
  },
];
  return (
    <div className='relative rounded-2xl w-full min-h-[90vh] mt-0 overflow-hidden bg-black text-white md:my-[60px] pt-0 top-0'>

        <AnimatePresence>
            <motion.div key={current}
            initial={{opacity:0, scale:1.05}}
            animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:0.95}}
            transition={{duration:0.8}}
            className="absolute inset-0 flex justify-center items-center ">

              <Image src={slides[current].image}
                    alt={slides[current].title}
                    className="object-cover opacity-70 "
                    fill
                    />

                    <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/75 via-black/30 to-transparent px-8 md:px-20 lg:px-28">
                    <div className="max-w-xl">
                    <motion.h3 className="mb-2 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300"
                    initial={{y:20,opacity:0}}
                    animate={{y:0,opacity:1}}
                    transition={{delay:0.2}}>
                        {slides[current].subtitle}
                    </motion.h3>
                      <motion.h1 className="text-4xl md:text-6xl font-extrabold leading-none"
                    initial={{y:40,opacity:0}}
                    animate={{y:0,opacity:1}}
                    transition={{delay:0.4}}>
                        {slides[current].description}
                    </motion.h1>
                     <motion.p className="text-lg md:text-xl font-medium mb-6 mt-4 leading-none"
                    initial={{y:40,opacity:0}}
                    animate={{y:0,opacity:1}}
                    transition={{delay:0.6}}>
                        {slides[current].title}
                    </motion.p>

                    <motion.button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg transition"
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}>
                        {slides[current].button}

                    </motion.button>
                    </div>
                    </div>

            </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 right-6 flex gap-4">
            {
                slides.map((slide,index)=>(
                    <motion.div 
                    key={index}
                     whileHover={{scale:1.1}}
                     onClick={()=>setCurrent(index)}
                    className={`relative w-20 h-12 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === current
                ? "border-gary-100 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                : "border-gray-500 hover:border-blue-400"
              }`}>

                   
              </motion.div>
                ))
            }
        </div>
    </div>
  )
}

export default Slider
