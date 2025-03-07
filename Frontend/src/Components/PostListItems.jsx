import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const PostListItems = () => {
  return (
      <div className='flex flex-col xl:flex-row gap-8'>
          {/* imagee */}
          <div className='md:hidden xl:block xl:w-1/3 w="738'>
              <Image src="default-image.jpg" alt="" className='rounded-2xl object-cover'/>
          </div>

          {/* detailss */}

          <div className='flex flex-col gap-4 xl:w-2/3'>
              <Link to='./test' className='text-4xl font-semibold'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto?
              </Link>
              <div className='flex items-center gap-2 text-gray-400 text-sm'>
                  <span>Written By</span>
                  <Link className='text-green-500'>Ravi Roy</Link>
                  <span>On</span>
                  <Link className='text-green-500'>Web Design</Link>
                  <span>3 days ago</span>
                  
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia, possimus in tempora minima repellendus facere minus illo nisi sit provident soluta dignissimos amet sint cupiditate tempore molestiae. Ipsa, ullam.</p>
              <Link to='./test' className='text-green-600 underline text-sm'>Read More</Link>
          </div>
      
    </div>
  )
}

export default PostListItems
