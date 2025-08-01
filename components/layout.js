import globalStyles from "../styles/global";

import Head from "next/head";
import Image from 'next/image';

import NavBar from "./navbar";

export default function Layout(props) {
  return (
    <div className="page-layout">
      <Head>
        <title>Sam - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      {props.children}
      <style jsx global>
        {globalStyles}
      </style>

      <style jsx>{`
        a {
          color: inherit;
          text-decoration: none;
        }
        .logo {
          height: 1.5em;
        }
        .linkPowered {

        }
      `}</style>
    </div>
  );
}