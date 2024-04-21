// Importing hardhat using require syntax
const hardhat = require('hardhat');

async function main() {
    const CampaignFactory = await hardhat.ethers.getContractFactory("createNewFundraising");
    const campaignFactory = await CampaignFactory.deploy();
    console.log(campaignFactory);
    

    console.log('Factory deployed:', campaignFactory.runner.address);
}

main()
    .then(() => { process.exit(0) })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
