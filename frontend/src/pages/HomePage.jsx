import React from 'react'
import NavBarDefault from '../components/NavBarDefault'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <NavBarDefault />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {/* <div className="bg-gray-300 rounded-md w-1/3 p-1">
                <p className='text-center text-xs font-semibold'>The official game tracker of SBU</p>
              </div> */}
              <h1 className='text-4xl font-bold'>Enjoy your time at <span className='text-primary font-extrabold'>SBU's Club Hub</span></h1>
              <p className="text-2xl font-bold">Join Stony Brook University's premier gaming community. Connect with fellow gamers, compete in
                  tournaments, and be part of something bigger.</p>
              <Link to={"/signup"}><button className='btn btn-primary hover:bg-primary/90 text-lg px-8'>Join the community</button></Link>
            </div>
            <div className="relative flex justify-center items-center">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                  <img src="./club-hub-main.jpg" className='w-full h-full object-cover rounded-xl' alt="" />
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg text-white">
                  🏆 #1 Gaming Club
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gray-50 text-card-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🎯 All Skill Levels
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
