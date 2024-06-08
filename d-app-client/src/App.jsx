import React, { useState } from 'react'
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Button } from '@mui/material';
import './App.css'
import { FormProvider } from './components/contexts/FormContext';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CampaignDetaiils from './components/CampaignDetaiils';
import UserProfile from './components/UserProfile';
function App() {

  // const [swi,setSwi] = useState(false);



  return (
    <FormProvider>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/campaign/:id' element={<CampaignDetaiils />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>
    </FormProvider>

  )
}

export default App