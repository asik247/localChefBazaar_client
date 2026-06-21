import React from 'react';
import loginImg from '../../assets/login2.jpg'
import { useForm } from 'react-hook-form';
const Login = () => {
    // ? react hook form;
    const { register, handleSubmit,formState:{errors} } = useForm()
    //! handler login;
    const handlerLogin = (data) => {
        console.log('email-password', data.email, data.password);
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col-reverse md:flex-row  rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                {/* Left side - Image */}
                <div className="flex-1 relative min-h-[220px] md:min-h-0">
                    <img
                        src={loginImg}
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
                        <p className="text-sm opacity-85">LogIn your account and start your journey today.</p>
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
                        <span className="text-base font-medium text-gray-800">LogIn Account</span>
                    </div>
                    {/* text here */}
                    <h1 className="text-2xl font-medium text-gray-900 mb-1">LogIn</h1>
                    <p className="text-sm text-gray-500 mb-6">Fill in your details to get started.</p>

                    <form onSubmit={handleSubmit(handlerLogin)}>
                        <fieldset className="flex flex-col gap-3">
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
                            {/* Password */}
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
                            </div>
                             {/* forgot password */}
                                 <div><a className="link link-hover">Forgot password?</a></div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg text-white text-sm font-medium mt-2 transition-all duration-200 hover:opacity-90 active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #534AB7, #1D9E75)' }}
                            >
                                Login
                            </button>
                        </fieldset>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        New to our website?{' '}
                        <a href="/auth/registation" className="text-indigo-600 font-medium hover:underline">Registation</a>
                    </p>

                </div>
            </div>
        </div>


    );
};

export default Login;