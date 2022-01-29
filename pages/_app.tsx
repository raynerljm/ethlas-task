import "../styles/globals.css";
import type { AppProps } from "next/app";
import MyHead from "../components/MyHead";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyHead />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
