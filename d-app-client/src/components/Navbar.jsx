import React, { useState } from 'react'
import Select from '@mui/material/Select';
import { MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WalletIcon from '@mui/icons-material/Wallet';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


const Navbar = ({ onClick, onOpen }) => {
  const [search, setSearch] = useState("All Categories");
  function handleChange(e) {
    setSearch(e.target.value);
  }
  //filterAlt,accountbox,paid icon,event icon
  return (
    <nav style={{
      position : "fixed",
      top : '0',
      opacity : '95%'
    }} className=' h-[12.5%] w-full bg-[#2181F8] px-4 py-3 flex items-center justify-around hover:shadow-md'>
      <p className=' poppins-semibold text-[#FFFFFF]'>Company Logo</p>
      <div id='nav-search' className=' w-[70%] bg-[#f3f3f3] h-8 rounded-md flex items-center justify-around'>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={search}
          defaultValue='All Categories'
          label="All Categories"
          onChange={handleChange}
          sx={
            {
              height: "85%",
              width: "25%",
              fontFamily: "Poppins",

            }
          }
        >
          <MenuItem value={'All Categories'}>All Categories</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <input placeholder='Search Projects here..' className=' focus:outline-none w-full px-4 text-sm poppns-light' />
        <div id='search-icon' className='h-[100%] w-10 bg-[#2181F8] border-[#FFFFF] outline-1'>
          <IconButton title='Search' sx={{
            height: "100%",

          }}>
            <SearchIcon sx={
              {
                color: "#f3f3f3",
                marginLeft: "auto",
                padding: '2px',
                // outline: "none"

              }} />
          </IconButton>
        </div>
      </div>
      <ul className='flex'>
        <li><IconButton onClick={onClick} aria-label='Connect to wallet' size='large' title='Wallet' aria-labelledby='Wallet'>
          <WalletIcon sx={{
            color: "#f3f3f3"

          }} />
        </IconButton></li>
        <li><IconButton onClick={onOpen} aria-label='Connect to wallet' size='large' title='Create Fundraising' aria-labelledby='Wallet'>
          <AddBusinessIcon sx={{
            color: "#f3f3f3"

          }} />
        </IconButton></li>

      </ul>
    </nav>
  )
}

export default Navbar