import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import '../styles/App.css';
import Question from './Question';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';


const Showquiz = () => {

    return (
        <div className='container1'>
            <h1 className='title text-light1'>Quiz Application</h1>
            

            {/* display questions */}
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Question />
                </PersistGate>
            </Provider>

           
        </div>
    );

}

export default Showquiz