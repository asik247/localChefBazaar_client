import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import registerImg from '../../assets/login1.jpg';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';
import useInstance from '../../Hooks/useInstance';
import Swal from 'sweetalert2';
import { type } from 'firebase/firestore/pipelines';
const Registration = () => {
    const instance = useInstance()
    //? register info get authprovider;
    const { createUser, user, verifyEmail, updateUser } = useContext(AuthContext);
    // console.log('currentUser', user);
    // ? react hook form;
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    //! my handler with register;
    const handlerRegistation = (data) => {
        //? user img customise with imagebb;
        const userImg = data.photo[0];
        //Todo create user funk;
        createUser(data.email, data.password)
            .then(res => {
                // ? email verify;
                verifyEmail()
                //! Register success swal;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your account has been created!",
                    text: "A verification link has been sent to your email. Please verify your email before logging in.",
                    showConfirmButton: false,
                    timer: 2000
                });

                //Todo file transfer formData formate;
                const formData = new FormData();
                formData.append('image', userImg)
                //? api create;
                const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imabb_key}`
                //! post then get url;
                axios.post(image_api_url, formData)
                    .then(res => {
                        // console.log(res.data.data.url);
                        //? user info;
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        //! post register user info in users coll;
                        instance.post('/users', userInfo)
                            .then(res => {
                                console.log(res.data);
                            })

                        //Todo updateProfile code start;
                        const updateProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        updateUser(updateProfile)
                            .then(() => {
                                // console.log('updateProfile successfully');
                            }).catch(err => {
                                console.log(err.message);
                            })
                        //Todo updateProfile code end;
                    })

                console.log(res.user);
            }).catch(() => {
                setError('root', {
                    type: 'maniul',
                    message: 'Registration failed!'
                })
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col-reverse md:flex-row rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                {/* Left side - Image */}
                <div className="flex-1 relative min-h-[220px] md:min-h-0">
                    <img
                        src={registerImg}
                        alt="Registration"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, rgba(83,74,183,0.55) 0%, rgba(29,158,117,0.4) 100%)' }}
                    />
                    {/* Overlay text */}
                    <div className="absolute bottom-8 left-6 right-6 text-white">
                        <h2 className="text-2xl font-medium mb-1">Welcome aboard</h2>
                        <p className="text-sm opacity-85">Create your account and start your journey today.</p>
                    </div>
                </div>
                {/* Right side - Form */}
                <div className="flex-1 flex flex-col justify-center px-8 py-10">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                            style={{ background: 'linear-gradient(135deg, #534AB7, #1D9E75)' }}>
                            ✦
                        </div>
                        <span className="text-base font-medium text-gray-800">Create Account</span>
                    </div>
                    {/* text here */}
                    <h1 className="text-2xl font-medium text-gray-900 mb-1">Registration</h1>
                    <p className="text-sm text-gray-500 mb-6">Fill in your details to get started.</p>

                    <form onSubmit={handleSubmit(handlerRegistation)}>
                        <fieldset className="flex flex-col gap-3">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Name
                                </label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    type="text"
                                    placeholder="Your full name"
                                    className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 outline-none transition-all duration-200"
                                    style={{ background: 'rgba(127,119,221,0.06)', border: '0.5px solid rgba(127,119,221,0.3)' }}
                                    onFocus={e => {
                                        e.target.style.background = 'rgba(127,119,221,0.12)';
                                        e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.background = 'rgba(127,119,221,0.06)';
                                        e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                            </div>
                            {/* Photo URL */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Photo URL
                                </label>
                                <input
                                    {...register('photo')}
                                    type="file"
                                    className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 outline-none transition-all duration-200"
                                    style={{ background: 'rgba(127,119,221,0.06)', border: '0.5px solid rgba(127,119,221,0.3)' }}
                                    onFocus={e => {
                                        e.target.style.background = 'rgba(127,119,221,0.12)';
                                        e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.background = 'rgba(127,119,221,0.06)';
                                        e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Email
                                </label>
                                <input
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 outline-none transition-all duration-200"
                                    style={{ background: 'rgba(127,119,221,0.06)', border: '0.5px solid rgba(127,119,221,0.3)' }}
                                    onFocus={e => {
                                        e.target.style.background = 'rgba(127,119,221,0.12)';
                                        e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.background = 'rgba(127,119,221,0.06)';
                                        e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                            </div>
                            {/* Password + Confirm - side by side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Password */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Password
                                    </label>
                                    <input
                                        {...register('password', {
                                            required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }, pattern: {
                                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                                message: 'Must have 1 uppercase & 1 special character (!@#$%^&*)'
                                            }
                                        })}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 outline-none transition-all duration-200"
                                        style={{ background: 'rgba(127,119,221,0.06)', border: '0.5px solid rgba(127,119,221,0.3)' }}
                                        onFocus={e => {
                                            e.target.style.background = 'rgba(127,119,221,0.12)';
                                            e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                                        }}
                                        onBlur={e => {
                                            e.target.style.background = 'rgba(127,119,221,0.06)';
                                            e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                                </div>
                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        {...register('confirmPassword', {
                                            required: 'Please confirm password', minLength: { value: 6, message: 'Password must be at least 6 characters' }, pattern: {
                                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                                message: 'Must have 1 uppercase & 1 special character (!@#$%^&*)'
                                            }
                                        })}
                                        type="password"
                                        placeholder="Confirm password"
                                        className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 outline-none transition-all duration-200"
                                        style={{ background: 'rgba(127,119,221,0.06)', border: '0.5px solid rgba(127,119,221,0.3)' }}
                                        onFocus={e => {
                                            e.target.style.background = 'rgba(127,119,221,0.12)';
                                            e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                                        }}
                                        onBlur={e => {
                                            e.target.style.background = 'rgba(127,119,221,0.06)';
                                            e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg text-white text-sm font-medium mt-2 transition-all duration-200 hover:opacity-90 active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #534AB7, #1D9E75)' }}
                            >
                                Register
                            </button>
                        </fieldset>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{' '}
                        <a href="/auth" className="text-indigo-600 font-medium hover:underline">Sign in</a>
                    </p>
                    {/* Register Faield error message showing ui */}
                    <div>
                        {
                            errors.root && <p className='text-red-500 text-xl'>{errors.root.message}</p>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Registration;