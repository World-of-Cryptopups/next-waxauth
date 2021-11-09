import WaxAuthProvider from "@cryptopuppie/next-waxauth";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const endpoint = "https://waxtestnet.greymass.com";
const chainId =
  "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WaxAuthProvider net={{ endpoint, chainId, dApp: "simpleapp" }}>
      <Component {...pageProps} />
    </WaxAuthProvider>
  );
}
export default MyApp;
