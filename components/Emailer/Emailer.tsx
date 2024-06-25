/* eslint-disable @next/next/no-img-element */

import { TOKEN_NAME } from "@/lib/utils";

const Emailer = ({
  uid,
  note,
  seed,
  amount
}: {
  uid: string;
  note?: string;
  seed: string;
  amount: number
}) => {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <header
        style={{
          padding: "4rem 2rem",
          background:
            'url("https://res.cloudinary.com/metapass/image/upload/v1712576165/Screenshot_2024-04-08_at_5.05.56_PM_njc4kh.png")',
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Space Mono, monospace",
            fontWeight: "bold",
            fontSize: "1.5rem",
            lineHeight: "2.5rem",
            textShadow: "0 4px 0 rgba(146, 97, 225, 1)",
          }}
        >
          ${TOKEN_NAME}LINK
        </div>
        <h2
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Space Mono,monospace",
            fontSize: "2rem",
            lineHeight: "2.5rem",
            letterSpacing: "-0.025em",
            marginTop: "2.5rem",
            maxWidth: "32rem",
          }}
        >
          GM, your OnChain journey begins today.
        </h2>
      </header>
      <div
        style={{
          padding: "4.5rem 2rem",
          backgroundColor: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            color: "#33106D",
            textAlign: "center",
            fontSize: "1.125rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "150%",
            marginBottom: "2rem",
          }}
        >
          Hey 👋
          <br />
          <br />
          You just received {amount} ${TOKEN_NAME}
        </p>
        {note && (
          <p
            style={{
              color: "#121212",
              fontSize: "1rem",
              lineHeight: "120%",
              fontWeight: "normal",
              maxWidth: "30rem",
              textAlign: "center",
              padding: "1.5rem 2rem",
              borderRadius: "0.75rem",
              backgroundColor: "#EEE",
            }}
          >
            {note}
          </p>
        )}
        <h3
          style={{
            color: "#9261E1",
            textAlign: "center",
            fontSize: "1.5rem",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "150%",
            margin: "3rem 0",
          }}
        >
          How to Claim 👇
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "25rem",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "1.125rem",
                fontWeight: "bold",
                lineHeight: "150%",
                background: "#9261E1",
                borderRadius: "100%",
                width: "3rem",
                height: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              1
            </p>
            <p
              style={{
                color: "black",
                textAlign: "center",
                fontSize: "1.125rem",
                lineHeight: "150%",
                marginBottom: "2rem",
              }}
            >
              You need a wallet first. Install Rainbow Wallet from here.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <a
                target="_blank"
                href="https://rainbow.me/en/download"
                style={{
                  color: "black",
                  fontSize: "1rem",
                  lineHeight: "150%",
                  borderRadius: "0.75rem",
                  background: "#EEE",
                  padding: "1rem 1.3rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dczghbro7/image/upload/v1712657575/rainbowWallet_fwtssw.svg"
                  width="24"
                  height="24"
                  alt="Rainbow Wallet Logo"
                />
                Browser Extension
              </a>
              <a
                target="_blank"
                href="https://rnbwapp.com/e/mobile"
                style={{
                  color: "black",
                  fontSize: "1rem",
                  lineHeight: "150%",
                  borderRadius: "0.75rem",
                  background: "#EEE",
                  padding: "1rem 1.3rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dczghbro7/image/upload/v1712657575/rainbowWallet_fwtssw.svg"
                  width="24"
                  height="24"
                  alt="Rainbow Wallet Logo"
                />
                Mobile App
              </a>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "32rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "28rem",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  lineHeight: "150%",
                  background: "#9261E1",
                  borderRadius: "100%",
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                2
              </p>
              <p
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "1.125rem",
                  lineHeight: "150%",
                  marginBottom: "2rem",
                }}
              >
                Now, Import the below phrase into Rainbow. Simply Copy & Paste.
                <br />
                <br />
                This is your unique secret phrase, store/save it safe.
              </p>
            </div>
            <p
              style={{
                color: "black",
                textAlign: "center",
                fontSize: "1.125rem",
                lineHeight: "150%",
                fontWeight: "500",
                borderRadius: "1.5rem",
                border: "2px dashed rgba(146, 97, 225, 0.50)",
                background: "#EEE",
                padding: "1.5rem 2rem",
              }}
            >
              {seed}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "18rem",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "1.125rem",
                fontWeight: "bold",
                lineHeight: "150%",
                background: "#9261E1",
                borderRadius: "100%",
                width: "3rem",
                height: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              3
            </p>
            <p
              style={{
                color: "black",
                textAlign: "center",
                fontSize: "1.125rem",
                lineHeight: "150%",
                marginBottom: "2rem",
              }}
            >
              Now, Click the below link to Claim your ${TOKEN_NAME}.
            </p>
            <a
              href={`https://higher.tokemail.xyz/claim?uid=${uid}`}
              style={{
                textDecoration: "none",
                padding: "1rem 2rem",
                backgroundColor: "#9261E1",
                color: "white",
                border: "none",
                borderRadius: "0.75rem",
                fontWeight: "bold",
                fontSize: "1rem",
                width: "100%",
              }}
            >
              Claim ${TOKEN_NAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailer;
