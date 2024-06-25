import Card from "../shared/Card";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAccount, useBalance } from "wagmi";
import { TOKEN_NAME, shortenAddress } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";

type Transaction = {
  type: string;
  amount: number;
  recipient?: `0x${string}`;
  email?: string;
  sender?: `0x${string}`;
  hash: string;
};

const TransactionHistory = () => {
  // Dummy transaction data
  // const transactions = [
  //   {
  //     id: 1,
  //     type: "gift",
  //     amount: 1000,
  //     recipient: "akhil.balantrapu@gmail.com",
  //     sender: null,
  //   },
  //   {
  //     id: 2,
  //     type: "gift",
  //     amount: 1000,
  //     recipient: "akhil.balantrapu@gmail.com",
  //     sender: null,
  //   },
  //   {
  //     id: 3,
  //     type: "receive",
  //     amount: 1000,
  //     recipient: null,
  //     sender: "akhil.balantrapu@gmail.com",
  //   },
  // ];

  const router = useRouter()

  const { address, isConnected, chainId } = useAccount();
  const { user, authenticated } = usePrivy();

  useEffect(() => {
    if (!isConnected && !authenticated) {
      router.push('/')
    }
  })

  const { data: transactions } = useQuery({
    queryKey: ["TransactionHistory"],
    queryFn: async () => {
      const { data: senderData, error: senderError } = await supabase
        .from("tips")
        .select("*")
        .eq("sender", address);
      
      const { data: recipientData, error: recipientError } =
        await supabase
          .from("tips")
          .select("*")
          .eq("recipient_address", address?.length ? address : user?.wallet?.address);
      if (!senderError && !recipientError) {
        let transactions: Array<Transaction> = [];
        senderData.forEach((data) => {
          transactions.push({
            type: "gift",
            amount: data.amount,
            recipient: data.recipient_address,
            email: data.recipient,
            sender: address,
            hash: data.sender_hash,
          });
        });
        recipientData.forEach((data) => {
          transactions.push({
            type: "receive",
            amount: data.amount,
            sender: data.sender,
            email: data.recipient,
            recipient: address,
            hash: data.recipient_hash,
          });
        });
        return transactions;
      } else {
        return [];
      }
    },
  });

  const balance = useBalance({
    address,
  });

  return (
    <Card>
      {(!isConnected && !authenticated) ? (
        <div className="flex items-center justify-center h-[20vh] px-4">
          <p className="text-light-grey text-center font-sans font-medium text-base">
            Please your Connect Wallet
          </p>
        </div>
      ) : transactions?.length != 0 ? (
        <>
          <h3 className="font-sans text-base font-medium leading-loose text-light-grey">
            Transaction History
          </h3>
          <ul className="mt-9 flex flex-col gap-9 max-h-[24vh] overflow-x-auto">
            {transactions &&
              transactions.map((transaction: Transaction) => (
                <li
                  className="flex justify-between"
                  key={transaction.amount + transaction.type}
                >
                  {transaction.type === "gift" && (
                    <p className="text-grey font-sans text-base font-normal leading-loose ">
                      <span className="font-bold text-dark-purple">
                        {transaction.amount} ${TOKEN_NAME}
                      </span>{" "}
                      to{" "}
                      <Link
                        target="_blank"
                        href={`https://rainbow.me/${transaction.recipient}`}
                        className="font-bold"
                      >
                        {/* {shortenAddress(
                          transaction.recipient as `0x${string}`,
                          0,
                          5
                        )} */}
                        {transaction.email}
                      </Link>{" "}
                    </p>
                  )}
                  {transaction.type === "receive" && (
                    <p className="text-grey font-sans text-base font-normal leading-loose ">
                      <span className="font-bold text-dark-purple">
                        {transaction.amount} $HIGHER
                      </span>{" "}
                      from{" "}
                      <Link
                        target="_blank"
                        href={`https://rainbow.me/${transaction.sender}`}
                        className="font-bold"
                      >
                        {shortenAddress(
                          transaction.sender as `0x${string}`,
                          0,
                          5
                        )}
                      </Link>{" "}
                    </p>
                  )}
                  <Link
                    href={`https://basescan.org/tx/${transaction.hash}`}
                    target="_blank"
                    className="flex items-center gap-1 text-grey font-sans text-base font-normal leading-loose"
                  >
                    <span className="hidden sm:block">
                      view tx
                    </span>
                    <Image
                      src="/arrow-up-right-black.svg"
                      width={16}
                      height={16}
                      alt="arrow top right icon"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <div className="flex items-center justify-center h-[20vh] px-4">
          <p className="text-light-grey text-center font-sans font-medium text-base">
            No Transactions Yet. Start by Gifting someone :)
          </p>
        </div>
      )}
    </Card>
  );
};

export default TransactionHistory;
