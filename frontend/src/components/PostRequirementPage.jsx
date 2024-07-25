import React from 'react'
import { Link } from "react-router-dom";
export const List_page = () => {
  return (
    <div className='container '>
      <div className='flex justify-between items-center  mt-5'>
        <div></div>
      <p className='font-bold text-white'>C-Room</p>
      <button className=' w-8 h-8 border border-white rounded-full text-white'>X</button>
      </div>
     
      <div className='text-center mt-16 text-white' >
        <h1 className='text-3xl'>Post Your Requirment</h1>
        <p  className='mt-6 font-thin leading-7'>Find your perfect roommate or room effortlessly.Just post ypur <br />
         requirment and let the matching begin!</p>
      </div>
     
      <div className=' flex items-center justify-center gap-12 mt-12'>
        <Link to="/NeedRoomForm">
        <div className='w-80 h-80 bg-white p-8'>
          <h1 className='font-bold text-xl'>Need <br/>Room/Flat</h1>
          <p>with roommate</p>
          <figure class="w-36 h-28 md:w-30 md:h-30 shrink-1 md:shrink-0 mt-20  ml-auto">
          <img src="https://www.flatmate.in/Home_house.png" className='w-full h-full object-cover' alt="" srcset="" />
            </figure>
        </div>
        </Link>
        <Link to="/NeedRoomateForm">
        <div className='w-80 h-80 bg-white p-8'>
        <h1 className='font-bold text-xl'>Need<br/>Roomate</h1>
        <p>for your room</p>
        <figure class=" md:w-28 md:h-36 hrink-1 md:shrink-0 mt-10 ml-auto">
         <img src="https://www.flatmate.in/home_roommates.png" className='w-full h-full object-cover' alt="" srcset="" />
            </figure>
        </div>
        </Link>
      </div>

    </div>
  )
}


export default List_page