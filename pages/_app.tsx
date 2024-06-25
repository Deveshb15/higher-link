import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { Space_Mono, Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import Layout from "@/components/shared/Layout";
import splitbee from "@splitbee/web";

import { PrivyProvider } from "@privy-io/react-auth";

const config = getDefaultConfig({
  appName: "HigherLINK",
  projectId: "7febbd905df720d5866a44b58cd1b1a9",
  chains: [base, baseSepolia],
  // chains: [base],
});
const queryClient = new QueryClient();

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const rainbowKitTheme = darkTheme({
  accentColor: "#9261E1",
  accentColorForeground: "white",
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "large",
});

export default function App({ Component, pageProps }: AppProps) {
  splitbee.init();
  return (
    <div className={`${spaceMono.variable} ${inter.variable}`}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <PrivyProvider
            appId="clxuu09lm09xly8o9hillhm1a"
            config={{
              loginMethods: ["email"],
              defaultChain: base,
              supportedChains: [base, baseSepolia],
              embeddedWallets: {
                createOnLogin: "users-without-wallets", // defaults to 'off'
              },
            }}
          >
            <RainbowKitProvider theme={rainbowKitTheme}>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <Layout>
                  <Component {...pageProps} />
                </Layout>
                <GoogleAnalytics gaId="G-EBMRHG4GXX" />
                <Toaster
                  toastOptions={{
                    position: "top-right",
                    className: `${inter.className}`,
                  }}
                />
              </ThemeProvider>
            </RainbowKitProvider>
          </PrivyProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
