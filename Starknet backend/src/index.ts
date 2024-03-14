import express from 'express';
import {Account, cairo, Call, constants, Contract, json, RpcProvider, Uint256} from "starknet";
import fs from "fs";

const app = express();
app.use(express.json());  // Needed to parse JSON from requests

// Define interface for your expected JSON input
interface MyJson {
    user: string;
    merchant: string;
    amount: string;
}

const  send = async (address: string | undefined) => {
    // initialize provider
    const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_GOERLI });
// initialize existing pre-deployed account 0 of Devnet
    const privateKey = 'POR SEGURIDAD PON TU LLAVE PRIVADA EN UNA VARIABLE DE AMBIENTE';
    const accountAddress = '0x052e5577e4126f08da297013073dfea3e98932e79088895f5c428bd28c62ae32';

    const account0 = new Account(provider, accountAddress, privateKey);

    const erc20Address = "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426"

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

    if(address === undefined) {
        address = ''; // This is your default value
    }

    try {
        // Execute tx transfer of 1 tokens to account 1
        console.log(`Invoke Tx - Transfer 1 tokens to erc20 contract...`);
        const toTransferTk: Uint256 = cairo.uint256(1 * 10 ** 6);
        const transferCall: Call = erc20.populate('transfer', {
            recipient: address,
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


app.post('/send', async (req, res) => {
    // Validate that the body includes the necessary fields
    const body: Partial<MyJson> = req.body;

    await send(body.merchant)

    res.json({});
});


// listen for incoming requests
app.listen(3001);
