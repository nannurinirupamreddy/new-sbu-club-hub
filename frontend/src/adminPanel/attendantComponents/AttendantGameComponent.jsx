import React, { useState } from 'react'
import { FaCircle } from 'react-icons/fa'
import useGamesStore from '../../../store/useGamesStore'
import toast from 'react-hot-toast'

function AttendantGameComponent({_id, name, description, availability, numberOfControllers, controllersInUse, studentWillingToShare}) {

    const { editGame } = useGamesStore();
    
    const [formData, setFormData] = useState({
        availability: availability,
        controllersInUse: controllersInUse || 0,
        studentWillingToShare: studentWillingToShare || false
    });
    
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        
        try {
            await editGame(_id, formData);
            toast.success("Game updated successfully!");
        } catch (error) {
            toast.error("Failed to update game");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleAvailabilityChange = (value) => {
        const newAvailability = value === "true";
        setFormData({
            ...formData,
            availability: newAvailability,
            // Reset controllersInUse and studentWillingToShare when setting to available
            controllersInUse: newAvailability ? 0 : formData.controllersInUse,
            studentWillingToShare: newAvailability ? false : formData.studentWillingToShare
        });
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
            <div className="text-sm text-gray-600 mt-1">
                <p>Total Controllers: {numberOfControllers || 1}</p>
            </div>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className="w-full mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select 
                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary' 
                        onChange={(e) => handleAvailabilityChange(e.target.value)} 
                        value={String(formData.availability)}
                    >
                        <option value="true">Available</option>
                        <option value="false">Occupied</option>
                    </select>
                </div>
                
                {!formData.availability && (
                    <div className='w-full mb-3'>
                        <label htmlFor="controllers" className="block text-sm font-medium text-gray-700 mb-1">
                            Number of controllers being used? (Max: {numberOfControllers || 1})
                        </label>
                        <input 
                            type="number" 
                            id="controllers" 
                            min="0" 
                            max={numberOfControllers || 1}
                            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary' 
                            value={formData.controllersInUse}
                            onChange={(e) => setFormData({...formData, controllersInUse: parseInt(e.target.value) || 0})}
                        />
                    </div>
                )}
                
                {!formData.availability && (
                    <div className='w-full mb-3'>
                        <label htmlFor="willingToShare" className="block text-sm font-medium text-gray-700 mb-1">
                            Is student willing to share?
                        </label>
                        <select 
                            id="willingToShare" 
                            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary'
                            value={String(formData.studentWillingToShare)}
                            onChange={(e) => setFormData({...formData, studentWillingToShare: e.target.value === "true"})}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                )}
                
                <div className="w-full flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isUpdating}
                        className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isUpdating ? "Updating..." : "Update Game"}
                    </button>
                </div>
            </form>
            {/* <div className="mt-2">
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
            </div> */}
        </div>
        {/* <div className="flex flex-col justify-between items-center h-full gap-2">
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
        </div> */}

    </div>
  )
}

export default AttendantGameComponent
