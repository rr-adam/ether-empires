import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';

declare global {
    var deployer: SignerWithAddress;
    var EtherEmpires: any;
    var multicall2: any;
}

export default async function deployFixture() {
    const [deployer] = await ethers.getSigners();
    global.deployer = deployer;

    const EtherEmpiresContract = await ethers.getContractFactory('contracts/EtherEmpires.sol:EtherEmpires', deployer);

    global.EtherEmpires = await EtherEmpiresContract.deploy();
    await EtherEmpires.deployed();
    console.log(`EtherEmpires deployed at: ${EtherEmpires.address}`);

    // Colony can be created through the deployment script to skip this step when testing

    // const tx = await EtherEmpires.createColony("newColonyWow");
    // const receipt = await tx.wait();
    // if (receipt.status == 1) {
    //     const newColonyAddress = receipt.logs[0].address;
    //     console.log(`New colony deployed for ${deployer.address} at: ${newColonyAddress}`);
    // } else {
    //     console.log("Transaction failed");
    // }

    // Deploy Multicall
    const Multicall2 = await ethers.getContractFactory("Multicall2");
    global.multicall2 = await Multicall2.deploy();
    await multicall2.deployed();
    console.log(`Multicall deployed at ${multicall2.address}`);
};
