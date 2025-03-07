import React from 'react'
import { Link } from 'react-router-dom'
import MainCatagories from '../Components/MainCatagories'
import FeaturedPost from '../Components/FeaturedPost'
import PostList from './PostList'
import PostListMain from '../Components/PostListMain'

const Home = () => {
  return (
    <div className='mt-4 fle flex-col gap-4'>
      {/* top */}
      <div className='flex gap-4'>
        <Link to="/">Home</Link>
        <span>.</span>
        <span className='text-green-300'>Blogs and Articles</span>
      </div>

      {/* Introduction */}

      <div className='flex items-center justify-between'>

        {/* titles */}
        <div className=''>
          <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Tech & Web Development Blog</h1>
          <p className='mt-8 text-md md:text-xl'>Latest Insights on Web Development & Technology" Description: "Discover in-depth guides, tips, and best practices in web design, development, databases, and search engines</p>
        </div>

        {/* animation button */}

        <Link to="/write" className='relative hidden md:block'>
          <svg
            viewBox='0 0 200 200'
            width='200'
            height='200'
          className='text-lg tracking-widest animate-spin animatedButton'>
            <path id='circlePath'
              fill='none'
            d='M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'/>
            <text>

            <textPath href='#circlePath' startOffset='0%'>Write a blog on it...</textPath>
            <textPath href='#circlePath' startOffset='50%'>...Share your thought</textPath>
            </text>
          </svg>
          <button className='absolute top-0 left-0 bottom-0 right-0 m-auto bg-green-300 w-20 h-20 rounded-full flex items-center justify-center'>
          <svg class="w-15 h-15 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4.988 19.012 5.41-5.41m2.366-6.424 4.058 4.058-2.03 5.41L5.3 20 4 18.701l3.355-9.494 5.41-2.029Zm4.626 4.625L12.197 6.61 14.807 4 20 9.194l-2.61 2.61Z"/>
          </svg>

          </button>
        </Link>
      </div>

      {/* catagories */}

      <MainCatagories />
      
      {/* Featured Post */}

      <FeaturedPost />
      
      {/* Post listt */}

      <div className=''>
        <h1 className='my-15 text-2xl text-gray-600 underline'>Recent Posts</h1>
        <PostListMain/>
      </div>
    </div>
  )
}

export default Home
