// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
 import "hardhat/console.sol";

contract createNewFundraising {

    address [] public deployedCampaigns;

    //indexed used for filtering values from frontend
    event campaignCreated (
        string title,
        uint requiredFund,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );

    function  createCampaign  (
        string memory campaignTitle,
        uint requiredCampaignFund,
        string memory imgURI,
        string memory category,
        string memory descriptionURI
    )public {
        Campaign newCampaign = new Campaign(campaignTitle,requiredCampaignFund,imgURI,descriptionURI, msg.sender);

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(campaignTitle,requiredCampaignFund,msg.sender,address(newCampaign),imgURI,block.timestamp,category);
    }
}

contract Campaign{
    string public title;
    uint public requiredFund;
    string public image;
    string public startupDescription;
    address payable public owner;
    uint public receivedFund;
    
    //Event used for filtering in frontend

    event donated(address indexed donor,uint indexed amout,uint indexed timestamp);
//Constructor function is defined
    constructor(
    string memory campaignTitle, 
    uint requiredCampaignFund, 
    string memory imgURI,
    string memory descriptionURI,
    address campaignOwner)
    {
        title = campaignTitle;
        requiredFund = requiredCampaignFund;
        image = imgURI;
        startupDescription = descriptionURI;
        owner = payable(campaignOwner);
    }

    function invest() public payable {
        require(requiredFund > receivedFund,"Fund raising completed");
        owner.transfer(msg.value);
        receivedFund = receivedFund + msg.value;
        emit donated(msg.sender,msg.value,block.timestamp);
    }
}