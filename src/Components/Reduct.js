import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from './Action';
import { persistor } from './store';
import { useSelector } from 'react-redux';

const Reduct = () => {

    // Access the storedData from the Redux store state
    const storedData = useSelector(state => state.storedData);

    // Print the storedData to the console
    console.log('Stored Data:', storedData);
    const dispatch = useDispatch();

    const handleClick = () => {
        // Data you want to store
        const newData = { id: 1, name: 'Example' };

        // Dispatch the action to store the data
        dispatch(addData(newData));
    };

    return (
        <button onClick={handleClick}>Store Data</button>
    )
}

export default Reduct