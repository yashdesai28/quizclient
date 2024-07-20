import React from 'react'
import lofimg from './img/logo.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from "axios";
import { otpschema } from '../../schema/otp'
import './style1.css'
// import './style.module.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Otppage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(otpschema),
        defaultValues: { otp: '' }
    });

    const [otpEmail, setOtpEmail] = useState("");
    const Alertbox = ({ popo }) => {

        return popo

    }
    const showinweb = sessionStorage.getItem('otpemail');
    console.log("ooooo", showinweb);

    const resendotpemail = (e) => {
        e.preventDefault();

        let otpemail = sessionStorage.getItem('otpemail');

        axios.post('http://localhost:8080/sendotp', {
            email: otpemail,
        }).then((res) => {

            console.log("success resend", res.data.otp);
            let otp = res.data.otp;
            let otpemail1 = otpemail;
            sessionStorage.setItem('otp', otp);
            sessionStorage.setItem('otpemail', otpemail1);
            console.log("success resend")



        }).catch((error) => {
            console.log("error", error, "this is actch");

            Alertbox(Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Not Found",

            }));
        });;

    }

    const onsubmit = (data) => {
        console.log("reg");
        console.log(data);

        console.log(data.otp);


        const userenterotp = data.otp;
        const chekotp = sessionStorage.getItem('otp');
        console.log(chekotp);

        if (userenterotp == chekotp) {
            console.log("otp is match");
            navigate('/forpass');
        }
        else {
            console.log("otp is not match");
        }

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
    }, [])

    const showicon = {
        display: 'block'
    }

    const mar = {
        margin: '0.1rem'
    }

    const resendotp = {
        display: 'inline-block',
        width: '50%',
        height: '43px',
        backgroundColor: '#fff',
        color: '#151111',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '0.8rem',
        fontSize: '0.8rem',
        marginBottom: '2rem',
        transition: '0.3s',
        fontSize: "1.2rem",
        fontWeight: "bolder"
    }

    return (
        <>
            <form action="index.html" autoComplete="off" className="sign-up-form" onSubmit={handleSubmit(onsubmit)}>
                <div className="logo">
                    <img src={lofimg} alt="easyclass" />
                    <h4>easyQuiz</h4>
                </div>
                <div className="heading">
                    <h2>Enter the OTP</h2>
                    <h6>OTP is sent </h6>
                    <a href="#" className="toggle">
                        {showinweb}
                    </a>
                </div>
                <div className="actual-form">
                    <div className="input-wrap">
                        <input
                            type="text"
                            minLength={4}
                            className="input-field"
                            autoComplete="off"
                            required=""
                            name='otp'
                            {...register('otp')}
                        />
                        <label>OTP</label>
                    </div>
                    <div className='relerror'>{errors.otp && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg><p className='showerror'>{errors.otp.message}</p></div>)}</div>

                    <input
                        type="submit"
                        defaultValue="Sign Up"
                        className="sign-btn"
                    />

                    <p className="p-resend" >

                        <button style={resendotp} onClick={resendotpemail} defaultValue="Resend otp">Resend OTP</button>

                    </p>
                </div>
            </form>
        </>
    )
}

export default Otppage