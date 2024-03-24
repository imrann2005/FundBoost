import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from './contexts/FormContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactPhoneInput from 'react-phone-input-2'
import { TextField } from '@mui/material';
import image from '../assets/image.jpg'

import { IconButton, InputAdornment, Stepper, Step, StepLabel, Snackbar, Alert, MenuItem } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const SignUp = () => {
    const naviagte = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const steps = [
        'Personal Details',
        'Address & Contact Details',
        'Verify Phone Number',
    ];
    const [stepNumber, setStepNumber] = useState(0);

    const PersonalDetailsForm = () => {
        const [snackBarVisibility, setSnackBarVisibility] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
        const [snackBarType, setSnackBarType] = useState("success");
        const [nextButtonLoading, setNextButtonLoading] = useState(false);

        const { formValues, updateFormValue } = useFormContext();

        const handleFormValues = (e) => {
            const { name, value } = e.target;
            updateFormValue(name, value);
        };

        const customSnackBar = () => (
            <Snackbar open={snackBarVisibility} autoHideDuration={6000} onClose={() => setSnackBarVisibility(false)}>
                <Alert onClose={() => setSnackBarVisibility(false)} severity={snackBarType} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        );
        return (
            <> 
                {customSnackBar()}
                <TextField 
                    type="text"
                    value={formValues.fullName || ''}
                    name="fullName"
                    label="Full Name"
                    onChange={handleFormValues}
                    required

                />
                <TextField
                    type="text"
                    value={formValues.gender || ''}
                    name="gender"
                    label="Gender"
                    onChange={handleFormValues}
                    required
                />
                <TextField
                    type="email"
                    value={formValues.emailAddress || ''}
                    name="emailAddress"
                    label="Email Address"
                    onChange={handleFormValues}
                    required
                />
                <ReactPhoneInput
                    value={formValues.loginNumber || ''}
                    onChange={(newValue) => updateFormValue("loginNumber", newValue)}
                    component={TextField}
                />
                <TextField
                    name="password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    type={showPassword ? "password" : "text"}
                    value={formValues.password || ''}
                    label="Password"
                    sx={{ marginBottom: "-10px" }}
                    onChange={handleFormValues}
                    required
                />
                <LoadingButton
                    loading={nextButtonLoading}
                    type="submit"
                    style={{ marginTop: "10px", backgroundColor: "#2C83EC", fontFamily: "Poppins" }}
                    onClick={() => {
                        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
                        const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                        if (!formValues.fullName || !formValues.emailAddress || !formValues.gender || !formValues.password || !formValues.loginNumber) {
                            setSnackBarMessage("All Fields Are Required");
                            setSnackBarType("warning");
                            setSnackBarVisibility(true);
                        } else if (!formValues.password.match(passRegex)) {
                            setSnackBarMessage("Weak Password : Minimum eight characters, at least one letter, one number and one special character is Required");
                            setSnackBarType("error");
                            setSnackBarVisibility(true);
                        } else if (!formValues.emailAddress.match(emailRegex)) {
                            setSnackBarMessage("Enter Valid Email");
                            setSnackBarType("error");
                            setSnackBarVisibility(true);
                        }
                        else if (!formValues.loginNumber.match(phoneRegex)) {
                            setSnackBarMessage("Enter Valid Number");
                            setSnackBarType("error");
                            setSnackBarVisibility(true);
                        }
                        else {

                            const detailsValidator = async () => {
                                setNextButtonLoading(true);

                                try {
                                    const config = {
                                        headers: {
                                            "content-type": "application/json"
                                        }
                                    }
                                    //const response = await axios.post("http://localhost:4000/importerSignupValidator", formValues, config);
                                    setNextButtonLoading(false);
                                    setStepNumber((prev) => prev + 1);


                                }


                                catch (e) {
                                    setNextButtonLoading(false);

                                    setSnackBarMessage(e.response.data.msg);
                                    setSnackBarType("error");
                                    setSnackBarVisibility(true);
                                }

                            }
                            detailsValidator();
                        }
                    }
                    }
                    variant="contained"
                    disableElevation
                    size="large"
                >
                    NEXT
                </LoadingButton>
                <p className="font-roboto text-sm text-center">
                    Already A User?<b> <span onClick={() => {
                        naviagte("/")
                    }} style={{
                        cursor: "pointer",
                    }} className="text-[#2C83EC]"> Sign In </span></b>
                </p>
          
           </>
        );
    };

    return (
        <div className="flex flex-row w-full h-full">
            {/* form container */}
            <div className="p-5 sm:p-16 sm:basis-1/2 flex-col ">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-4 tracking-widest font-poppins">
                     <span className=" font-medium text-[#2C83EC] block">Unlocking Dreams:
                     </span> 
                     <span className=' font-light my-2'>
                     Welcome to the Future of Crowdfunding 
                     </span>
                </h1>
                <div className="flex flex-col mt-10  gap-4 sm:mt-18 sm:gap-6">
                    <Stepper activeStep={stepNumber} alternativeLabel className=' mb-4'>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {stepNumber === 0 ? <PersonalDetailsForm /> : stepNumber === 1 ? <AddressAndContactDetailsForm /> : stepNumber === 2 ? <VerifyPhoneNumber /> : null}
                </div>
            </div>
            {/* image container */}
            <div className=" sm:basis-1/2 md:block p-7 flex items-center ">
                <img src={image} className=" my-auto object-fit " alt="" />
            </div>
        </div>
    );




}


export default SignUp