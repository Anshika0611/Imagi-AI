import React from 'react'
import {assets} from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const { logged } = useContext(AppContext)
  const navigate=useNavigate();

  return (
    <div className='flex items-center justify-between p-4'>
      <Link to={'/'}>
      <img src={assets.logo} alt='Logo' className='w-28 sm:w-32 lg:w-40'></img>
      </Link>
      <div>
        {
        logged ?
        <div className='flex items-center gap-2 sm:gap-3'>
          <button onClick={() => navigate('/buy')}
          className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all '>
            <img className='w-5'
            src={assets.credit_star} alt=''></img>
            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left:5</p>
          </button>
          <p className='text-gray-600 max-sm:hidden px-2'>Hi, Anshika</p>
          <div className='relative group'>
            <img className='w-10 drop-shadow'
            src={assets.profile_icon} alt=''></img>
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 rounded-lg text-black rounded pt-12'>
              <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                <li>Logout</li>
              </ul>
            </div>
            </div>
        </div>
        :
         <div className='flex items-center gap-2 sm:gap-5'>
          <p onClick={() => navigate('/buy')}
          className='cursor-pointer'>Pricing</p>
          <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
         </div>
        }
        
       
      </div>
    </div>
  )
}

export default Navbar
