
import './App.css';
import Signup from './Components/Signup&Signin/Signup';
import Email from './Components/sendotp&verify/Email';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Otppage from './Components/sendotp&verify/Otppage';
import Forgetpass from './Components/sendotp&verify/Forgetpass';
import Navbars from './Components/Navbars';
import { Auths } from './Components/Auths';
import Homepage from './Components/homepage/Homepage';
import Reqauth from './Components/Reqauth';
import Showquiz from './Components/homepage/Showquiz';
import Quizlist from './Components/homepage/Quizlist';
import Quizauth from './Components/Quizauth'
import Editprofile from './Components/homepage/Editprofile';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Components/store';
import Reduct from './Components/Reduct';
import Assessments from './Components/homepage/Assessments';





function App() {

  console.log('app run');


  return (
    //<Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auths>
          <Navbars />
          <Routes>
            <Route path='/home' element={<Reqauth><Homepage /></Reqauth>}></Route>
            <Route path="/login" element={<Signup />}></Route>
            <Route path="/sendemail" element={<Email />}></Route>
            <Route path="/" element={<Otppage />}></Route>

            <Route path='/forpass' element={<Forgetpass />}></Route>
            <Route path='/listquiz' element={<Reqauth><Quizlist /></Reqauth>}></Route>
            <Route path='/showquiz' element={<Reqauth><Quizauth><Showquiz /></Quizauth></Reqauth>}></Route>
            <Route path='/editprofile' element={<Editprofile></Editprofile>}></Route>
            <Route path='/ass' element={<Assessments />}></Route>
            

          </Routes>






        </Auths>
      </PersistGate>
    </Provider>

  );
}

export default App;
