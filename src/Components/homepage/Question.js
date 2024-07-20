import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';
import { useAuth } from '../Auths';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addData } from '../Action';
import { persistor } from '../store';
import { useSelector } from 'react-redux';
import { set, useForm } from 'react-hook-form';
import noScreenshot from 'secure-web';
import { useNavigate } from 'react-router-dom';

const Question = () => {

    const navigate = useNavigate();
    // const { register, handleSubmit } = useForm();
    const auth = useAuth();
    const ti = {
        color: 'black'
    }

    var subjectid = JSON.parse(localStorage.getItem('subid'));
    console.log(subjectid);
    var studentid = localStorage.getItem('studentid');
    console.log("Student ID : ", studentid);
    var quizid = auth.quizid;
    // console.log("Quiz ID : ",quizid);

    const [selectedOptions, setSelectedOptions] = useState(() => {
        const savedOptions = localStorage.getItem('selectedOptions');
        return savedOptions ? JSON.parse(savedOptions) : {};
    });

    document.addEventListener('DOMContentLoaded', () => {
        const questionElement = document.getElementById('text-light1');

        if (questionElement) {
            questionElement.addEventListener('copy', () => {
                console.log('Question copied');
            });
        }

        // The rest of your code goes here...
    });

    // Access the storedData from the Redux store state
    const storedData = useSelector(state => state.storedData);

    // Print the storedData to the console
    console.log('Stored Data:', storedData);







    const handleCopy = (questionId) => {
        console.log(`Question ${questionId} copied`);
    };

    useEffect(() => {
        const handleCopyEvent = (e) => {
            const questionId = e.target.getAttribute('data-question-id');
            console.log(questionId);
            handleCopy(questionId);
        };

        document.addEventListener('copy', handleCopyEvent);

        return () => {
            document.removeEventListener('copy', handleCopyEvent);
        };
    }, []);

    const [quizque, setQuizque] = useState([]);
    const [quizans, setQuizans] = useState([]);
    console.log(selectedOptions)
    useEffect(() => {

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log('Tab switched back to this application.');
            } else {
                console.log('Tab switched away from this application.');
            }
        };

        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Clean up the event listener when the component unmounts


        noScreenshot({
            disableRightClick: true,
            disableKeyboardShortcuts: true,
            disableInspectElement: true,
            disablePrintScreen: true,
            disableScreenshot: true,
            disableFunctionKeys: true,
            disableCtrlF4: true,
            mouseLeave: true, // required for overlay with mouse leave a browser window
            mouseEnterAutoHide: false, // required for auto hide overlay with mouse enter a browser window
            ctrlOverlay: true,
            altOverlay: false, // must be pass true for overlay with Alt or Options key press
            shiftOverlay: false,
        });


        const handleKeyDown = (event) => {
            // Prevent opening DevTools with Ctrl+Shift+C
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
                event.preventDefault();
            }
        };

        // Add event listener for keydown event
        document.addEventListener('keydown', handleKeyDown);


        const fetchQuizlist = async () => {

            try {
                const response = await axios.post('http://localhost:8080/showquizque', {
                    id: auth.quizid,
                });
                console.log("success", response.data.Quiz_data
                );
                setQuizque(response.data.Quiz_data);
                setQuizans(response.data.Quiz_ans);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchQuizlist();

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('keydown', handleKeyDown);
        };


    }, []);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement !== null);
            console.log(isFullScreen ? 'Exited fullscreen mode' : 'Entered fullscreen mode');
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [isFullScreen]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Failed to enter fullscreen:', err.message);
            });

            console.log('if fullscreen')
        } else {
            document.exitFullscreen().catch(err => {
                console.error('Failed to exit fullscreen:', err.message);

                console.log('elae fullscreen')
            });
        }
    };


    useEffect(() => {
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    }, [selectedOptions]);

    const handleOptionChange = (question, selectedOption) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [question]: selectedOption
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("++", selectedOptions);
        const dataArray = Object.entries(selectedOptions).map(([que, op]) => ({ que, op }));

        console.log(dataArray);

        var total = 0;

        quizans.map((que) => {
            dataArray.map((stque) => {
                if (stque.que === que.que && stque.op === que.ans) {
                    console.log(que);
                    total += 1;
                } else {
                    console.log("else==" + que.que);
                }

            })

        })

        console.log("total marks = " + total);

        quizans.map((que) => {

            console.log(que);


        })



        console.log("subject id :", subjectid);
        console.log("Student ID : ", studentid);
        console.log("Quiz ID : ", quizid);
        const currentTime = new Date();

        console.log(currentTime);
        const dateString = currentTime; // Your date string

        const date = new Date(dateString);

        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

        console.log(formattedDate); // Output: "11/2024 12:04 PM"

        try {
            const response = await axios.post('http://localhost:8080/result', {
                student_id: studentid,
                subject_id: subjectid,
                quiz_id: quizid,
                date: formattedDate,
                total: total
            });
            console.log("success", response.data);

        } catch (error) {
            console.log("error", error);
        }




        localStorage.removeItem('selectedOptions');
        setSelectedOptions('');

        navigate('/ass');



    };



    return (
        <div className={isFullScreen ? 'questions' : 'hidden'} ontouchstart="startTouch()" style={{ userSelect: "none" }} ontouchend="endTouch()">
            {isFullScreen ? <></> : <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>}
            {isFullScreen ? <></> : <button onClick={toggleFullScreen} className='full'>Fullscreen</button>}
            {isFullScreen && (
                <>

                    <ul>
                        <form className='formque' onSubmit={handleSubmit}>
                            <FormControl>
                                {quizque.map((que, index) => (

                                    <li key={index}>
                                        <div className='onesec'>
                                            <div className='question'>
                                                <h4 className='text-light1'>{que.que}</h4></div>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={selectedOptions[que.que] || ""}
                                                name={que.que}
                                                onChange={(e) => handleOptionChange(que.que, e.target.value)}
                                            >
                                                {que.option.map((option, optionIndex) => (
                                                    <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </li>

                                ))}
                            </FormControl>
                            <button type="submit" className='full'>Submit</button>
                        </form>
                    </ul>
                </>
            )}
        </div>
    );
}

export default Question