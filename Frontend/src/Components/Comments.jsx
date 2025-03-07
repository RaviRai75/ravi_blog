import React from 'react'
import Comment from './Comment'

const Comments = () => {
  return (
    <div className='flex flex-col gap-8 lg:w-3/5'>
      <h1 className='underline text-xl text-gray-500'>Comments</h1>
          <div className='flex items-center justify-between gap-8 w-full'>
              <textarea placeholder='Write a comment........' className='w-full p-4 rounded-xl bg-white'/>
              <button className='bg-green-300 px-4 py-3 text-white font-medium rounded-xl'>Send</button>
          </div>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
    </div>
  )
}

export default Comments
