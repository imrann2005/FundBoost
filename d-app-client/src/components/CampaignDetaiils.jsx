import React from 'react'
import Navbar from './Navbar'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import xy from '../assets/image.jpg'
import VerifiedIcon from '@mui/icons-material/Verified';

const CampaignDetaiils = () => {

    const { state } = useLocation();
    console.log("state dta", state);
    const { id, title, image, content, btn1, amount,owner,timeStamp,category } = state;
    // console.log("State : Data from path : ",state);
    const commonClasses = 'md:text-md poppins-regular';
    return (
        <div className='h-full w-[100%] '>
            <Navbar display={'sticky'} />

            <main className='h-[80%] w-[95%] bg-[#f3f3f3] flex basis-1/2 my-12 mx-auto px-4 py-5 poppins-regular rounded-md shadow-sm'>
                <div id='img-holder' className='w-1/2 flex items-center justify-center bg-slate-300 rounded-md hover:shadow-lg'>
                    <img src={'https://c8.alamy.com/comp/RNDTPT/fundraising-concept-colorful-flat-design-style-illustration-RNDTPT.jpg'} className='rounded-md' />
                </div>
                <div id='campaign-info' className='w-1/2 py-2 mx-6 '>
                    <h1 className='my-2 md:text-lg poppins-medium'>{title}</h1>

                    <p className='md:text-sm poppins-light mb-6 mt-3'>Created by : {owner}
                        <br />
                        <span className='text-sm my-4 text-[#2181f8] poppins-regular'><strong>FundBoost🚀Verified <VerifiedIcon /></strong></span>
                        <br/>
                        <span className='text-sm my-2 text-[#000] poppins-mediumr'>Time : {timeStamp} </span>
                        <br/>
                        <span className='text-sm my-2 text-[#000] poppins-mediumr'>Category : Test </span>
                    </p>
                    <p className={commonClasses}>Fund Required : <strong>{amount}</strong></p>
                    <p className={commonClasses}>Fund Received : <strong className='text-[#2181f8]'>0.0 ETH</strong></p>

                    <p className='mt-6 mb-3'>Story/Description</p>
                    <p>{content}</p>
                    <div className='flex justify-between mt-4'>
                        <Button variant='contained' size='large' sx={{
                            width: '45%',
                            marginRight: 'auto',
                            background: '#2181f8'
                        }} disableElevation>Invest Now</Button>
                        <Button size='large' sx={{
                            width: '45%',
                            color: '#2181f8'
                        }} disableElevation>Enquiry</Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CampaignDetaiils