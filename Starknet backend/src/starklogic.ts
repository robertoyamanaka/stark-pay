import {
    Account,
    constants,
    ec,
    json,
    stark,
    RpcProvider,
    hash,
    CallData,
    Uint256,
    cairo,
    Call,
    uint256,
    Contract,
    Calldata
} from "starknet";
import fs from "fs";

/*const  createWalletARG = async () => {

    //new Argent X account v0.2.3
    const argentXproxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
    const argentXaccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";
    // connect provider
    const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
    //const privateKey = stark.randomAddress();
    const privateKeyAX = '0x144b8b79bdd6e19eccd34152652938c5a3def2b026150cbbea914bef0d1ffa3'
    console.log('New OZ account:\nprivateKey=', privateKeyAX);
    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
    console.log('publicKey=', starkKeyPubAX);

    const AXproxyConstructorCallData = CallData.compile({
        implementation: argentXaccountClassHash,
        selector: hash.getSelectorFromName("initialize"),
        calldata: CallData.compile({ signer: starkKeyPubAX, guardian: "0" }),
    });
    const AXcontractAddress = hash.calculateContractAddressFromHash(
        starkKeyPubAX,
        argentXproxyClassHash,
        AXproxyConstructorCallData,
        0
    );
    console.log('Precalculated account address=', AXcontractAddress);

    /!*console.log("not here??")

    const accountAX = new Account(provider, AXcontractAddress, privateKeyAX);

    const deployAccountPayload = {
        classHash: argentXproxyClassHash,
        constructorCalldata: AXproxyConstructorCallData,
        contractAddress: AXcontractAddress,
        addressSalt: starkKeyPubAX };

    const { transaction_hash: AXdAth, contract_address: AXcontractFinalAdress } = await accountAX.deployAccount(deployAccountPayload);
    console.log('✅ ArgentX wallet deployed at:',AXcontractFinalAdress);*!/

}*/

/*
const deployWallet = async () => {
    //new Argent X account v0.2.3
    const argentXproxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
    const argentXaccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";
    // connect provider
    const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } });

// new Open Zeppelin account v0.5.1
// Generate public and private key pair.
    //const privateKey = stark.randomAddress();
    const privateKeyAX = '0x144b8b79bdd6e19eccd34152652938c5a3def2b026150cbbea914bef0d1ffa3'
    console.log('New OZ account:\nprivateKey=', privateKeyAX);
    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
    console.log('publicKey=', starkKeyPubAX);

    const AXproxyConstructorCallData = CallData.compile({
        implementation: argentXaccountClassHash,
        selector: hash.getSelectorFromName("initialize"),
        calldata: CallData.compile({ signer: starkKeyPubAX, guardian: "0" }),
    });
    const AXcontractAddress = hash.calculateContractAddressFromHash(
        starkKeyPubAX,
        argentXproxyClassHash,
        AXproxyConstructorCallData,
        0
    );
    console.log('Precalculated account address=', AXcontractAddress);

    console.log("not here??")

    const accountAX = new Account(provider, AXcontractAddress, privateKeyAX);

    const deployAccountPayload = {
        classHash: argentXproxyClassHash,
        constructorCalldata: AXproxyConstructorCallData,
        contractAddress: AXcontractAddress,
        addressSalt: starkKeyPubAX };

    const { transaction_hash: AXdAth, contract_address: AXcontractFinalAdress } = await accountAX.deployAccount(deployAccountPayload);
    console.log('✅ ArgentX wallet deployed at:',AXcontractFinalAdress);
}
*/


/*
const generatePrivateKey = async () => {
    const privateKey = stark.randomAddress();
    console.log("privateKey:")
    console.log(privateKey)
}
*/

/*let send = async () => {
    const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } });
    let privateKey = '0x3529d8ef9bcd42fd3c4c2a9eeab6343903ec9abf444577d42570893332b5361'

    const account0 = new Account(provider, '0x428999d86c68bee9122a006b7027779eba1edf859d85f243a0f9e13c4455157', privateKey);
    console.log("Deployment Tx - ERC20 Contract to Starknet...");
    const compiledErc20mintable = json.parse(fs.readFileSync("compiled_contracts/ERC20MintableOZ051.json").toString("ascii"));


    let erc20Address = "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"



    const erc20 = new Contract(compiledErc20mintable.abi, erc20Address, provider);
    erc20.connect(account0);

    console.log(`Invoke Tx - Transfer 10 tokens back to erc20 contract...`);
    const toTransferTk: Uint256 = cairo.uint256(10);
    const transferCallData: Call = erc20.populate("transfer", {
        recipient: erc20Address,
        amount: toTransferTk // with Cairo 1 contract, 'toTransferTk' can be replaced by '10n'
    });
    const { transaction_hash: transferTxHash } = await erc20.transfer( transferCallData.calldata);

// Wait for the invoke transaction to be accepted on Starknet
    console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
    await provider.waitForTransaction(transferTxHash);

// Check balance after transfer - should be 1090
    console.log(`Calling Starknet for account balance...`);
    const balanceAfterTransfer = await erc20.balanceOf(account0.address);
    console.log("account0 has a balance of:", uint256.uint256ToBN(balanceAfterTransfer.balance).toString()); // Cairo 0 response
    console.log("✅ Script completed.");
}*/

