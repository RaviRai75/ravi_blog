import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const FeaturedPost = () => {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      {/* first Post */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
      {/* Image */}
      
      <Image src="reactlogo" alt="" className='rounded-2xl object-cover bg-cover' w="895"/>
      
      {/* details */}

      <div className='flex items-center gap-4'>
        <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link className='text-green-300 lg:text-lg'>React JS</Link>
          <span className='text-gray-500'>2 Days Ago</span>
      </div>
      {/* Title */}

      <Link to='./test' className='text-xl lg:text-3xl font-semibold lg:font-bold'>Getting Started with React.js: A Beginner’s Guide</Link>
      </div>

      


      {/* Aside Post */}

      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        
        {/* second */}

        <div className='lg:h-1/3 flex justify-between gap-4'>
          <div className='w-1/3 aspect-video'>
            <Image src="featured2.jpg" alt="" className='rounded-3xl object-cover w="298"' />
          </div>
        

          {/* detaill title */}
          <div className='w-2/3'>
          <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
        <h1 className='font-semibold '>02.</h1>
          <Link className='text-green-300 lg:text-lg'>Javascript</Link>
          <span className='text-gray-500'>2 Days Ago</span>
      </div>

            {/* titlee */}
            <Link to='./test' className='text-base sm:text-lg md:text-xl xl:text-2xl font-medium'>
            Getting Started with Javascript: A Beginner’s Guide</Link>
          </div>
        </div>
        {/* Third */}

        <div className='lg:h-1/3 flex justify-between gap-4'>
        <div className='w-1/3 aspect-video'>
            <Image src="featured3.jpg" alt="" className='rounded-3xl object-cover w="298"' />
          </div>
         {/* detaill title */}
         <div className='w-2/3'>
          <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
        <h1 className='font-semibold '>03.</h1>
          <Link className='text-green-300 lg:text-lg'>CSS</Link>
          <span className='text-gray-500'>2 Days Ago</span>
      </div>

            {/* titlee */}
            <Link to='./test' className='text-base sm:text-lg md:text-xl xl:text-2xl font-medium'>
            Getting Started with CSS: A Beginner’s Guide</Link>
          </div>
        
        </div>
        {/* Fourth */}

        <div className='lg:h-1/3 flex justify-between gap-4'>
        <div className='w-1/3 aspect-video'>
            <Image src="featured4.jpg" alt="" className='rounded-3xl object-cover w="298"' />
          </div>
         {/* detaill title */}
         <div className='w-2/3'>
          <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
        <h1 className='font-semibold '>04.</h1>
          <Link className='text-green-300 lg:text-lg'>HTML</Link>
          <span className='text-gray-500'>5 Days Ago</span>
      </div>

            {/* titlee */}
            <Link to='./test' className='text-base sm:text-lg md:text-xl xl:text-2xl font-medium'>
            Getting Started with HTML: A Beginner’s Guide</Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default FeaturedPost
