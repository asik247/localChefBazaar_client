import React from 'react';
import { useForm } from 'react-hook-form';
import registerImg from '../../assets/login1.jpg'
const Registation = () => {
    //? react hook form;
    const { register, handleSubmit, formState: { errors } } = useForm();
    //! my register handler;
    const handlerRegistation = (data) => {
        console.log('all info for register user', data.name, data.photo, data.email, data.password, data.confarmPass);
    }
    return (
        <div className='mt-15 flex flex-col-reverse md:flex-row justify-between items-center'>
            {/* left side img */}
            <div className='flex-1'>
                <img src={registerImg} alt="login img" />
            </div>
            {/* right side form */}
            <div className="card-body flex-1">
                <form onSubmit={handleSubmit(handlerRegistation)}>
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

export default Registation;