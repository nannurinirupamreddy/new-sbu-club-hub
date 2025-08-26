import { Circle, Pencil, Trash } from 'lucide-react'
import { FaCircle } from "react-icons/fa"
import React, { useState } from 'react'
import EditGamePage from '../EditGamePage'
import { useNavigate } from 'react-router-dom';

function AdminGamesComponent({_id, name, description, availability}) {

    const navigate = useNavigate();

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
                            <div className="max-w-fit bg-gray-200 flex justify-center items-center p-1.5 rounded-md">
                                <div className="max-w-fit">
                                    <Circle className='text-gray-400 w-4' />
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
            <button className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer'><Pencil className='w-4 h-4' onClick={() => navigate(`/admin-panel/edit-game/${_id}`)} /></button>
            <button className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer'><Trash className='w-4 h-4' /></button>
        </div>

    </div>
  )
}

export default AdminGamesComponent
