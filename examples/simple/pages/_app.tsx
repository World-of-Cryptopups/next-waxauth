import WaxAuthProvider from "next-waxauth";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const endpoint = "https://wax.greymass.com"
const chainId = "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WaxAuthProvider net={{endpoint, chainId, dApp: "simpleapp"}}>
      <Component {...pageProps} />
    </WaxAuthProvider>
  );
}
export default MyApp;
