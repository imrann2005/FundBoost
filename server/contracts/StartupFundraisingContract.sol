// SPDX-License-Identifier: Unlicensed
pragma solidity >0.7.0 <=0.9.0;

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
        Campaign newCampaign = new Campaign(campaignTitle,requiredCampaignFund,imgURI,descriptionURI);

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
    string memory descriptionURI)
    {
        title = campaignTitle;
        requiredFund = requiredCampaignFund;
        image = imgURI;
        startupDescription = descriptionURI;
        owner = payable(msg.sender);
    }

    function invest() public payable {
        require(requiredFund > receivedFund,"Fund raising completed");
        owner.transfer(msg.value);
        receivedFund = receivedFund + msg.value;
        emit donated(msg.sender,msg.value,block.timestamp);
    }
}