import React from "react"
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { RiInstagramFill } from "react-icons/ri"

export const Footer = () => {
  return (  
    <>
      <footer className="py-5 bg-black/70 text-white">
        <div className='flex flex-col sm:flex-row gap-4 sm:justify-around'>
          <p className="text-white sm:text-lg text-center">© 2023 Unicorn Blog - All right reserved</p>
          <div className='flex gap-5'>
            <BsFacebook className='text-2xl' />
            <RiInstagramFill className='text-2xl' />
            <AiFillTwitterCircle className='text-2xl' />
            <AiFillLinkedin className='text-2xl' />
          </div>
        </div>
      </footer>
    </>
  )
}
