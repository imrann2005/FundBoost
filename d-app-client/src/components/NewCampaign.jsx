import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TextField, } from '@mui/material'
import { useFormContext } from './contexts/FormContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { Buffer } from 'buffer'
import { create as IPFSHTTPClient } from 'ipfs-http-client';
import { BrowserProvider,ethers } from 'ethers';
import createNewFundraising from '../../../contract/artifacts/contracts/Campaign.sol/createNewFundraising.json'

const deployedAddress = '0x0591A7C6484e68f28D08b23aaA67cD43AB20b82F';




function NewCampaign({ open, children, onClose }) {
  const dialog = useRef();
  const [uploading, setUploading] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { formValues, updateFormValue } = useFormContext();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function handleFormValues(e) {
    const name = e.target.name;
    const value = e.target.value;
    updateFormValue(name, value);
  }

  const uploadFiles = async (e) => {

    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const client = IPFSHTTPClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      // apiPath: '/api/v0',
      headers: {
        authorization: auth
      }
    })
    e.preventDefault();
    setIsLoading(true);

    if (formValues.story) {
      try {
        const added = await client.add(formValues.story);
        //setStoryUrl(added.path);
        console.log(added.path);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  const startCampaign = async() => {
    setIsLoading(true);
    const provider =  new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      deployedAddress,
      createNewFundraising.abi,
      signer,
    )

    const campaignData = await contract.createCampaign(
      formValues.campaignName,
      formValues.reqAmount,
      imageUrl,
      formValues.category,
      formValues.story
    )

    await campaignData.wait();
    console.log(campaignData.to);
    setAddress(campaignData.to);
    setIsLoading(false);
    }
  return createPortal(
    <dialog className="modalC h-[100vh] mx-auto my-auto w-[50%] backdrop:opacity-1 px-3 py-3" ref={dialog} onClose={onClose}>
      {open ? <div className=' flex flex-col basis-1/2 gap-4 w-[80%] mx-auto'>
        <div className='flex justify-between'><p className='poppins-regular text-lg my-4 mx-3'><span className=' text-[#2181F8]'>Start</span> Fundraising</p>
          <button className='hover:text-[#2181f8]' onClick={onClose}>Cancel</button>
        </div>

        <TextField
          type="text"
          value={formValues.campaignName || ''}
          name="campaignName"
          label="Project/Campaign Name"
          onChange={handleFormValues}
          required

        />
        <TextField
          type="number"
          value={formValues.reqAmount || ''}
          name="reqAmount"
          label="Required Amount"
          onChange={handleFormValues}
          required

        />
        <TextField
          type="text"
          value={formValues.category || ''}
          name="category"
          label="Category"
          onChange={handleFormValues}
          required

        />
        <TextField
          type="text"
          size='large'
          value={formValues.story || ''}
          name="story"
          label="Enter Story"
          onChange={handleFormValues}
          required

        />
        <label className='text-sm'>Upload a suitable Image</label>
        <input type='file' accept='image/*' />

        <div className=' flex justify-evenly'>
          <LoadingButton loading={loading} onClick={uploadFiles} variant='outined' size='large' sx={{
            color: "#2181f8"
          }}>
            Upload Images To IPFS
          </LoadingButton>
          <LoadingButton loading={loading} size='large' onClick={startCampaign} variant='contained' sx={{
            color: "#ffffff" 
          }}>
            Start Fundraising
          </LoadingButton>
        </div>
      </div> : address}
    </dialog>,
    document.getElementById('modal')
  );
}

export default NewCampaign;
