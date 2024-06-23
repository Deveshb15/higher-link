import { useRouter } from "next/router";
import Button from "../shared/Button";
import { Button as ShadButton } from "../ui/button";
import Card from "../shared/Card";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { base } from "viem/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";
import splitbee from "@splitbee/web";
import { TOKEN_NAME } from "@/lib/utils";

const ClaimDegen = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [loading, setLoading] = useState(false);
  const handleClaim = async () => {
    setLoading(true);
    toast.loading("Starting Claim");
    if (uid) {
      splitbee.track("Click Claim Button");
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("claim_uid", uid);

      console.log("DATA ", data, error);
      if (!error && data.length > 0) {
        const hasClaimed = data[0].claimed;
        if (!hasClaimed) {
          setTimeout(() => {
            toast.success(
              "Queued the claim, should reflect in your wallet soon"
            );
            setLoading(false);
          }, 5000);
          const {
            data: { hash },
          } = await axios.post<{ hash: string }>("/api/claim", {
            uid,
            chain: data[0].chain,
          });
          if (hash) {
            toast.success("Sucessfully Claimed the Tip!");
            setTimeout(() => {
              router.push("/");
            }, 3000);
          } else {
            toast.error("Something went wrong, contact the team.");
          }
        } else {
          toast.error("Tip has already been claimed!");
        }
      } else {
        toast.error("This Claim doesn't exist!");
      }
    } else {
      toast.error("This Claim doesn't exist!");
    }
    setLoading(false);
  };
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const handleAdd = async () => {
    await walletClient?.addChain({ chain: base });
    toast.success(`Successfully added ${TOKEN_NAME} Chain to wallet`);
  };
  return (
    <div>
      <div className="font-sans text-white text-2xl font-bold leading-loose  select-none bg-center py-12 rounded-t-[32px] text-center   bg-[url('/background.svg')] bg-[#33106D] [text-shadow:_0_4px_0_rgb(146_97_225_/_100%)]">
        CLAIM ${TOKEN_NAME}
      </div>
      <Card>
        <div className="flex flex-col items-center py-12 sm:px-12 px-6">
          <h3 className="text-black font-sans text-lg font-medium leading-[150%] mb-6 text-center">
            Here&apos;s you Golden Ticket into
            <br /> the world of Web3
          </h3>
          <Button
            content={`CLAIM $${TOKEN_NAME}`}
            onClick={handleClaim}
            loading={loading}
          />
        </div>
        <div className="flex flex-col items-center pb-4 sm:px-12 px-6">
          <p className="text-[#626363] font-sans text-sm leading-[150%] mb-6 text-center">
            To View your Balance
          </p>
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <ShadButton
              variant="ghost"
              className="py-6 px-8 rounded-xl font-bold text-center font-sans text-base leading-loose border border-dark-purple border-solid text-dark-purple"
              onClick={handleAdd}
            >
              Add {TOKEN_NAME} to Wallet
            </ShadButton>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ClaimDegen;
