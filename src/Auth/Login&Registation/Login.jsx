import React from 'react';
import loginImg from '../../assets/login2.jpg'
import { useForm } from 'react-hook-form';
const Login = () => {
    // ? react hook form;
    const { register, handleSubmit } = useForm()
    //! handler login;
    const handlerLogin = (data) => {
        console.log('email-password',data.email , data.password);
    }
    return (
        <div className='mt-15 flex flex-col-reverse md:flex-row justify-between items-center'>
            {/* left side img */}
            <div className='flex-1'>
                <img src={loginImg} alt="login img" />
            </div>
            {/* right side form */}
            <div className="card-body flex-1">
                <form onSubmit={handleSubmit(handlerLogin)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input {...register('email')} type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input {...register('password')} type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
            </div>
        </div>


    );
};

export default Login;