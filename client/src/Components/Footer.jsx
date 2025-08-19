import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} alt='Logo' width={150}></img>
        <p className='flex-1 border-l border-gray-400 pl-4 text-m text-gray-500 max-sm:hidden'>Copyright © 2025 Imagi-AI. All rights reserved.</p>
        <div className='flex gap-2.5'>
            <img src={assets.facebook_icon} alt='' width={35}></img>
            <img src={assets.twitter_icon} alt='' width={35}></img>
            <img src={assets.instagram_icon} alt='' width={35}></img>
        </div>

    </div>
  )
}

export default Footer
