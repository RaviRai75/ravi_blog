import React from 'react'
import logo from '../assets/Images/logo.jpg'

const Navbar = () => {
  return (
    <div className='w-full h-16 md:20 flex items-center justify-between'>
      {/* LOGO */}
      <div >
        <img src={logo} alt="LOGO" className='w-10 h-`10' />
        <span>RRR__BLOG</span>
      </div>
      {/* Mobile Menu */}
      <div className='md:hidden'>M</div>

      {/* DeskTop Menu */}
      <div className='hidden md:flex'>D</div>

    </div>
  )
}

export default Navbar
