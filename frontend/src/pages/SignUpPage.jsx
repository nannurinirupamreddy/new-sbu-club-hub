// import React, { useState } from 'react'
// import {Link, Navigate} from 'react-router-dom'
// import useAuthStore from '../../store/useAuthStore'
// import { Eye, EyeOff } from 'lucide-react';
// import toast from 'react-hot-toast';

// function SignUpPage() {
    
//     const {isSigningUp, signup, authUser} = useAuthStore();

//     const [showPassword, setShowPassword] = useState(false);

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         sbuId: "",
//         email: "",
//         password: ""
//     });

//     function validateForm() { 
//         if (!formData.firstName.trim()) return toast.error("First Name is required!");
//         if (!formData.lastName.trim()) return toast.error("Last Name is required!");
//         if (!formData.sbuId.trim()) return toast.error("SBU ID# is required!");
//         if (formData.sbuId.trim().length !== 9) {
//             return toast.error("Please enter a valid 9-digit SBU ID#");
//         }
//         if (!formData.email.trim()) return toast.error("SBU Email is required!");
//         if (!formData.email.trim().endsWith("@stonybrook.edu")) {
//             return toast.error("Please enter a valid SBU Email");
//         }
//         if (!formData.password.trim()) return toast.error("Password is required!");
//         if (formData.password.trim().length < 8) {
//             return toast.error("Password should be at least 8 characters");
//         }
        
//         return true;
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         const validFormat = validateForm();
//         if (validFormat === true) signup(formData);
//     }

//   return (
//     <>
//       <main className='max-w-full h-screen bg-[#a60f16]'>
//         <div className="flex justify-center items-center h-full">
//             <div className="flex-col w-[90%] h-[95%] bg-white rounded-xl md:w-[600px] shadow-md">
//                 <div className="flex justify-center items-center h-[22%] p-4">
//                     <img src="./wolfie-hello.jpg" alt="" className='max-h-full max-w-full object-cover rounded-2xl shadow-md'/>
//                 </div>
//                 <h1 className='text-xl font-bold text-center'>Hello there, Wolfie!</h1>
//                 <div className="h-[50%]">
//                     <form className='p-4' onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="firstName" className='block text-sm font-medium text-gray-600 mb-2'>First Name*</label>
//                             <input type="text" id="firstName" placeholder='Enter your first name' className='w-full p-2 border border-gray-300 rounded-md' value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="lastName" className='block text-sm font-medium text-gray-600 mb-2'>Last Name*</label>
//                             <input type="text" id="lastName" placeholder='Enter your last name' className='w-full p-2 border border-gray-300 rounded-md' value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="sbuId" className='block text-sm font-medium text-gray-600 mb-2'>SBU ID#*</label>
//                             <input type="number" id="sbuId" placeholder='000000000' className='w-full p-2 border border-gray-300 rounded-md' value={formData.sbuId} onChange={(e) => setFormData({...formData, sbuId: e.target.value})}/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="email" className='block text-sm font-medium text-gray-600 mb-2'>SBU Email*</label>
//                             <input type="email" id="email" placeholder='example@stonybrook.edu' className='w-full p-2 border border-gray-300 rounded-md' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
//                         </div>
//                         <div className="mb-3 relative">
//                             <label htmlFor="password" className='block text-sm font-medium text-gray-600 mb-2'>Password*</label>
//                             <input type={showPassword ? "text" : "password"} id="password" placeholder='Enter your password' className='w-full p-2 border border-gray-300 rounded-md' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
//                             <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 right-2 flex items-center top-[30px] cursor-pointer'>
//                                 {showPassword ? <EyeOff /> : <Eye />}
//                             </button>
//                         </div>
//                         <div className="">
//                             <button type='submit' disabled={isSigningUp} className='bg-[#a60f16] text-white w-full rounded-md py-2 cursor-pointer'>{isSigningUp ? ("Signing Up...") : ("Signup")}</button>
//                         </div>
//                     </form>
//                     <div className="text-center">
//                         <p className='text-center'>Already have an account?{" "}
//                             <Link to={"/login"} className='text-[#a60f16] font-semibold hover:underline'>Login</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </main>
//     </>
//   )
// }

// export default SignUpPage


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

    // if (authUser) {
    //     return <Navigate to={"/"}/>
    // }

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
      <main className='max-w-full h-screen bg-[#a60f16]'>
        <div className="flex justify-center items-center h-full">
            <div className="flex-col w-[90%] h-[100%] bg-white rounded-xl md:w-[600px] shadow-md">
                <div className="flex justify-center items-center h-[22%] p-4">
                    <img src="./wolfie-hello.jpg" alt="" className='max-h-full max-w-full object-cover rounded-2xl shadow-md'/>
                </div>
                <h1 className='text-xl font-bold text-center'>Hello there, Wolfie!</h1>
                <div className="h-[50%]">
                    <form className='p-4 flex flex-col justify-around' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className='block text-sm font-medium text-gray-600 mb-2'>First Name*</label>
                            <input type="text" id="firstName" placeholder='Enter your first name' className='w-full p-2 border border-gray-300 rounded-md' value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className='block text-sm font-medium text-gray-600 mb-2'>Last Name*</label>
                            <input type="text" id="lastName" placeholder='Enter your last name' className='w-full p-2 border border-gray-300 rounded-md' value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sbuId" className='block text-sm font-medium text-gray-600 mb-2'>SBU ID#*</label>
                            <input type="number" id="sbuId" placeholder='000000000' className='w-full p-2 border border-gray-300 rounded-md' value={formData.sbuId} onChange={(e) => setFormData({...formData, sbuId: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='block text-sm font-medium text-gray-600 mb-2'>SBU Email*</label>
                            <input type="email" id="email" placeholder='example@stonybrook.edu' className='w-full p-2 border border-gray-300 rounded-md' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="password" className='block text-sm font-medium text-gray-600 mb-2'>Password*</label>
                            <input type={showPassword ? "text" : "password"} id="password" placeholder='Enter your password' className='w-full p-2 border border-gray-300 rounded-md' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 right-2 flex items-center top-[30px] cursor-pointer'>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        <div className="">
                            <button type='submit' disabled={isSigningUp} className='bg-[#a60f16] text-white w-full rounded-md py-2 cursor-pointer'>{isSigningUp ? ("Signing Up...") : ("Signup")}</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className='text-center'>Already have an account?{" "}
                            <Link to={"/login"} className='text-[#a60f16] font-semibold hover:underline'>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default SignUpPage
