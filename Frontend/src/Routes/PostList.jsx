import React, { useState } from 'react'
import PostListMain from '../Components/PostListMain'
import SideMenu from '../Components/SideMenu'

const PostList = () => {
  const [open , setOpen] = useState(false)
  return (
    <div className="">
      <h1 className='mb-8 text-2xl'>Devlopment Blog</h1>
      <button onClick={() => setOpen((prev) => !prev)} className='bg-green-300 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden'>
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div><PostListMain /></div>
        <div className={`${open ? "block" : "hidden"} md:block`}><SideMenu/></div>
      </div>
    </div>
  )
}

export default PostList
