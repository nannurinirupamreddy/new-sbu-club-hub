import { Circle } from 'lucide-react'
import { FaCircle } from "react-icons/fa"
import React from 'react'

function GamesComponent({name, description, availability}) {
  return (
    <div className='bg-white w-[90%] sm:w-[600px] max-h-fit p-4 rounded-xl m-4'>
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
                            <Circle className='bg-red-400 w-4' />
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
  )
}

export default GamesComponent
