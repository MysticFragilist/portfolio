import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode, faCubes, faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";

import Link from 'next/link';

export default function NavBar(props) {
  return (
  <div>
    <ul>
      <li><Link href="/about">
        <FontAwesomeIcon icon={faBook} style={{ opacity: 1 }} /></Link>
      </li>
      <li><Link href="/experiences">
        <FontAwesomeIcon icon={faBriefcase} /></Link>
      </li>
      <li><Link href="/home">
        <FontAwesomeIcon icon={faHome} size="lg" />
        </Link></li>
      <li><Link href="/projects">
        <FontAwesomeIcon icon={faCubes} /></Link>
      </li>
      <li><Link href="/cli">
        <FontAwesomeIcon icon={faCode} /></Link>
      </li>
    </ul>
    <style jsx>{`
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: transparent;
          border-bottom: 1px solid #393D47;
          text-align: center;
        }
        
        li {
          display: inline-block;
        }
        
        li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }
        
        /* Change the link color to #111 (black) on hover */
        li a:hover {
          background-color: #111;
          opacity: 0.6;
        }
      `}</style>
  </div>);
}