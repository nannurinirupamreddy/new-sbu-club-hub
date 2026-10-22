import React from 'react'
import {Link} from 'react-router-dom'

function NavBarDefault() {
  return (
    <header className='bg-white p-4 max-w-full m-0'>
      <div className="flex justify-between items-center">
        <div className="w-[50%]">
            <Link to={"/"} aria-label="SBU Club Hub home"><img src="/seawolf.png" alt="" className='w-[50px]' /></Link>
        </div>
        <div className="w-[50%] flex justify-end gap-2">
            <nav aria-label="Account" className="flex gap-2">
              <Link to={"/login"} className='btn btn-primary btn-outline'>Login</Link>
              <Link to={"/signup"} className='btn btn-primary'>Signup</Link>
            </nav>
        </div>
      </div>
    </header>
  )
}

export default NavBarDefault
