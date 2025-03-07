import React from 'react'
import Image from './Image'

const Comment = () => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
          <div className="flex items-center gap-4">
              <Image src="default-image.jpg" alt="" className='w-10 h-10 rounded-full object-cover' />
              <span className='font-medium'>Ravi Rai</span>
              <span className='text-sm'>2 days ago</span>
        </div>
          <div className="mt-4">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti numquam facilis saepe, expedita ad esse officia quasi voluptas eaque accusamus ducimus? Odio, quod tempore!</p>
      </div>
    </div>
  )
}

export default Comment
