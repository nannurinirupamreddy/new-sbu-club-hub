import React from 'react'
import {Link} from 'react-router-dom'

function NavBarDefault() {
  return (
    <header className='bg-white p-4 max-w-full m-0'>
      <div className="flex justify-between items-center">
        <div className="w-[50%]">
            <Link to={"/"}><img src="/seawolf.png" alt="SBU Logo" className='w-[50px]' /></Link>
        </div>
        <div className="w-[50%] flex justify-end gap-2">
            <Link to={"/login"}><button className='btn btn-primary btn-outline cursor-pointer'>Login</button></Link>
            <Link to={"/signup"}><button className='btn btn-primary cursor-pointer'>Signup</button></Link>
        </div>
      </div>
    </header>
  )
}

export default NavBarDefault
