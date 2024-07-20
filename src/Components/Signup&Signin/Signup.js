import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import lofimg from './img/logo.png'
import img1 from './img/image1.png'
import img2 from './img/image2.png'
import img3 from './img/image3.png'
import { loginschema } from '../../schema/login';
import './app'
import Registration from '../Signup&Signin/Registration'
import stye from './style1.css'
// import style from './style.module.css'
import { useAlert } from "react-alert";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useAuth } from '../Auths';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(loginschema),
    defaultValues: { email: '', password: '' }
  });





  console.log("errors", errors);
  function handle(e) {
    e.preventDefault();


    console.log('Signup');
  }

  function handechange(e) {
    console.log(e.target.value);

  }

  const onSubmit = (data) => {
    console.log("reg");
    console.log(data);

    axios.post('http://localhost:8080/login', {
      email: data.email,
      password: data.password,
    }).then((res) => {

      console.log("success", res.data[0]._id);


      if (res.status === 200 && res.data[0].user_role === "Student") {

        localStorage.setItem('userid', res.data[0]._id);
        localStorage.setItem('userrole', res.data[0].user_role);
        localStorage.setItem('useremail', res.data[0].user_email);
        localStorage.setItem('studentid', res.data[0].roles_id[0]._id);
        auth.login(res.data[0]._id);
        console.log("inside if");
        navigate('/home');


      }
      else{
        console.log("inside else");
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

    // reset();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Print the token in the console
    console.log('Token:', token);

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

  const Alertbox = ({ popo }) => {

    return popo

  }

  return (
    <div>
      <main>
        <div className='box'>
          <div className='inner-box'>
            <div className='forms-wrap'>
              <form
                action='index.html'
                autoComplete='off'
                className='sign-in-form loginform'
                onSubmit={handleSubmit(onSubmit)}

              >
                <div className='logo'>
                  <img src={lofimg} alt='easyclass' />
                  <h4>easyQuiz</h4>
                </div>
                <div className='heading'>
                  <h2>Welcome Back</h2>
                  <h6>Not registred yet?</h6>
                  <a href='#' className='toggle'>
                    Sign up
                  </a>
                </div>
                <div className='actual-form'>
                  <div className='input-wrap'>
                    <input
                      type='text'
                      className='input-field'
                      autoComplete='off'
                      required=''
                      name='email'

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

                  <button
                    type='submit'
                    defaultValue='Sign In'
                    className='sign-btn'
                  >submit</button>

                  <p className='text'>
                    <Link to='/sendemail'>Forgotten your password? </Link>
                  </p>
                </div>
              </form>

              <Registration />
            </div>
            <div className='carousel'>
              <div className='images-wrapper'>
                <img src={img1} className='image img-1 show' alt='' />
                <img src={img2} className='image img-2' alt='' />
                <img src={img3} className='image img-3' alt='' />
              </div>
              <div className='text-slider'>
                <div className='text-wrap'>
                  <div className='text-group'>
                    <h2>Create your own Quiz</h2>
                    <h2>Customize as you like</h2>
                    <h2>Invite students to your Quiz</h2>
                  </div>
                </div>
                <div className='bullets'>
                  <span className='active' data-value={1} />
                  <span data-value={2} />
                  <span data-value={3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Alertbox />
    </div>
  )
}

export default Signup
