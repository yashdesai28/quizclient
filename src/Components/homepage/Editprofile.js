import './edit.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { editstudentschema } from '../../schema/editstudent'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(editstudentschema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('studentid');
                const response = await axios.post('http://localhost:8080/showstudent', { id });
                const data = response.data[0];
                setValue('name', data.student_name);
                setValue('email', data.student_email);
                setValue('enrollment_number', data.student_enrollment_number);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setValue]);

    const onSubmit = (data) => {
        console.log(data);
        const id = localStorage.getItem('studentid');


        axios.post('http://localhost:8080/edpro', {

            name: data.name,
            email: data.email,
            enrollment_number: data.enrollment_number,
            id: id


        }).then((res) => {

            if (res.status === 200) {
                console.log("success", res);

                console.log("success===========")

            }


        }).catch((error) => {
            console.log("error", error);
        });

    };

    const showicon = {
        display: 'block'
    }

    const mar = {
        margin: '0.1rem'
    }


    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link rel="stylesheet" href="../assets/css/s.css" />
            <form className="container" onSubmit={handleSubmit(onSubmit)} >
                <div className="container">
                    <h1 className="title"> profile</h1>
                    <div className="grid">
                        <div className="form-group a">
                            <label htmlFor="name">Student Name</label>
                            <input id="name" type="text"  {...register('name')} />
                            <div className='relerror'>{errors.name && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg><p className='showerror'>{errors.name.message}</p></div>)}</div>
                        </div>
                        <div className="form-group b">
                            <label htmlFor="first-name">Student Email</label>
                            <input id="first-name" type="text"  {...register('email')} />
                            <div className='relerror'>{errors.email && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg><p className='showerror'>{errors.email.message}</p></div>)}</div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="address">Student Enrollment number</label>
                            <input id="address" type="text"    {...register('enrollment_number')} />
                            <div className='relerror'>{errors.enrollment_number && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg><p className='showerror'>{errors.enrollment_number.message}</p></div>)}</div>
                        </div>

                    </div>

                    <div className="button-container">
                        <button className="button">Update</button>
                    </div>
                </div>
            </form>
        </>

    )
}

export default Editprofile