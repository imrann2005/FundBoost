import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import xy from '../assets/image.jpg'
import VerifiedIcon from '@mui/icons-material/Verified';
import { ethers, formatEther,  } from 'ethers'
import Campaign from '../../../contract/artifacts/contracts/Campaign.sol/Campaign.json';
import { Snackbar, Alert, Typography, LinearProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

const CampaignDetaiils = () => {
    const { state } = useLocation();
    const [myInvestments, setMyInvestments] = useState([]);

    //State for Received Amount!
    const [receivedFund, setReceivedFund] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [snackBarVisibility, setSnackBarVisibility] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
    const [snackBarType, setSnackBarType] = useState("success");
    console.log("state dta", state);

    const { id, title, image, content, btn1, amount, owner, timeStamp, category, address } = state;

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate and buffer variants.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
      };

    useEffect(() => {
        const Request = async () => {
            try {
                setSnackBarType('info');
                setSnackBarVisibility(true);
                setSnackBarMessage('Fetching Wallet Details...')

                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3Provider = new ethers.BrowserProvider(window.ethereum);

                const signer = await web3Provider.getSigner();
                const Address = await signer.getAddress();
                setSnackBarType('success');
                setSnackBarVisibility(true);
                setSnackBarMessage('Wallet Fetched Successfuly');
                const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology');

                const contract = new ethers.Contract(
                    address,
                    Campaign.abi,
                    provider,
                );

                const myInvestments = contract.filters.donated(Address);
                const myAllInvestments = await contract.queryFilter(myInvestments);
                console.log(myAllInvestments);
                const receivedFunding = await contract.receivedFund();
                setReceivedFund(formatEther(receivedFunding));
                setIsFetching(true);
                setMyInvestments(myAllInvestments.map((e) => {
                    return {
                        donor: e.args.donor,
                        amount: formatEther(e.args.amout),
                        timeStamp: new Date(parseInt(e.args.timestamp) * 1000).toLocaleString(),
                    }
                }))
            } catch (error) {
                setSnackBarType('error');
                setSnackBarVisibility(true);
                setSnackBarMessage('Error Fetching Data...')
                console.log(error);
            }

        }
        Request();
    }, []);

    const customSnackBar = () => (
        <Snackbar open={snackBarVisibility} autoHideDuration={6000} onClose={() => setSnackBarVisibility(false)}>
            <Alert onClose={() => setSnackBarVisibility(false)} severity={snackBarType} sx={{ width: '100%' }}>
                {snackBarMessage}
            </Alert>
        </Snackbar>
    );

    // console.log("State : Data from path : ",state);
    const commonClasses = 'md:text-md poppins-regular';
    const amt = 1;
    const handleInvest = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();


            const contract = new ethers.Contract(address, Campaign.abi, signer);

            const transaction = await contract.invest({ value: (amt) });
            await transaction.wait();
        } catch (error) {
            console.log(error);
        }

    }


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
                        <br />
                        <span className='text-sm my-2 text-[#000] poppins-mediumr'>Time : {timeStamp} </span>
                        <br />
                        <span className='text-sm my-2 text-[#000] poppins-mediumr'>Category : Test </span>
                    </p>
                    <p className={commonClasses}>Fund Required : <strong>{amount}</strong></p>
                    {
                        isFetching && <p className={commonClasses} onClick={() => { }}>Fund Received : <strong className='text-[#2181f8]'>{receivedFund} ETH</strong></p>
                    }

                    {
                       
                        isFetching && <LinearProgressWithLabel value={67}/>
                    }

                    <p className='mt-6 mb-3'>Story/Description</p>
                    <p>{content}</p>
                    <div className='flex justify-between mt-4'>
                        <Button variant='contained' size='large' sx={{
                            width: '45%',
                            marginRight: 'auto',
                            background: '#2181f8'
                        }} disableElevation onClick={handleInvest}>Invest Now</Button>
                        <Button size='large' sx={{
                            width: '45%',
                            color: '#2181f8'
                        }} disableElevation>Enquiry</Button>
                    </div>
                    {
                        customSnackBar()
                    }
                </div>
            </main>
        </div>
    )
}

export default CampaignDetaiils