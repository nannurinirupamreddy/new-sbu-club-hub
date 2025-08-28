import React, { useEffect, useState } from 'react'
import NavBarDefault from '../components/NavBarDefault'
import {Link, Navigate} from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import {EyeOff, Eye, Loader} from 'lucide-react'
import toast from 'react-hot-toast'

function LoginPage() {

    const {isLoggingIn, login, authUser} = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function validateForm() {
        if (!formData.email.trim()) return toast.error("Email is required!");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (!formData.email.trim().includes("stonybrook.edu")) return toast.error("Please enter SBU Email!");
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validFormat = validateForm();
        if (validFormat === true) login(formData);
    }

  return (
    <>
      <main className='min-h-screen bg-[#a60f16] flex items-center justify-center p-4'>
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="flex justify-center p-4 bg-gray-50">
                <img 
                    src="/seawolves.png" 
                    alt="Seawolves" 
                    className='h-20 w-20 object-contain'
                />
            </div>
            
            {/* Title */}
            <h1 className='text-xl font-bold text-center py-2 text-gray-800'>Welcome Back, Seawolf!</h1>
            
            {/* Form Section */}
            <div className="p-6">
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent"
                            placeholder="example@stonybrook.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16] focus:border-transparent"
                            placeholder="********"
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
                        type="submit" 
                        disabled={isLoggingIn} 
                        className="w-full bg-[#a60f16] text-white py-2 rounded-md font-medium hover:bg-[#870c12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoggingIn ? "Logging In..." : "Login"}
                    </button>
                </form>
                
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#a60f16] font-semibold hover:underline"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage