import React from 'react'
import { useUser } from '@clerk/clerk-react'
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill-new';

const Write = () => {
  const { isLoaded, isSignedIn } = useUser()
  
  if (!isLoaded) {
    return <div className="">Loading...</div>
  }
  if (isLoaded && !isSignedIn) {
    return <div className="">You should login .......</div>
  }
  return (
   <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
    <h1 className='text-cl font-light'>Create a New Post</h1>
      <form action="" className='flex flex-col gap-6 flex-1 mb-6'>
        <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a cover Image</button>
        <input type="text" name="" id="" placeholder='My Awesome Story' className='text-4xl font-semibold bg-transparent outline-none'/>
        <div className="flex items-center gap-4">
          <label htmlFor="" className='text-sm'>Choose a catagory</label>
          <select name="" id="" className='p-2 rounded-xl bg-white shadow-md'>
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="devlopment">Devlopment</option>
            <option value="database">Database</option>
            <option value="Seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="" id="" placeholder='A Short Descrption' className='p-2 rounded-xl bg-white shadow-md' />
        <ReactQuill theme="snow"  className='flex-1 rounded-xl bg-white shadow-md'/>
        <button className='bg-green-300 text-white font-medium rounded-xl mt-4 p-2 w-36'>Send</button>

    </form>
   </div>
  )
}

export default Write
