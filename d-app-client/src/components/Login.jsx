import React, { useState } from 'react';
import { Button,Alert } from '@mui/material/';
import TextField from '@mui/material/TextField';
import { Snackbar } from '@mui/base';
import LoadingButton from "@mui/lab/LoadingButton";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import loginVector from '../assets/LoginVector2.png';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import auth from '../Firebase/firebase-config';

const Login = () => {

    const navigate = useNavigate();

    const [snackbarMsg, setSnackBarMessage] = useState("Default Message");
    const [snackbarVisiblity, setSnackBarVisibility] = useState(false);
    const [snackbarType, setSnackBarType] = useState('success');



    const [loginData, setLoginData] = useState({});
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    function handleInputChange(e) {
        setLoginData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    }

    const customSnackBar = () => (
        <Snackbar  open={snackbarVisiblity} autoHideDuration={6000} onClose={() => setSnackBarVisibility(false)}>
          <Alert onClose={() => setSnackBarVisibility(false)} severity={snackbarType} sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      );
    const loginUser = async () => {
        console.log(loginData);

        if (!loginData.email || !loginData.password) {
            setSnackBarMessage("All Fields Are Required");
            setSnackBarType("warning");
            setSnackBarVisibility(true);
        } else {
            setIsLoginLoading(true);
            const config = {
                headers : {
                    "content-type" : "application/json",
                }
            }
            try {
                const { email, password } = loginData;
                console.log(`${email} and ${password}`);
                //const auth = getAuth();
                const userCredential = await axios.post("http://localhost:4000/signIn",{email,password},config);
                //const user = userCredential.user;
               // console.log(user);
                console.log(userCredential);
                setIsLoginLoading(false);
                setSnackBarMessage(userCredential.data.msg);
                setSnackBarType("success");
                setSnackBarVisibility(true);
                navigate('/home');
            } catch (error) {
                console.log(error.code);
                console.log(error.message);
                setIsLoginLoading(false);
                setSnackBarMessage("Login failed. Please check your credentials.");
                setSnackBarType("error");
                setSnackBarVisibility(true);
            }
        }
    };

    return (
        <>
            <div id='header' className=' poppins-bold text-md my-4 mx-8 text-[#2181f8]'>
                FundBoost 🚀
            </div>
           
            <main className=' flex flex-row pl-8 pr-4 py-4 gap-4 items-center justify-evenly'>
                <div className=' w-1/3 flex flex-col gap-4  mt-8 border-stone-500 '>
                    <p className=' poppins-regular text-[#21343F] mb-4 text-xl tracking-wide'>
                       <span className='poppins-medium bg-gradient-to-r from-blue-600 via-violet-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Unlocking Dreams</span>  : Welcome To The Future of Crowdfunding!
                    </p>
                    <p className=' poppins-medium font-bold text-2xl mt-8 mb-4 '>
                        Let's <span className=' text-[#2C83EC] poppins-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Sign You In !</span>
                    </p>
                    
                    <TextField
                        sx={{
                            width: '100%'
                        }}
                        required
                        id="outlined-required"
                        name='email'
                        label="Email"
                        onChange={(e) => {
                            handleInputChange(e)
                        }}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        name='password'
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            handleInputChange(e)
                        }}

                    />
                    {customSnackBar()}
                    <LoadingButton className=' poppins-bold text-[#FFFFFF]' loading={isLoginLoading} type="submit" variant="contained" onClick={loginUser} disableElevation size="large" >

                        SIGN IN

                    </LoadingButton>

                </div>
                <div id='img-container' className=' w-1/3'>
                    <img className='w-full'
                        src={loginVector} alt='login vector' aria-label='Login vector'
                    />
                </div>
            </main>
        </>
    )
}

export default Login