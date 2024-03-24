import React, { useState } from 'react'
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Button } from '@mui/material';
import './App.css'
import { FormProvider } from './components/contexts/FormContext';
import { Routes, Route } from "react-router-dom";
function App() {

  const [swi,setSwi] = useState(false);



  return (
    <FormProvider>
    <Routes>
      <Route path='/' element={ <SignUp/> } />
     
    </Routes>
  </FormProvider>
   
  )
}

export default App