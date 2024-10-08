import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import axios from "axios";
import { VersionedTransaction, Connection } from "@solana/web3.js";

import { API_URL } from "@/config/constants";

export type TransactionInfoProp = {
  time: Date;
  action: string;
  fromAmount: number;
  fromToken: string;
  toAmount: number;
  toToken: string;
  platform: string;
};

const calculateRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInSeconds / 3600);

    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);

      if (diffInMinutes === 0) {
        return "just now";
      }

      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);

  return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
};

const TransactionInfo = ({
  time,
  action,
  fromAmount,
  fromToken,
  toAmount,
  toToken,
  platform,
}: TransactionInfoProp) => {
  const relativeTime = calculateRelativeTime(time);
  const wallet = useWallet();

  const swapTransaction = async () => {
    if (!wallet || !wallet.publicKey) return;
    const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken}&outputMint=${toToken}&amount=10000&slippageBps=1500`;
    const res = await axios.get(quoteUrl);

    const swapTransactionResponse = await axios.post(
      "https://quote-api.jup.ag/v6/swap",
      {
        quoteResponse: res.data,
        userPublicKey: wallet.publicKey.toBase58(),
        wrapAndUnwrapSol: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    const swapTransaction = swapTransactionResponse.data;

    console.log(swapTransaction);
    const swapTransactionBuf = Buffer.from(
      swapTransaction.swapTransaction,
      "base64",
    );
    const swapTransactionArray = new Uint8Array(swapTransactionBuf);
    const transaction = VersionedTransaction.deserialize(swapTransactionArray);

    if (wallet?.sendTransaction) {
      const connection = new Connection("https://api.mainnet.solana.com");

      const signature = await wallet.sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "processed");
    }

    console.log(swapTransaction);
  };

  return (
    <div className="w-full flex flex-row justify-between py-2 px-4 items-center space-x-4">
      {/* Time Information */}
      <div className="text-purple-400 text-sm w-24">{relativeTime}</div>

      {/* Transaction Information */}
      <div className="flex items-center space-x-2 flex-1">
        <button
          className="bg-orange-500 text-black text-xs px-2 py-1 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            swapTransaction();
          }}
        >
          {action}
        </button>
        <span className="text-gray-400 text-xs">
          {fromAmount} {fromToken}
        </span>
        <span className="text-xs text-gray-400">for</span>
        <span className="text-gray-400 text-xs">
          {toAmount} {toToken}
        </span>
        <span className="text-xs text-gray-400">on</span>
        <span className="text-gray-400 text-xs">{platform}</span>
      </div>
    </div>
  );
};

export type TokenInfo = {
  mintAddress: string;
  amount: number;
};

export type TxSwapInfo = {
  buy: TokenInfo;
  sell: TokenInfo;
  block: {
    time: number;
    height: number;
  };
  transaction: {
    signature: string;
    feePayer: string;
    signer: string;
  };
};

const TransactionComponent = ({ address }: { address: string }) => {
  const [transactions, setTransactions] = React.useState<TxSwapInfo[]>([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const url = API_URL + "/api/v1/txs/get_swap";
      const res = await axios.get<TxSwapInfo[]>(url, {
        params: {
          address,
        },
      });

      setTransactions(res.data as TxSwapInfo[]);
    };

    fetchTransactions();
  }, [address]);

  return (
    <div className="w-full flex flex-col gap-4">
      {transactions.map((transaction, index) => (
        <TransactionInfo
          key={index}
          action="Swap"
          fromAmount={transaction.sell.amount}
          fromToken={transaction.sell.mintAddress}
          platform="Raydium"
          time={new Date(transaction.block.time)}
          toAmount={transaction.buy.amount}
          toToken={transaction.buy.mintAddress}
        />
      ))}
    </div>
  );
};

export default TransactionComponent;
