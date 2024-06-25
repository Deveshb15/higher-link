import * as React from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { TOKEN_NAME } from "@/lib/utils";

export function Email({
  uid,
  note,
  seed,
  amount,
}: {
  uid: string;
  note?: string;
  seed: string;
  amount: number;
}) {
  return (
    <Html>
      <Head />
      <Body>
        <Container style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>
          <Section
            style={{
              width: "100%",
              background:
                'url("https://res.cloudinary.com/metapass/image/upload/v1712576165/Screenshot_2024-04-08_at_5.05.56_PM_njc4kh.png")',
              backgroundSize: "cover",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Space Mono, monospace",
                fontWeight: "bold",
                fontSize: "1.5rem",
                lineHeight: "2.5rem",
                textShadow: "0 4px 0 rgba(146, 97, 225, 1)",
                paddingTop: "2rem",
              }}
            >
              ${TOKEN_NAME}LINK
            </Text>
            <Heading
              as="h2"
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Space Mono,monospace",
                fontSize: "2rem",
                lineHeight: "2.5rem",
                letterSpacing: "-0.025em",
                marginTop: "2.5rem",
                padding: "0 4rem 4rem 4rem",
              }}
            >
              GM, your OnChain journey begins today.
            </Heading>
          </Section>
          <Section
            style={{
              padding: "3rem 2rem",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#33106D",
                textAlign: "center",
                fontSize: "1.125rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              Hey 👋
            </Text>
            <Text
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
              You just received {amount} ${TOKEN_NAME}
            </Text>
            {note && (
              <Text
                style={{
                  color: "#121212",
                  fontSize: "1rem",
                  lineHeight: "120%",
                  fontWeight: "normal",
                  textAlign: "center",
                  padding: "1.5rem 2rem",
                  margin: "0 2rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "#EEE",
                }}
              >
                {note}
              </Text>
            )}
            <Section style={{}}>
              <Section
                style={{
                  maxWidth: "18rem",
                  marginBottom: "2rem",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "1.125rem",
                    lineHeight: "150%",
                    marginBottom: "2rem",
                  }}
                >
                  Now, Click the below link to Claim your ${TOKEN_NAME}.
                </Text>
                <Link
                  href={`https://higher-link.vercel.app/claim?uid=${uid}`}
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
                </Link>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default Email;
