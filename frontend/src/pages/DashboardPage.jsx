import React, { useEffect } from 'react'
import NavBarLoggedIn from '../components/NavBarLoggedIn'
import useAuthStore from '../../store/useAuthStore'
import useGamesStore from '../../store/useGamesStore'
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import GamesComponent from '../components/GamesComponent';

function DashboardPage() {

    const {authUser} = useAuthStore();
    const {isLoadingGames, games, getGames} = useGamesStore();

    useEffect(() => {
        getGames()
    }, [getGames])

    if (!authUser) {
        return <Navigate to={"/"}/>
    }

    if (isLoadingGames && !games) {
      return (
        <div className='flex items-center justify-center h-screen w-full max-w-full' role="status" aria-live="polite">
            <Loader className='size-10 animate-spin' aria-hidden="true" />
            <span className="sr-only">Loading games</span>
        </div>
      )
    }

  return (
    <div className='w-full max-w-full'>
      <NavBarLoggedIn />
      <main className="bg-gray-50 min-h-screen w-full flex flex-col items-center p-4 max-w-full">
        <h1 className="sr-only">Game availability</h1>
        {!games ? <p className='text-center font-bold text-2xl'>No games found!</p> : (
          <div className="flex flex-col justify-center items-center w-full max-w-full max-h-full">
            {games.map((game, index) => { return (<GamesComponent name={game.name} description={game.description} availability={game.availability} controllersInUse={game.controllersInUse} studentWillingToShare={game.studentWillingToShare} key={index} />)})}
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
