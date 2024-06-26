import { ChangeEvent, useState } from "react";
import Button from "../shared/Button";
import ButtonOutline from "../shared/ButtonOutline";
import Card from "../shared/Card";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { useRouter } from "next/router";
import { HIGHER_CONTRACT_ADDRESS, SEPOLIA_CONTRACT_ADDRESS, TOKEN_NAME } from "@/lib/utils";
import toast from "react-hot-toast";

const AddMoney = () => {
  const ethAmounts = ["100", "500", "1000", "5000"];
  const [selectedAmount, setSelectedAmount] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(
    `Welcome to the other side my fren, enjoy the $${TOKEN_NAME}`
  );

  const { address, chainId } = useAccount();
  const { data: balanceData, isSuccess: balanceSuccess } = useBalance({
    address,
    token: chainId === 8453 ? HIGHER_CONTRACT_ADDRESS : SEPOLIA_CONTRACT_ADDRESS,
  });

  const router = useRouter();

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(event.target.value);
  };

  const handleSend = () => {
    if(selectedAmount == "" || email == "") return;
    // validate email
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(email)) {
      toast.error("Invalid email address", {
        position: "top-center",
      });
      return;
    }

    router.push(
      `/confirm?amount=${selectedAmount}&email=${email}&note=${note}`
    )
  }

  return (
    <Card>
      <div className="font-sans flex justify-between pb-4 flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-3/5 w-full">
          <label
            htmlFor="higherAmount"
            className="text-dark-grey lg:text-base text-sm leading-loose tracking-tighter"
          >
            Enter {balanceData?.symbol} to send
            <div className="bg-beige rounded-xl px-4 sm:px-8 flex gap-1 items-center mt-2 lg:w-fit w-full justify-between">
              <input
                id="higherAmount"
                placeholder={`1 ${balanceData?.symbol}`}
                className="bg-beige outline-none py-4"
                value={selectedAmount}
                onChange={handleAmountChange}
              />
              <button
                type="button"
                className="text-dark-grey font-sans lg:text-md text-sm"
                onClick={() =>
                  balanceData &&
                  setSelectedAmount(formatEther(balanceData?.value).slice(0, 6))
                }
              >
                max
              </button>
            </div>
          </label>
          <p className="text-dark-grey lg:text-base leading-loose tracking-tighter mt-4 text-sm">
            OR choose from
          </p>
          <div className="flex gap-4 mt-2 w-fit flex-wrap">
            {ethAmounts.map((amount) => (
              <label
                key={amount}
                className={`text-sm text-center leading-loose font-medium py-3 px-6 border border-solid rounded-xl border-dark-purple cursor-pointer ${selectedAmount === amount
                    ? "bg-dark-purple text-white"
                    : " text-dark-purple"
                  }`}
              >
                <input
                  type="radio"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  style={{ display: "none" }}
                />
                {amount}
              </label>
            ))}
          </div>
          <label
            htmlFor="recipientEmail"
            className="text-dark-grey lg:text-base text-sm leading-loose tracking-tighter flex flex-col mt-8"
          >
            Recipient&apos;s Email
            <input
              id="recipientEmail"
              type="email"
              placeholder="Enter Recipient's Email Address"
              className="bg-beige rounded-xl px-4 sm:px-8 py-4 flex gap-4 items-center mt-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="lg:flex lg:flex-col lg:justify-between items-start lg:items-end w-full lg:gap-4">
          <label className="text-dark-grey lg:text-base text-sm leading-loose tracking-tighter flex flex-col">
            Add a Note (Optional)
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-beige rounded-xl px-4 sm:px-8 py-4 mt-2 lg:w-[30vw] h-28 resize-none outline-none w-full"
            />
          </label>
          <div className="flex gap-4 mt-4 flex-wrap justify-end">
            <ButtonOutline
              content="Cancel"
              onClick={() => router.push("/dashboard")}
            />
            <Button
              content="SEND"
              onClick={handleSend}
              disabled={selectedAmount == "" || email == ""}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddMoney;
