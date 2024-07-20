import * as React from 'react';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import lofimg from './img/logo.png'
import img1 from './img/image1.png'
import img2 from './img/image2.png'
import img3 from './img/image3.png'
import { emailschema } from '../../schema/email';
import './style1.css'
// import './style.module.css'
import Swal from 'sweetalert2'
import Otppage from './Otppage';
import { Forgetpss_schema } from '../../schema/fogetpassword';
import { useNavigate } from 'react-router-dom';


const Forgetpass = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Forgetpss_schema),
        defaultValues: { password: '', confirm_password: '' }
    });
    const Alertbox = ({ popo }) => {

        return popo

    }



    const onSubmit = (data) => {
        console.log("forgetpassword");
        console.log(data);

        let session_email = sessionStorage.getItem('otpemail');
        console.log(session_email);
        if (session_email) {

            axios.post('http://localhost:8080/fogotpassword', {
                email: session_email,
                password: data.password,
                chpassword: data.confirm_password
            }).then((res) => {

                console.log("success", res.data.up.modifiedCount);
                if (res.data.up.modifiedCount > 0) {
                    navigate('/login');
                }
                console.log("success")


            }).catch((error) => {
                console.log("error", error, "this is actch");

                Alertbox(Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Not Found",

                }));
            });
        }


        reset();
    };






    useEffect(() => {

        const inputs = document.querySelectorAll('.input-field')
        const toggleBtns = document.querySelectorAll('.toggle')
        const main = document.querySelector('main')
        const bullets = document.querySelectorAll('.bullets span')
        const images = document.querySelectorAll('.image')

        inputs.forEach(inp => {
            inp.addEventListener('focus', () => {
                inp.classList.add('active')
            })
            inp.addEventListener('blur', () => {
                if (inp.value !== '') return
                inp.classList.remove('active')
            })
        })

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                main.classList.toggle('sign-up-mode')
                console.log('co')
            })
        })

        function moveSlider() {
            let index = this.dataset.value

            let currentImage = document.querySelector(`.img-${index}`)
            images.forEach(img => img.classList.remove('show'))
            currentImage.classList.add('show')

            const textSlider = document.querySelector('.text-group')
            textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`

            bullets.forEach(bull => bull.classList.remove('active'))
            this.classList.add('active')
        }

        bullets.forEach(bullet => {
            bullet.addEventListener('click', moveSlider)
        })

        // Cleanup event listeners when component unmounts
        return () => {
            inputs.forEach(inp => {
                inp.removeEventListener('focus', () => { })
                inp.removeEventListener('blur', () => { })
            })

            toggleBtns.forEach(btn => {
                btn.removeEventListener('click', () => { })
            })

            toggleBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    main.classList.toggle('sign-up-mode')
                    console.log('co')
                })
            })

            bullets.forEach(bullet => {
                bullet.removeEventListener('click', moveSlider)
            })
        }
    }, []);


    const showicon = {
        display: 'block'
    }

    const mar = {
        margin: '0.1rem'
    }



    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Sign in &amp; Sign up Form</title>
            <link rel="stylesheet" href="style.css" />
            <main>
                <div className="box">
                    <div className="inner-box">
                        <div className="forms-wrap">
                            <form action="index.html" autoComplete="off" className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="logo">
                                    <img src={lofimg} alt="easyclass" />
                                    <h4>easyquiz</h4>
                                </div>
                                <div className="heading">
                                    <h2 style={{ fontSize: '2rem' }}>Reset Password</h2>

                                </div>
                                <div className="actual-form">
                                    <div className="input-wrap">
                                        <input
                                            type="password"
                                            minLength={4}
                                            className="input-field"
                                            autoComplete="off"
                                            required=""
                                            name='password'

                                            {...register('password')}
                                        />
                                        <label>Password</label>
                                    </div>

                                    <div className='relerror'>{errors.password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg><p className='showerror'>{errors.password.message}</p></div>)}</div>

                                    <div className="input-wrap">
                                        <input
                                            type="password"
                                            minLength={4}
                                            className="input-field"
                                            autoComplete="off"
                                            required=""
                                            name='confirm_password'

                                            {...register('confirm_password')}
                                        />
                                        <label>Confirm Password</label>
                                    </div>
                                    <div className='relerror'>{errors.confirm_password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg><p className='showerror'>{errors.confirm_password.message}</p></div>)}</div>
                                    <input
                                        type="submit"
                                        defaultValue="Sign In"
                                        className="sign-btn"
                                    />

                                </div>
                            </form>

                        </div>
                        <div className="carousel">
                            <div className="images-wrapper">
                                <img src={img1} className="image img-1 show" alt="" />
                                <img src={img2} className="image img-2" alt="" />
                                <img src={img3} className="image img-3" alt="" />
                            </div>
                            <div className="text-slider">
                                <div className="text-wrap">
                                    <div className="text-group">
                                        <h2>Create your own Quiz</h2>
                                        <h2>Customize as you like</h2>
                                        <h2>Invite students to your Quiz</h2>
                                    </div>
                                </div>
                                <div className="bullets">
                                    <span className="active" data-value={1} />
                                    <span data-value={2} />
                                    <span data-value={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Javascript file */}
        </>

    )
}

export default Forgetpass