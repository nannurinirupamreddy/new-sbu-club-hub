import React, { useEffect, useState } from 'react'
import NavBarLoggedIn from '../components/NavBarLoggedIn'
import useAuthStore from '../../store/useAuthStore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useGamesStore from '../../store/useGamesStore';
import { ArrowLeft } from 'lucide-react';

function EditGamePage() {

  const { gameToEdit, getGameToEdit, editGame } = useGamesStore();

  useEffect(() => {
    getGameToEdit(_id);
  }, [getGameToEdit]);

  const [formData, setFormData] = useState({
    name: gameToEdit ? gameToEdit.name : "",
    description: gameToEdit ? gameToEdit.description : "",
    availability: gameToEdit ? gameToEdit.availability : true
  });

  const navigate = useNavigate();

  const {_id} = useParams();

  const {authUser} = useAuthStore();

  if (!authUser || !authUser.admin) {
      return <Navigate to={"/"} />
  }

  function handleSubmit(e) {
    e.preventDefault();
    editGame(_id, formData, navigate);
  }

  return (
    <>
      <NavBarLoggedIn />
      <div className='w-full max-w-full h-screen'>
        <div className="w-full max-w-full h-fit p-4 flex justify-start items-center">
          <button className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer' onClick={() => navigate(-1)}><ArrowLeft className='w-4 h-4' /></button>
        </div>
        <div className="flex-col gap-6 ">
          <form>
            <div className="flex flex-col justify-start items-start w-[90%] sm:w-[600px] m-auto">
              <div className="font-bold text-3xl mb-4">
                <h2>Edit Game</h2>
              </div>
              <div className="w-full mb-4">
                <label className='font-semibold text-lg'>Game Name</label>
                <input type="text" placeholder='Enter game name' className='w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary' onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
              </div>
              <div className="w-full mb-4">
                <label className='font-semibold text-lg'>Description</label>
                <textarea placeholder='Enter game description' className='w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary' rows={4} onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description}></textarea>
              </div>
              <div className="w-full mb-4">
                <label className='font-semibold text-lg'>Availability</label>
                <select className='w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary' onChange={(e) =>setFormData({ ...formData, availability: e.target.value === "true" })} value={String(formData.availability)}>
                  <option value={true}>Available</option>
                  <option value={false}>Occupied</option>
                </select>
              </div>
              <div className="w-full flex justify-end items-center">
                <button type="submit" className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer' onClick={handleSubmit}>Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditGamePage