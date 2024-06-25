import { useRouter } from "next/router";
import Button from "../shared/Button";
import { Button as ShadButton } from "../ui/button";
import Card from "../shared/Card";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { base } from "viem/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";
import splitbee from "@splitbee/web";
import { TOKEN_NAME } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";

const ClaimDegen = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [loading, setLoading] = useState(false);
  const [claimData, setClaimData] = useState<any>({});
  const [allowExport, setAllowExport] = useState(false);
  const [claimStarted, setClaimStarted] = useState(false);

  const { login, user, exportWallet, ready, authenticated } = usePrivy();

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
          router.push("/claim/dashboard");
        } else {
          toast.error("Tip has already been claimed!");
          router.push("/claim/dashboard");
        }
      } else {
        toast.error("This Claim doesn't exist!");
      }
    } else {
      toast.error("This Claim doesn't exist!");
    }
    toast.dismiss();
    setLoading(false);
  };
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleClaimDetails = async (claim_uid: string) => {
    try {
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("claim_uid", claim_uid);

      return { data, error };
    } catch (error) {
      console.error("Error fetching claim details", error);
    }
  };

  // get the details of the claim
  // check if the claim has been claimed
  useEffect(() => {
    console.log("UID ", uid);
    if (uid) {
      handleClaimDetails(uid.toString()).then(({ data, error }: any) => {
        if (!error && data.length > 0) {
          setClaimData(data[0]);
        } else {
          toast.error("This Claim doesn't exist!");
        }
      });
    }
  }, [uid]);

  useEffect(() => {
    if (user?.wallet?.address && !claimStarted) {
      setLoading(true);
      console.log("CLAIM STARTED");
      setClaimStarted(true);
      handleClaim().then(() => {
        setLoading(false);
      }).catch((e) => {
        console.error("ERROR ", e);
        setLoading(false);
      })
    }
  }, [user?.wallet?.address]);

  console.log("CLAIM DATA ", user?.wallet?.address, claimData, loading);
  const handleDashboard = () => {
    if(user?.wallet?.address) {
      router.push("/claim/dashboard");
    } else {
      login()
    }
  }

  return (
    <div>
      <div className="font-sans text-white text-2xl font-bold leading-loose  select-none bg-center py-12 rounded-t-[32px] text-center   bg-[url('/background.svg')] bg-[#33106D] [text-shadow:_0_4px_0_rgb(146_97_225_/_100%)]">
        CLAIM ${TOKEN_NAME}
      </div>
      {claimData && claimData.claimed ? (
        <Card>
          <div className="flex flex-col items-center py-12 sm:px-12 px-6">
            <h3 className="text-black font-sans text-lg font-medium leading-[150%] mb-6 text-center">
              This Claim has already been claimed
            </h3>
            <Button content={`Go to Dashboard`} onClick={() => handleDashboard()} />
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-col items-center py-12 sm:px-12 px-6">
            <h3 className="text-black font-sans text-lg font-medium leading-[150%] mb-6 text-center">
              Here&apos;s you Golden Ticket into
              <br /> the world of Web3
            </h3>
            {ready && user && authenticated ? (
              allowExport ? (
                <Button content={`Go to Dashboard`} onClick={() => handleDashboard()} />
              ) : (
                <Button
                  content={`Claim $${TOKEN_NAME}`}
                  onClick={login}
                  disabled={loading}
                />
              )
            ) : (
              <Button
                content={`Claim ${claimData.amount ?? ""} $${TOKEN_NAME}`}
                onClick={login}
                disabled={loading}
              />
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ClaimDegen;
