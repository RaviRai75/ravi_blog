import React, { useState } from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'



const Navbar = () => {
  const [open, setOpen] = useState(false)
 


  return (
    <div className='w-full h-16 md:20 flex items-center justify-between'>

      {/* LOGO */}

      <Link to="/"className='flex items-center gap-4 text-2xl font-bold'>
        <Image src="logo.jpg" alt="LOGO" w={32} h={ 32} />
       
        <span className=''>RRR | | BLOG</span>
      </Link>

      {/* Mobile Menu */}

      <div className='md:hidden'>

        {/* Mobile Button */}

        <div className='cursor-pointer text-4xl'  onClick={()=>setOpen((prev) => !prev)}>
          {open ? "X"  : "☰"}
        </div>

        {/* Mobile Link List */}

        <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 absolute top-16 right-0 font-medium text-lg bg-red-100 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <Link to="/">HOME</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <Link to="/">
        <button className='py-2 px-4 rounded-3xl bg-green-400 text-white cursor-pointer'>Login 👋</button></Link>

        </div>
      </div>

      {/* DeskTop Menu */}
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium cursor-pointer' >
        <Link to="/">HOME</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
          <SignedOut>
          <Link to="/login"><button className='py-2 px-4 rounded-3xl bg-green-400 text-white cursor-pointer'>Login 👋</button></Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>

    </div>
  )
}

export default Navbar
