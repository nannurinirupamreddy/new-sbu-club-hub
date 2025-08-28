import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

function SignUpPage() {
    
    const {isSigningUp, signup, authUser} = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        sbuId: "",
        email: "",
        password: ""
    });

    function validateForm() { 
        if (!formData.firstName.trim()) return toast.error("First Name is required!");
        if (!formData.lastName.trim()) return toast.error("Last Name is required!");
        if (!formData.sbuId.trim()) return toast.error("SBU ID# is required!");
        if (formData.sbuId.trim().length !== 9) {
            return toast.error("Please enter a valid 9-digit SBU ID#");
        }
        if (!formData.email.trim()) return toast.error("SBU Email is required!");
        if (!formData.email.trim().endsWith("@stonybrook.edu")) {
            return toast.error("Please enter a valid SBU Email");
        }
        if (!formData.password.trim()) return toast.error("Password is required!");
        if (formData.password.trim().length < 8) {
            return toast.error("Password should be at least 8 characters");
        }
        
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validFormat = validateForm();
        if (validFormat === true) signup(formData);
    }

  return (
    <>
      <main className='min-h-screen bg-[#a60f16] flex items-center justify-center p-4'>
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="flex justify-center p-4 bg-gray-50">
                <img 
                    src="/wolfie-hello.jpg" 
                    alt="Wolfie Hello" 
                    className='h-20 w-20 object-cover rounded-full shadow-md'
                />
            </div>
            
            {/* Title */}
            <h1 className='text-xl font-bold text-center py-2 text-gray-800'>Hello there, Wolfie!</h1>
            
            {/* Form Section */}
            <div className="p-6">
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className='block text-sm font-medium text-gray-600 mb-1'>First Name*</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            placeholder='Enter your first name' 
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent' 
                            value={formData.firstName} 
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="lastName" className='block text-sm font-medium text-gray-600 mb-1'>Last Name*</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            placeholder='Enter your last name' 
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent' 
                            value={formData.lastName} 
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="sbuId" className='block text-sm font-medium text-gray-600 mb-1'>SBU ID#*</label>
                        <input 
                            type="number" 
                            id="sbuId" 
                            placeholder='000000000' 
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent' 
                            value={formData.sbuId} 
                            onChange={(e) => setFormData({...formData, sbuId: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-600 mb-1'>SBU Email*</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='example@stonybrook.edu' 
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent' 
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    
                    <div className="relative">
                        <label htmlFor="password" className='block text-sm font-medium text-gray-600 mb-1'>Password*</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            placeholder='Enter your password' 
                            className='w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent' 
                            value={formData.password} 
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className='absolute right-2 top-7 text-gray-500 hover:text-gray-700'
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    
                    <button 
                        type='submit' 
                        disabled={isSigningUp} 
                        className='bg-[#a60f16] text-white w-full rounded-md py-2 font-medium hover:bg-[#870c12] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSigningUp ? "Signing Up..." : "Signup"}
                    </button>
                </form>
                
                <div className="text-center mt-4">
                    <p className='text-sm text-gray-600'>Already have an account?{" "}
                        <Link to={"/login"} className='text-[#a60f16] font-semibold hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default SignUpPage
