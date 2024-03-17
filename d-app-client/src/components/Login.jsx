import React, { useState } from 'react';
import { Button } from '@mui/material/';
import TextField from '@mui/material/TextField';
import { Snackbar } from '@mui/base';
import LoadingButton from "@mui/lab/LoadingButton";
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';

import auth from '../Firebase/firebase-config';

const Login = () => {

    const [snackbarMsg, setSnackBarMessage] = useState("Default Message");
    const [snackbarVisiblity, setSnackBarVisibility] = useState(false);
    const [snackbarType, setSnackBarType] = useState('success');



    const [loginData, setLoginData] = useState({});
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    function handleInputChange(e) {
        setLoginData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: [e.target.value],
            }
        })
    }

    const loginUser = async () => {
        console.log(loginData);
    
        if (!loginData.email || !loginData.password) {
            setSnackBarMessage("All Fields Are Required");
            setSnackBarType("warning");
            setSnackBarVisibility(true);
        } else {
            setIsLoginLoading(true);
            try {
                const { email, password } = loginData;
                const auth = getAuth();
                const userCredential = await signInWithEmailAndPassword(auth, email[0], password[0]);
                const user = userCredential.user;
                console.log(user);
    
                setIsLoginLoading(false);
                setSnackBarMessage("Login successful");
                setSnackBarType("success");
                setSnackBarVisibility(true);
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
             <div className='flex flex-col items-start justify-end fixed bottom-0 left-0 p-8'>
                <Snackbar
                    open={snackbarVisiblity}
                    autoHideDuration={5000}
                    onClose={() => setSnackBarVisibility(false)}
                    className={`rounded-lg p-4 bg-${snackbarType}-500 text-stone-500 shadow-md`}
                >
                    {snackbarMsg}
                </Snackbar>
            </div>
            <div className=' w-1/3 flex flex-col gap-2 mx-auto mt-8 border-stone-500 '>

                <TextField
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

                <LoadingButton loading={isLoginLoading} type="submit" variant="contained" onClick={loginUser} disableElevation size="large">

                    SIGN IN

                </LoadingButton>

            </div>
        </>
    )
}

export default Login