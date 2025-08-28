import { LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

function NavBarLoggedIn() {

    const {logout} = useAuthStore();

  return (
    <div>
      <header className='w-[100%] bg-white p-4'>
        <div className="flex justify-between">
            <div className="">
                <img src="/seawolf.png" alt="SBU Logo" className='w-[50px]' />
            </div>
            <div className="">
                <button className='flex justify-center items-center text-gray-700 w-auto gap-2 bg-gray-200 p-2 rounded-sm cursor-pointer' onClick={logout}><LogOut /> Logout</button>
            </div>
        </div>
      </header>
    </div>
  )
}

export default NavBarLoggedIn
