import React, { useEffect, useState } from 'react';
import { ethers, formatEther } from 'ethers';
import Navbar from './Navbar';
import { Snackbar, Alert, Card, CardActions, Typography, CardMedia, CardContent, Button } from '@mui/material';
import xx from '../assets/newLogo.png';
import yy from '../assets/cardImg.png';
import NewCampaign from './NewCampaign';
import { deployedAddress } from './NewCampaign';
import createNewFundraising from '../../../contract/artifacts/contracts/Campaign.sol/createNewFundraising.json';
import { useNavigate } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
const Home = () => {
  const [fetching, setFetching] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [snackBarVisibility, setSnackBarVisibility] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
  const [snackBarType, setSnackBarType] = useState("success");

  const [fetchedData, setFetchedData] = useState();

  const navigate = useNavigate();
  // const main = async() => { 
  //      const provider = new ethers.JsonRpcProvider(
  //       'https://rpc.cardona.zkevm-rpc.com'
  //   );

  //   const contract = new ethers.Contract(
  //     deployedAddress,
  //     createNewFundraising.abi,
  //     provider
  //   );

  //   const getDeployedCampaign = contract.filters.campaignCreated();

  //   try {
  //     const latestBlockNumber = await provider.getBlockNumber();

  //     // Specify a block range for querying logs (e.g., last 100 blocks)
  //     const fromBlock = Math.max(0, latestBlockNumber - 60000); // Adjust the block range as needed
  //     const toBlock = latestBlockNumber - 50000;
  //     console.log(`range of block number : ${fromBlock} to ${toBlock}`);
  //     let events = await contract.queryFilter(getDeployedCampaign,fromBlock,toBlock);
  //     let event = events.reverse();
  //     console.log(event);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //  }
  //  main();

  

  useEffect(() => {

    const fetchData = async () => {
      setFetching(true);
      setSnackBarType('info');
      setSnackBarMessage('Fetching Data Please Wait..');
      setSnackBarVisibility(true);
      const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology');

      const contract = new ethers.Contract(
        deployedAddress,
        createNewFundraising.abi,
        provider,
      );

      const getAllProjects = contract.filters.campaignCreated();

      try {

        //console.log(`range of block number : ${fromBlock} to ${toBlock}`);
        //Hardcoded block value after taking block number from transaction summary
        const allData = await contract.queryFilter(getAllProjects);
        let event = allData.reverse();

        const allCampaignData = event.map((e) => {
          return {
            id: Math.random() * 1000,
            title: e.args.title,
            image: e.args.imgURI,
            owner: e.args.owner,
            timeStamp: new Date(parseInt(e.args.timestamp) * 1000).toLocaleString(),
            amount: `${formatEther(e.args.requiredFund)} ETH`,
            address: e.args.campaignAddress,
            category: e.args.category,
          }
        })

        //console.log(allCampaignData);
        setFetchedData(allCampaignData);
        setFetching(false);
        setSnackBarType('success');
        setSnackBarMessage('Projects Fetched Successfully');
        setSnackBarVisibility(true);
      } catch (error) {
        console.log(error);
        setFetching(false);
        setSnackBarType('error');
        setSnackBarMessage('Error Fetching Data');
        setSnackBarVisibility(true);
      }


    }
    fetchData();

  }, []);

  const connectToWallet = async () => {
    try {
      // Check if MetaMask or similar provider is available
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log(provider);
        const signer = await provider.getSigner();
        const Address = await signer.getAddress();
        const Balance = await provider.getBalance(`${Address}`);
        const val = formatEther(Balance);
        //setAddress(Address);
        setSnackBarType("success");
        setSnackBarMessage("Wallet Connected Successfully");
        setSnackBarVisibility(true);
        console.log(val);
      } else {
        // Handle case where MetaMask is not available
        console.error("MetaMask not installed or not enabled.");
        setSnackBarType("error");
        setSnackBarMessage("Failed To Connnect to Metamask Try Again");
        setSnackBarVisibility(true);
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setSnackBarType("warning");
      setSnackBarMessage(error.message);
      setSnackBarVisibility(true);
    }
  };
  //Dummy data created only for testing purposes

  const data = [
    {
      id: "01",
      title: "Lorem Ipsum",
      image: yy,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in mauris nec erat malesuada dignissim. Integer nec felis sed ipsum pharetra gravida.",
      btn1: "Share",
      btn2: "Learn More",
    },
    {
      id: "02",
      title: "Nulla Facilisi",
      image: yy,
      content: "Nulla facilisi. Integer auctor augue nec velit condimentum sodales. Fusce ut suscipit urna. Sed eget fermentum arcu.",
      btn1: "Share",
      btn2: "Learn More",
    },
    {
      id: "03",
      title: "Vivamus Fermentum",
      image: yy,
      content: "Vivamus fermentum odio ut ipsum convallis, eget sodales lectus semper. Nam at arcu nec nisl ultricies tincidunt.",
      btn1: "Share",
      btn2: "Learn More",
    },
    {
      id: "04",
      title: "Vivamus Fermentum",
      image: "https://example.com/image3.jpg",
      content: "Vivamus fermentum odio ut ipsum convallis, eget sodales lectus semper. Nam at arcu nec nisl ultricies tincidunt.",
      btn1: "Share",
      btn2: "Learn More",
    },
    {
      id: "05",
      title: "Vivamus Fermentum",
      image: "https://example.com/image3.jpg",
      content: "Vivamus fermentum odio ut ipsum convallis, eget sodales lectus semper. Nam at arcu nec nisl ultricies tincidunt.",
      btn1: "Share",
      btn2: "Learn More",
    },
    {
      id: "06",
      title: "Vivamus Fermentum",
      image: "https://example.com/image3.jpg",
      content: "Vivamus fermentum odio ut ipsum convallis, eget sodales lectus semper. Nam at arcu nec nisl ultricies tincidunt.",
      btn1: "Share",
      btn2: "Learn More",
    },
  ];
  const customSnackBar = () => (
    <Snackbar open={snackBarVisibility} autoHideDuration={6000} onClose={() => setSnackBarVisibility(false)}>
      <Alert onClose={() => setSnackBarVisibility(false)} severity={snackBarType} sx={{ width: '100%' }}>
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
  const handleOpen = () => {
    setIsOpen(true);
  }
  const handleClose = () => {
    setIsOpen(false);
  }

  const handleClick = (d, open, handleOpen, handleClose) => {
    navigate(`/home/campaign/${d.id}`, { state: d, open: open, handleOpen: handleOpen, handleClose: handleClose });
  }
  return (
    <div className='h-[100vh]'>
      {customSnackBar()}
      <Navbar onClick={connectToWallet} onOpen={handleOpen} display={'sticky'} />
      <NewCampaign open={open} onClose={handleClose} />
      <main id='main-section' className='  bg-[#f3f3f3] flex flex-col py-0 px-2 '>
        <img className='mx-auto h-[10%] my-2' src={xx} />
        <section className=' flex gap-3 justify-center flex-wrap'>
          {
            fetchedData && fetchedData.map((d) => {
              return (
                <Card key={d.id} sx={{ maxWidth: 345, }}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image={yy}
                    title="green iguana"
                  />
                  <CardContent sx={{
                    gap: '5px'
                  }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {d.title} <br /> <span className='text-sm my-2 text-[#2181f8]'>FundBoost🚀Verified <VerifiedIcon /></span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                      Owner : {d.owner}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                      Required Fund :  {d.amount}

                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                      Date Created :  {d.timeStamp}
                      <br />

                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">Share</Button> */}
                    <Button size="medium" onClick={() => handleClick(d, open, handleOpen, handleClose)}>Learn More</Button>

                  </CardActions>
                </Card>
              )
            })
          }
        </section>
      </main>
    </div>
  );
};

export default Home;
