import { Circle, Pencil, Trash, Loader } from 'lucide-react'
import { FaCircle } from "react-icons/fa"
import React, { useEffect, useState } from 'react'
import EditGamePage from '../EditGamePage'
import { useNavigate } from 'react-router-dom';
import useGamesStore from '../../../store/useGamesStore';

function AdminGamesComponent({_id, name, description, availability}) {

    const navigate = useNavigate();

    const {deleteGame, isDeletingGame} = useGamesStore();

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            await deleteGame(_id);
        }
    };

  return (
    <div className='bg-white w-[90%] sm:w-[600px] max-h-fit p-4 rounded-xl m-4 flex justify-between items-center'>
        <div className="w-[90%] h-[100%] flex flex-col justify-start items-start">
            <div className="font-bold text-3xl">
                <h2>{name}</h2>
            </div>
            <div className="font-semibold text-xl mt-2">
                <p>{description}</p>
            </div>
            <div className="mt-2">
                <div className="">
                    {availability ? (
                        <>
                            <div className="max-w-fit bg-green-200 flex justify-center items-center p-1.5 rounded-md">
                                <div className="max-w-fit">
                                    <FaCircle className='text-green-400' />
                                </div>
                                <div className="max-w-fit ml-1.5">
                                    <p className='text-black font-semibold'>Available</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-w-fit bg-red-200 flex justify-center items-center p-1.5 rounded-md">
                                <div className="max-w-fit">
                                    <FaCircle className='text-red-400 w-4' />
                                </div>
                                <div className="max-w-fit ml-1.5">
                                    <p className='text-black font-semibold'>Occupied</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-between items-center h-full gap-2">
            <button 
                className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors'
                onClick={() => navigate(`/admin-panel/edit-game/${_id}`)}
            >
                <Pencil className='w-4 h-4' />
            </button>
            <button 
                className='bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleDelete}
                disabled={isDeletingGame}
            >
                {isDeletingGame ? (
                    <Loader className='w-4 h-4 animate-spin' />
                ) : (
                    <Trash className='w-4 h-4' />
                )}
            </button>
        </div>

    </div>
  )
}

export default AdminGamesComponent
