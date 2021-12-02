import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import React from "react";
import Head from "next/head";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import type { AppProps } from "next/app";

export const languageState = atom<boolean>({
  key: "languageState",
  default: false
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Head>
        <title>Thankful Notes</title>
        <link rel="shortcut icon" href="/groupImg.png" />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </React.StrictMode>
  );
}

export default MyApp;
