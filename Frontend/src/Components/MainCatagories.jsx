import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

const MainCatagories = () => {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
        {/* links */}

          <div className='flex-1 flex items-center justify-between flex-wrap'>
              <Link to='/posts' className='bg-green-300 text-white rounded-full px-4 py-2'>All Posts</Link>
              <Link to='/posts?cat=web-design' className='hover:bg-green-200 rounded-full px-4 py-2'>Web Design</Link>
              <Link to='/posts?cat=devlopment' className='hover:bg-green-200 rounded-full px-4 py-2'>Devlopment</Link>
              <Link to='/posts?cat=database' className='hover:bg-green-200 rounded-full px-4 py-2'>Databases</Link>
              <Link to='/posts?cat=sec' className='hover:bg-green-200 rounded-full px-4 py-2'>Search Engines</Link>
              <Link to='/posts?cat=marketing' className='hover:bg-green-200 rounded-full px-4 py-2'>Marketing</Link>
          </div>
          <span className='text:xl font-bold'>|</span>
          {/* search */}
          <Search/>
    </div>
  )
}

export default MainCatagories
