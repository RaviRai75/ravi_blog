import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from '../Components/Image'
import PostMenuActions from '../Components/PostMenuActions'
import Search from '../Components/Search'
import Comments from '../Components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from "timeago.js"


const fetchPost = async (slug) => {
  const res =await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data;
}

const SinglePost = () => {
  const stripHtmlRegex = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";
  return (
    <div className='flex flex-col gap-8'>
      {/* detaill */}

      <div className='flex gap-8'>

        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl zl:text-4xl 2xl:text-5xl font-semibold'>{data.title }</h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
                  <span>Written By</span>
            <Link className='text-green-300'>{data.user.username }</Link>
                  <span>On</span>
            <Link className='text-green-300'>{data.category }</Link>
                  <span>{ format(data.createdAt)}</span>
                  
          </div>
          <p className='text-gray-500 font-medium'>
            {data.desc}
          </p>
        </div>
        {data.img &&<div className='hidden lg:block w-2/5'>
        <Image src={data.img} alt=""  w="600" className='rounded-2xl'/>
        </div>}
      </div>
    
      {/* content */}
      <div className='flex flex-col md:flex-row gap-12'>
        {/* textt */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          <p>{stripHtmlRegex(data.content)}</p>


          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius iusto aperiam ex accusantium delectus qui itaque incidunt, molestias earum vel, reiciendis blanditiis ad aliquam nihil et numquam similique consequatur rerum esse. In a placeat autem, error illo quasi, suscipit aspernatur deleniti illum rem deserunt animi, maiores sapiente alias quisquam ab laudantium repellendus veritatis doloribus harum! Perspiciatis, nostrum nam. Rerum commodi ut praesentium voluptatibus tempora voluptates aspernatur soluta, totam reiciendis sequi amet aperiam dolores! Eos reiciendis facilis nobis necessitatibus voluptas magnam quidem corporis omnis eligendi amet ratione optio quisquam consequuntur a ad, cumque harum atque minus eius. Laudantium praesentium culpa tempore pariatur voluptas maxime tenetur ab qui nisi voluptatem tempora non temporibus, doloribus nulla? Perspiciatis natus voluptates debitis reprehenderit repellat ipsa quo hic nobis totam eligendi, quibusdam deserunt dolor ullam quasi necessitatibus deleniti, quam neque non? Est vel quod incidunt, voluptates culpa saepe quas deserunt voluptatum ipsa fugit dolore in!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius iusto aperiam ex accusantium delectus qui itaque incidunt, molestias earum vel, reiciendis blanditiis ad aliquam nihil et numquam similique consequatur rerum esse. In a placeat autem, error illo quasi, suscipit aspernatur deleniti illum rem deserunt animi, maiores sapiente alias quisquam ab laudantium repellendus veritatis doloribus harum! Perspiciatis, nostrum nam. Rerum commodi ut praesentium voluptatibus tempora voluptates aspernatur soluta, totam reiciendis sequi amet aperiam dolores! Eos reiciendis facilis nobis necessitatibus voluptas magnam quidem corporis omnis eligendi amet ratione optio quisquam consequuntur a ad, cumque harum atque minus eius. Laudantium praesentium culpa tempore pariatur voluptas maxime tenetur ab qui nisi voluptatem tempora non temporibus, doloribus nulla? Perspiciatis natus voluptates debitis reprehenderit repellat ipsa quo hic nobis totam eligendi, quibusdam deserunt dolor ullam quasi necessitatibus deleniti, quam neque non? Est vel quod incidunt, voluptates culpa saepe quas deserunt voluptatum ipsa fugit dolore in!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius iusto aperiam ex accusantium delectus qui itaque incidunt, molestias earum vel, reiciendis blanditiis ad aliquam nihil et numquam similique consequatur rerum esse. In a placeat autem, error illo quasi, suscipit aspernatur deleniti illum rem deserunt animi, maiores sapiente alias quisquam ab laudantium repellendus veritatis doloribus harum! Perspiciatis, nostrum nam. Rerum commodi ut praesentium voluptatibus tempora voluptates aspernatur soluta, totam reiciendis sequi amet aperiam dolores! Eos reiciendis facilis nobis necessitatibus voluptas magnam quidem corporis omnis eligendi amet ratione optio quisquam consequuntur a ad, cumque harum atque minus eius. Laudantium praesentium culpa tempore pariatur voluptas maxime tenetur ab qui nisi voluptatem tempora non temporibus, doloribus nulla? Perspiciatis natus voluptates debitis reprehenderit repellat ipsa quo hic nobis totam eligendi, quibusdam deserunt dolor ullam quasi necessitatibus deleniti, quam neque non? Est vel quod incidunt, voluptates culpa saepe quas deserunt voluptatum ipsa fugit dolore in!</p>
        </div>
        {/* menuu */}
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4 '>

          <div className='flex items-center gap-8'>
            <Image src={data.user.img} alt="" className='w-12 h-12 rounded-full object-cover' w="48" h="48"/>
            <Link className='text-green-600'>{data.user.username}</Link>
          </div>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet.</p>
            <div className='flex gap-2'>
              <Link>
              <Image src="facebook.svg" alt="" />
              </Link>
              <Link>
              <Image src="instagram.svg" alt="" />
              </Link>
          </div>
            </div>
          <PostMenuActions post={data } />
          <h1 className='mt-8 mb-4 text-sm font-medium'>Catagories</h1>
          <div className='flex flex-col gap-2 text-sm'>
            <Link className='underline' to='/'>All</Link>
            <Link className='underline' to='/'>Web Design</Link>
            <Link className='underline' to='/'>Devlopment</Link>
            <Link className='underline' to='/'>Database</Link>
            <Link className='underline' to='/'>Search Engines</Link>
            <Link className='underline' to='/'>Marketing</Link>
          </div>
          <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
          <Search/>
        </div>
      </div>
      <Comments postId={ data._id} />
    </div>
  )
}

export default SinglePost
