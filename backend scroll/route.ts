import { NextResponse } from "next/server";
import Web3 from "web3";
import { abi } from "./const";
import { parseUnits } from "viem";
//ic evm rpc
let web3js = new Web3(new Web3.providers.HttpProvider('https://scroll-sepolia.blockpi.network/v1/rpc/public'));

const privateKey = Buffer.from(process.env.NEXT_PUBLIC_PRIVATE_KEY!, 'hex');
const contractABI = abi;
const contractAddress = '0x52A13eF30Da4a73aAB8CB1d033C37dB201ea014c';

const contract = new web3js.eth.Contract(contractABI, contractAddress);

function convertBigIntToString(obj: any): any {
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  const result: any = {};
  for (const key in obj) {
    result[key] = convertBigIntToString(obj[key]);
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, merchant, amount, paymentId } = body
  
    if (!paymentId) {
      return new NextResponse("Invalid payment ID", { status: 500 });
    }

    if (!merchant || !user) {
      return new NextResponse("Invalid address", { status: 500 });
    }

    if (!amount) {
      return new NextResponse("The amount must be greater than 0.", { status: 500 });
    }

    const ethAmount = parseUnits(amount.toString(), 18)


    const fromAccount = web3js.eth.accounts.privateKeyToAccount('0x' + privateKey.toString('hex'));
    web3js.eth.accounts.wallet.add(fromAccount);

    const transferFromMethod = contract.methods['transferFrom'] as any;
    const transferFromData = transferFromMethod(user, merchant, ethAmount).encodeABI();
    const gasPrice = await web3js.eth.getGasPrice();

    const txData = {
      to: contractAddress,
      data: transferFromData,
      from: fromAccount.address,
      //gas: estimatedGas.toString(),
      gas: web3js.utils.toHex(60000),
      gasPrice: gasPrice,
    };



    const signedTx = await web3js.eth.accounts.signTransaction(txData, fromAccount.privateKey);
    const receipt = await web3js.eth.sendSignedTransaction(signedTx.rawTransaction!);
    //console.log('[CONVERSATION_RECEIPT]', receipt);
    
    // Convert the receipt to a format that can be serialized as JSON
    const receiptForSerialization = convertBigIntToString(receipt);


    try {
      const bodyTx = {
        id: paymentId,
        hash: await receiptForSerialization.blockHash,
      }

      const bodyTxString = JSON.stringify(bodyTx);
    
      const url = process.env.SUPABASE_URL!;
    
      const headers = {
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`, // Removed the extra curly braces around the key.
          'Content-Type': 'application/json'
      };
    
      await fetch(url, {
          method: 'POST',
          headers: headers,
          body: bodyTxString
      })
      .then(async response => {
          if (!response.ok) {
              // If the response isn't a 200 OK status, read it as text and throw an error
              const text = await response.text();
            throw new Error(text);
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error("There was an error:", error);
      });
    } catch (error) {
      return new NextResponse("Database Error", { status: 500 });
    
    }
    
    return NextResponse.json(receiptForSerialization);
  } catch (error : any) {
    if (error?.code! ==1100) {
      return new NextResponse('Invalid address', { status: 401 });
    }
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
