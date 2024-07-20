import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auths';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { set } from 'react-hook-form';

const Quizlist = () => {
    const navigate = useNavigate();
    const data = useAuth();
    const { subjectName } = data;

    const [quizlist, setQuizlist] = useState([]);

    const [open, setopen] = useState(false);
    const handleClick = async (id, st, et) => {



        var chek;
        var sid = localStorage.getItem('studentid');
        var qid = id;

        console.log(sid + "===" + qid);


        await axios.post('http://localhost:8080/cheksub', {
            student_id: localStorage.getItem('studentid'),
            quiz_id: id

        }).then((res) => {

            console.log("success", res.data);
            chek = res.data[0]["chek"]

            console.log("success")


        }).catch((error) => {
            console.log("error", error, "this is actch");

        });

        console.log("chek = ", chek);











        if (chek == "submited") {

            setopen(true);

        }
        else {

            console.log('Clicked: handler', id);
            console.log(st);

            const startTimeString = st;
            const endTimeString = et;
            const currentTime = new Date();

            // Parse start time string into a Date object
            const startTime = parseDateString(startTimeString);
            // Parse end time string into a Date object
            const endTime = parseDateString(endTimeString);

            console.log(startTime);

            if (currentTime >= startTime && currentTime <= endTime) {
                // Current time is within the specified range
                console.log("under the time ");
                data.quizid1(id);
                navigate('/showquiz')


            } else {
                console.log("under not  time ");
            }
        }







    };

    // Function to parse date string in the format "DD/MM/YYYY hh:mm A" into a Date object
    const parseDateString = (dateString) => {
        const parts = dateString.split(/[\s/,:]+/);
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JavaScript Date
        const year = parseInt(parts[2], 10);
        let hour = parseInt(parts[3], 10);
        const minute = parseInt(parts[4], 10);
        const meridiem = parts[5].toLowerCase();

        // Adjust hour for PM
        if (meridiem === 'pm' && hour < 12) {
            hour += 12;
        }

        return new Date(year, month, day, hour, minute);
    };












    useEffect(() => {
        const fetchQuizlist = async () => {
            try {
                const response = await axios.post('http://localhost:8080/showlistquiz', {
                    id: data.subid,
                });
                console.log("success", response.data.Quizzes);
                setQuizlist(response.data.Quizzes);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchQuizlist();
    }, [data.subid]); // Add data.subid as a dependency to useEffect

    return (
        <>

{  open ? <Alert severity="error" onClose={() => {setopen(false)}}>
  This quiz is already submited.
</Alert>:<></>}

            <h1>{subjectName}</h1>
            <div className="wrapper">
                {quizlist.map((quizlist) => (
                    <div className="card" key={quizlist._id} data-value={quizlist._id} onClick={() => handleClick(quizlist._id, quizlist.start_time, quizlist.end_time)}>
                        <div className="space"></div>
                        <div className="sec">
                            <h3 className="card-title">Quiz Name: {quizlist.quiz_name}</h3>
                            <p className="card-content">Start Time: {quizlist.start_time}</p>
                            <p className="card-content">End Time: {quizlist.end_time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Quizlist;
