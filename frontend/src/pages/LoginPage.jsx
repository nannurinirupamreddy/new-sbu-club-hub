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
      <main className='max-w-full h-screen bg-[#a60f16]'>
        <div className="h-full flex justify-center items-center">
            <div className="flex bg-white rounded-xl w-[90%] h-[80%] md:w-[600px] shadow-md">
                <div className="flex-col justify-center items-center w-[100%]">
                    <div className="flex justify-center h-[40%]">
                        <img src="./seawolves.png" alt="Seawolves" className='h-[100%]'/>
                    </div>
                    <h1 className='text-xl font-bold text-center'>Welcome Back, Seawolf!</h1>
                    <form onSubmit={handleSubmit} className='p-4'>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                            <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="example@stonybrook.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                            <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 right-2 flex items-center top-[30px] cursor-pointer'>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        <button type="submit" disabled={isLoggingIn} className="w-full bg-[#a60f16] text-white py-2 rounded-md cursor-pointer">
                            {isLoggingIn ? <>
                                Logging In...
                            </> : ( "Login" )}
                        </button>
                    </form>
                    <div className="text-center mt-6">
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
        </div>
      </main>
    </>
  )
//         return (
//     <main className="max-w-full min-h-screen bg-[#a60f16] flex justify-center items-center px-4">
//       <div className="flex flex-col bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
//         <div className="flex justify-center mb-6">
//           <img
//             src="./seawolves.png"
//             alt="Seawolves"
//             className="h-24 md:h-32 object-contain"
//           />
//         </div>

//         <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
//           Welcome Back, Seawolf!
//         </h1>
        
//         <form className="space-y-5">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-600 mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16]"
//               placeholder="example@stonybrook.edu"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-600 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a60f16]"
//               placeholder="********"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#a60f16] text-white py-3 rounded-md hover:bg-[#870c12] transition-colors duration-200 font-medium cursor-pointer"
//           >
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-[#a60f16] font-semibold hover:underline"
//             >
//               Signup
//             </Link>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
}

export default LoginPage