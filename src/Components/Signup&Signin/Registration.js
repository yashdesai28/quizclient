import React from 'react'
import lofimg from './img/logo.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from "axios";
import { Signupschema } from '../../schema/signup'
import './style1.css'
// import style from './style.module.css'
const Registration = () => {
    const { register, handleSubmit,formState: { errors } } = useForm({
        resolver: yupResolver(Signupschema),
        defaultValues: { name: '', email: '', enrollment_number: '', password: '', confirm_password: '' }
    });

    console.log(errors);

    const onsubmit = (data) => {
        console.log("reg");
        console.log(data);


        axios.post('http://localhost:8080/sreg', {

            name: data.name,
            email:data.email,
            eno:data.enrollment_number,
            password: data.password,
            chpassword:data.confirm_password
            

        }).then((res) => {

            if(res.status===200){
                console.log("success", res);
                const main = document.querySelector('main');
                main.classList.toggle('sign-up-mode');
        
                console.log("success===========")
                
            }


        }).catch((error) => {
            console.log("error", error);
        });

        // reset();

    };

    const showicon = {
        display: 'block'
    }

    const mar = {
        margin: '0.1rem'
    }

    return (
        <>
            <form
                action='index.html'
                autoComplete='off'
                className='sign-up-form'
                onSubmit={handleSubmit(onsubmit)}
            >
                <div className='logo'>
                    <img src={lofimg} alt='easyclass' />
                    <h4>easyQuiz</h4>
                </div>
                <div className='heading'>
                    <h2>Get Started</h2>
                    <h6>Already have an account?</h6>
                    <a href='#' className='toggle'>
                        Sign in
                    </a>
                </div>
                <div className='actual-form'>
                    <div className='input-wrap'>
                        <input
                            type='text'
                            minLength={4}
                            className='input-field'
                            autoComplete='off'
                            required=''
                            {...register('name')}
                        />
                        <label className='label1'>Name</label>
                    </div>
                    <div className='relerror'>{errors.name && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg><p className='showerror'>{errors.name.message}</p></div>)}</div>
                    <div className='input-wrap'>
                        <input
                            type='number'
                            minLength={4}
                            className='input-field'
                            autoComplete='off'
                            required=''
                            {...register('enrollment_number')}
                        />
                        <label className='label1'>enrollment number</label>

                    </div>
                    <div className='relerror'>{errors.enrollment_number && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg><p className='showerror'>{errors.enrollment_number.message}</p></div>)}</div>
                    <div className='input-wrap'>
                        <input
                            type='email'
                            className='input-field'
                            autoComplete='off'
                            required=''
                            {...register('email')}
                        />
                        <label className='label1'>Email</label>
                    </div>
                    <div className='relerror'>{errors.email && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg><p className='showerror'>{errors.email.message}</p></div>)}</div>
                    <div className='input-wrap'>
                        <input
                            type='password'
                            minLength={4}
                            className='input-field'
                            autoComplete='off'
                            required=''
                            {...register('password')}
                        />
                        <label className='label1'>Password</label>
                    </div>
                    <div className='relerror'>{errors.password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg><p className='showerror'>{errors.password.message}</p></div>)}</div>
                    <div className='input-wrap'>
                        <input
                            type='password'
                            minLength={4}
                            className='input-field'
                            autoComplete='off'
                            required=''
                            {...register('confirm_password')}
                        />
                        <label className='label1'>confirm password</label>
                    </div>
                    <div className='relerror'>{errors.confirm_password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg><p className='showerror'>{errors.confirm_password.message}</p></div>)}</div>
                    <input
                        type='submit'
                        defaultValue='Sign Up'
                        className='sign-btn'

                    />
                    <p className='text'>
                        By signing up, I agree to the
                        <a href='#'>Terms of Services</a> and
                        <a href='#'>Privacy Policy</a>
                    </p>
                </div>
            </form>
        </>
    )
}

export default Registration