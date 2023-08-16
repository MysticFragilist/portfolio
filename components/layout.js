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

      <footer>
          Made by Samuel Montambault
      </footer>

      <style jsx>{`
        a {
          color: inherit;
          text-decoration: none;
        }
        footer {
          z-index: 5;
          border-top: 1px solid #393D47;
          background-color: #2D3139;
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          margin-bottom: 1%; 
        }

        footer img {
          margin-left: 0.5rem;
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