import React from 'react'
import './card1.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../Auths';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Homepage() {

    const navigate = useNavigate();
    const [subject, setsubject] = useState([]);
    const auth = useAuth();

    const handleClick = (id, subject_name) => {

        







        console.log('Clicked: handler', id, "subject id", subject_name);
        auth.subjectid1(id,subject_name)
        navigate('/listquiz')
        // Handle click logic here
    };
    useEffect(() => {

        axios.post('http://localhost:8080/showsubject', {
            id: localStorage.getItem('studentid'),
        }).then((res) => {

            console.log("success", res.data);
            setsubject(res.data);
            console.log(subject[0]);
            console.log("success")


        }).catch((error) => {
            console.log("error", error, "this is actch");

        });




        let count = 0;

        const handleClick = (event) => {

            count++;
        };
        const cardColors = ['#8371fd', '#02b875', '#ff8c6b']; // Predefined set of colors
        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach((cardElement, index) => {
            const randomColor = cardColors[index % cardColors.length]; // Get color from predefined set
            cardElement.style.backgroundColor = randomColor;
            cardElement.addEventListener('click', handleClick);
        });

        return () => {
            // Cleanup: Remove event listeners when component unmounts
            cardElements.forEach((cardElement) => {
                cardElement.removeEventListener('click', handleClick);
            });
        };
    }, []);
    return (

        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="./card.css" />
            <title>Document</title>
            <h1 style={{ marginTop: "3rem" }}> your Subjects</h1>
            <div className="wrapper">
                {subject.map((sub) => {
                    return <div className="card" key={sub._id} data-value={`${sub._id},${sub.subject_name}`} onClick={() => handleClick(sub._id, sub.subject_name)}>
                        <div className="space"></div>
                        <div className="sec">
                            <h3 className="card-title">{sub.subject_name}</h3>
                            <p className="card-content">subject_code:{sub.subject_code}</p>
                        </div>
                    </div>
                })}



            </div>
        </>

    )
}

export default Homepage