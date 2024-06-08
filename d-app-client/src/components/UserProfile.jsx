import React from 'react'
import Navbar from './Navbar'

const UserProfile = () => {
  return (
    <>
    <Navbar />
    <div id='analytics' className='my-2 p-2 flex'>
        <div id='info-card1'>
            Total Campaigns Started
            <br />
            <strong>00</strong>
        </div>
        
    </div>
    </>
  )
}

export default UserProfile