const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path : './.env.local'});
//require('@nomiclabs/hardhat-waffle');

/** @type import('hardhat/config').HardhatUserConfig */

task("accounts","Prints the list of accounts",async()=>{
  const accounts = await hre.ethers.getSigners();
  //console.log(process.env);
  for (const account of accounts) {
   console.log(account.address);
    
  }
});


const privateKey = process.env.PRIVATE_KEY
module.exports = {
  solidity: "0.8.24",
  defaultNetwork : "polygon",
  networks : {
    hardhat : {},
    polygon : {
      url : process.env.PUBLIC_AMOY_RPC_URL,
      accounts : [privateKey],

    }
  }

};