const  createWallet = async () => {
    // initialize provider
    const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_GOERLI });
// initialize existing pre-deployed account 0 of Devnet
    const privateKey = 'POR SEGURIDAD PON TU LLAVE PRIVADA EN UNA VARIABLE DE AMBIENTE';
    const accountAddress = '0x052e5577e4126f08da297013073dfea3e98932e79088895f5c428bd28c62ae32';

    const account0 = new Account(provider, accountAddress, privateKey);

    const erc20Address = "0x07e4a44d5d8c9ebd88fb40ca3fe2293178c4e7fe980d91232eaf967bb632ddd0"

    const compiledErc20mintable2 = json.parse(
        fs.readFileSync('./src/ERC20MintableOZ051.json').toString('ascii')
    );

    const compiledErc20mintable = json.parse(
        fs.readFileSync('./src/ERC20OZ081.sierra.json').toString('ascii')
    );

    const erc20 = new Contract(compiledErc20mintable.abi, erc20Address, provider);
    erc20.connect(account0);

    // Check balance - should be 20 NIT
    console.log(`Calling Starknet for account balance...`);
    const balanceInitial = await erc20.balanceOf(account0.address);
    console.log('account0 has a balance of:', balanceInitial);

    try {
        // Execute tx transfer of 1 tokens to account 1
        console.log(`Invoke Tx - Transfer 1 tokens to erc20 contract...`);
        const toTransferTk: Uint256 = cairo.uint256(1 * 10 ** 18);
        const transferCall: Call = erc20.populate('transfer', {
            recipient: '0x00e8a7ede3b9ea16f33f3de59f2d330567b89f1038585396622cff1bd06417d7',
            amount: toTransferTk
        });
        const { transaction_hash: transferTxHash } = await account0.execute(transferCall);
// Wait for the invoke transaction to be accepted on Starknet
        console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
        await provider.waitForTransaction(transferTxHash);

// Check balance after transfer - should be 19 NIT
        console.log(`Calling Starknet for account balance...`);
        const balanceAfterTransfer = await erc20.balanceOf(account0.address);
        console.log('account0 has a balance of:', balanceAfterTransfer);
        console.log('✅ Script completed.');
    } catch (err) {
        console.log("error:")
        console.log(err)
    }
}

const  createWalletERC20 = async () => {

    // initialize provider
    const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_GOERLI });
// initialize existing pre-deployed account 0 of Devnet
    const privateKey = '0x03673d0064ff5496b2b16441cff87ebe8ee2ff94f7409cdfcf071f2bf4957bd4';
    const accountAddress = '0x052e5577e4126f08da297013073dfea3e98932e79088895f5c428bd28c62ae32';

    const account0 = new Account(provider, accountAddress, privateKey);


    // Deploy an ERC20 contract
    console.log('Deployment Tx - ERC20 Contract to Starknet...');
    const compiledSierra = json.parse(
        fs.readFileSync('./src/ERC20OZ081.sierra.json').toString('ascii')
    );
    const compiledCasm = json.parse(
        fs.readFileSync('./src/ERC20OZ081.casm.json').toString('ascii')
    );
    const initialTk: Uint256 = cairo.uint256(20 * 10 ** 18); // 20 NIT
    const erc20CallData: CallData = new CallData(compiledSierra.abi);
    const ERC20ConstructorCallData: Calldata = erc20CallData.compile('constructor', {
        name: 'BURRITA LOCA',
        symbol: 'BRR',
        fixed_supply: initialTk,
        recipient: account0.address,
    });

    console.log('constructor=', ERC20ConstructorCallData);
    const deployERC20Response = await account0.declareAndDeploy({
        contract: compiledSierra,
        casm: compiledCasm,
        constructorCalldata: ERC20ConstructorCallData,
    });
    console.log('ERC20 declared hash: ', deployERC20Response.declare.class_hash);
    console.log('ERC20 deployed at address: ', deployERC20Response.deploy.contract_address);

// Get the erc20 contract address
    const erc20Address = deployERC20Response.deploy.contract_address;
// Create a new erc20 contract object
    const erc20 = new Contract(compiledSierra.abi, erc20Address, provider);
    erc20.connect(account0);
}

createWallet()
