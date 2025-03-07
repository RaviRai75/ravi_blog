import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../Components/Image'
import PostMenuActions from '../Components/PostMenuActions'
import Search from '../Components/Search'
import Comments from '../Components/Comments'

const SinglePost = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* detaill */}

      <div className='flex gap-8'>

        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl zl:text-4xl 2xl:text-5xl font-semibold'>Lorem ipsum dolor sit amet conseur adipisicing </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
                  <span>Written By</span>
                  <Link className='text-green-300'>Ravi Roy</Link>
                  <span>On</span>
                  <Link className='text-green-300'>Web Design</Link>
                  <span>3 days ago</span>
                  
          </div>
          <p className='text-gray-500 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam pariatur dolorem rem cupiditate repellat expedita dolores officiis nemo alias asperiores? Beatae unde totam laborum debitis quam at praesentium minima dolorem quibusdam, assumenda aliquid eos labore quasi vitae odit perspiciatis ipsam ab? Tempora neque iusto suscipit recusandae, a corrupti harum sequi nihil, optio, voluptatem debitis ipsum nesciunt consequatur minima! Iure, provident?</p>
        </div>
        <div className='hidden lg:block w-2/5'>
        <Image src="default-image.jpg" alt=""  w="600" className='rounded-2xl'/>
        </div>
      </div>
    
      {/* content */}
      <div className='flex flex-col md:flex-row gap-12'>
        {/* textt */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, voluptates quia nisi quasi voluptatibus, repellendus, magnam rerum dignissimos possimus corrupti consequuntur amet reprehenderit? Delectus atque velit rerum totam voluptate laboriosam mollitia autem praesentium excepturi recusandae laborum ex aut animi facilis illo, corporis error nulla quaerat alias numquam hic dignissimos. Quaerat, laborum corrupti suscipit veniam natus sequi, labore tempora, accusantium repudiandae aliquid exercitationem nisi ex vero earum. Praesentium maiores exercitationem fugit id soluta veritatis. Itaque ab ipsum vero rem aliquam maxime corrupti cupiditate veritatis, dignissimos possimus quisquam perspiciatis quam libero molestias assumenda. Adipisci, ipsa voluptatibus quidem quae ullam, totam dolorum perspiciatis vel amet cumque libero obcaecati itaque fugit inventore tenetur enim. Illo autem ipsam odio quam reiciendis. Quaerat omnis aspernatur voluptas exercitationem cumque sapiente dolor earum aut asperiores repellendus sit ipsum maiores recusandae illum optio impedit ad harum, esse totam sequi et consequuntur. Libero ipsam vel repudiandae sit dicta cupiditate provident vero ut. Dolorem vitae reprehenderit minus veritatis excepturi. Inventore, nihil neque. Perferendis fugit ut nesciunt, nulla itaque harum eius optio quam assumenda esse incidunt voluptates consectetur distinctio tenetur molestiae nemo corrupti delectus ipsam maxime. Iure corporis asperiores, nulla error beatae nesciunt ducimus soluta eveniet dolorem dolorum itaque voluptatem. Quis, ipsa.</p>


          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius iusto aperiam ex accusantium delectus qui itaque incidunt, molestias earum vel, reiciendis blanditiis ad aliquam nihil et numquam similique consequatur rerum esse. In a placeat autem, error illo quasi, suscipit aspernatur deleniti illum rem deserunt animi, maiores sapiente alias quisquam ab laudantium repellendus veritatis doloribus harum! Perspiciatis, nostrum nam. Rerum commodi ut praesentium voluptatibus tempora voluptates aspernatur soluta, totam reiciendis sequi amet aperiam dolores! Eos reiciendis facilis nobis necessitatibus voluptas magnam quidem corporis omnis eligendi amet ratione optio quisquam consequuntur a ad, cumque harum atque minus eius. Laudantium praesentium culpa tempore pariatur voluptas maxime tenetur ab qui nisi voluptatem tempora non temporibus, doloribus nulla? Perspiciatis natus voluptates debitis reprehenderit repellat ipsa quo hic nobis totam eligendi, quibusdam deserunt dolor ullam quasi necessitatibus deleniti, quam neque non? Est vel quod incidunt, voluptates culpa saepe quas deserunt voluptatum ipsa fugit dolore in!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius iusto aperiam ex accusantium delectus qui itaque incidunt, molestias earum vel, reiciendis blanditiis ad aliquam nihil et numquam similique consequatur rerum esse. In a placeat autem, error illo quasi, suscipit aspernatur deleniti illum rem deserunt animi, maiores sapiente alias quisquam ab laudantium repellendus veritatis doloribus harum! Perspiciatis, nostrum nam. Rerum commodi ut praesentium voluptatibus tempora voluptates aspernatur soluta, totam reiciendis sequi amet aperiam dolores! Eos reiciendis facilis nobis necessitatibus voluptas magnam quidem corporis omnis eligendi amet ratione optio quisquam consequuntur a ad, cumque harum atque minus eius. Laudantium praesentium culpa tempore pariatur voluptas maxime tenetur ab qui nisi voluptatem tempora non temporibus, doloribus nulla? Perspiciatis natus voluptates debitis reprehenderit repellat ipsa quo hic nobis totam eligendi, quibusdam deserunt dolor ullam quasi necessitatibus deleniti, quam neque non? Est vel quod incidunt, voluptates culpa saepe quas deserunt voluptatum ipsa fugit dolore in!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius iusto aperiam ex accusantium delectus qui itaque incidunt, molestias earum vel, reiciendis blanditiis ad aliquam nihil et numquam similique consequatur rerum esse. In a placeat autem, error illo quasi, suscipit aspernatur deleniti illum rem deserunt animi, maiores sapiente alias quisquam ab laudantium repellendus veritatis doloribus harum! Perspiciatis, nostrum nam. Rerum commodi ut praesentium voluptatibus tempora voluptates aspernatur soluta, totam reiciendis sequi amet aperiam dolores! Eos reiciendis facilis nobis necessitatibus voluptas magnam quidem corporis omnis eligendi amet ratione optio quisquam consequuntur a ad, cumque harum atque minus eius. Laudantium praesentium culpa tempore pariatur voluptas maxime tenetur ab qui nisi voluptatem tempora non temporibus, doloribus nulla? Perspiciatis natus voluptates debitis reprehenderit repellat ipsa quo hic nobis totam eligendi, quibusdam deserunt dolor ullam quasi necessitatibus deleniti, quam neque non? Est vel quod incidunt, voluptates culpa saepe quas deserunt voluptatum ipsa fugit dolore in!</p>
        </div>
        {/* menuu */}
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4 '>

          <div className='flex items-center gap-8'>
            <Image src="default-image.jpg" alt="" className='w-12 h-12 rounded-full object-cover' w="48" h="48"/>
            <Link className='text-green-600'>Ravi Rai</Link>
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
          <PostMenuActions />
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
     <Comments/>
    </div>
  )
}

export default SinglePost
