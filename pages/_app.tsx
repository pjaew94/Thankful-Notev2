import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import React from "react";
import Head from "next/head";

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return   <React.StrictMode>
     <Head>
            <title>Thankful Notes</title>
            <link rel="shortcut icon" href="/groupImg.png" />
          </Head>
     <Component {...pageProps} /></React.StrictMode>
}

export default MyApp
