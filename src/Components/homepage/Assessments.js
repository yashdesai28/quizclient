import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Assessments = () => {
    const navigate = useNavigate();
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([

        { headerName: "Teacher Name", field: "teacher_name", filter: true, floatingFilter: true },
        { headerName: "Subject Name", field: "subject", filter: true, floatingFilter: true },
        { headerName: "Quiz Name", field: "quiz_name", filter: true, floatingFilter: true },
        { headerName: "Date", field: "date", filter: true, floatingFilter: true },
        { headerName: "total marks", field: "total_marks", filter: true, floatingFilter: true },
        { headerName: "passing mark", field: "passing_marks", filter: true, floatingFilter: true },
        { headerName: "OBTAIN MARKS", field: "OBTAIN_MARKS", filter: true, floatingFilter: true }
    ]);

    useEffect(() => {
        // Make API call to fetch data
        const id = localStorage.getItem('studentid');
        axios.post('http://localhost:8080/showresult', {
            id: id
        }).then(response => {
            // Check if the response status is OK (200)
            if (response.status === 200) {

                const rowData = response.data.data.map(item => {

                    const assessmentInfo = item.assessment_data.map(assessment => ({
                        teacher_name: assessment.teacher_id.teacher_name,
                        subject: assessment.subject_id.subject_name,
                        quiz_name: assessment.quiz_id.quiz_name,
                        total_marks: assessment.quiz_id.total_marks,
                        passing_marks: assessment.quiz_id.passing_marks,
                        date: assessment.date,
                        OBTAIN_MARKS: assessment.total,
                    }));

                    return assessmentInfo;
                }).flat();



                // Update rowData state with the mapped data
                setRowData(rowData);


            } else {
                // Handle non-OK response status
                console.error('Error: Non-OK response status:', response.status);
            }
        })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });

    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount





    return (
        <>
         <h1 style={{ marginTop: "2rem" ,marginBottom:'2rem' }}> Assessment</h1>
        <div
            className="ag-theme-quartz-dark" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
        </>
    )
}

export default Assessments