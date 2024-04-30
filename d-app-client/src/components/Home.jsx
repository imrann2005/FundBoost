import React, { useEffect, useState } from 'react';
import { ethers, formatEther } from 'ethers';
import Navbar from './Navbar';
import { Snackbar, Alert, Card, CardActions, Typography, CardMedia, CardContent,Button } from '@mui/material';
import xx from '../assets/carouselPic.png';
import yy from '../assets/cardImg.png';

const Home = () => {
  const [address, setAddress] = useState("");
  const [snackBarVisibility, setSnackBarVisibility] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
  const [snackBarType, setSnackBarType] = useState("success");

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
        setAddress(Address);
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
    }
  };
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
  return (
    <div classNameName='h-[100vh]'>
      {customSnackBar()}
      <Navbar onClick={connectToWallet} />
      <main id='main-section' classNameName=' h-25% bg-[#f3f3f3] flex items-center'>
        <img className='mx-auto h-[40%] my-2' src={xx} />
        <section className=' flex gap-3 justify-center flex-wrap'>
          {
            data.map((d) => {
              return (
                <Card key={d.id} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={yy}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {d.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                     {d.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
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
