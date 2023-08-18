import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode, faCubes, faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";

import Boop from '../components/boop';
import Link from 'next/link';

export default function NavBar(props) {
  return (
  <div>
    <ul>
      <li>
        <Link href="/views/about">
          <Boop x={-4} y={4} timing={200}>
            <FontAwesomeIcon icon={faBook} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </Link>
      </li>
      <li>
        <Link href="/views/experiences">
          <Boop rotation={-20} timing={200}>
            <FontAwesomeIcon icon={faBriefcase} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </Link>
      </li>
      <li>
        <Link href="/home">
          <Boop scale={1.3} timing={200}>
            <FontAwesomeIcon icon={faHome} style={{ opacity: 1, color:'white', }} size="xl" />
          </Boop>
        </Link>
      </li>
      <li>
        <Link href="/views/projects">
          <Boop rotation={20} timing={200}>
            <FontAwesomeIcon icon={faCubes} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </Link>
      </li>
      <li>
        <Link href="/views/cli">
          <Boop x={4} y={4} timing={200}>
            <FontAwesomeIcon icon={faCode} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </Link>
      </li>
    </ul>
    <style jsx>{`
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          padding-top: 10px;
          padding-bottom: 10px;
          overflow: hidden;
          background-color: transparent;
          text-align: center;
        }
        
        li {
          display: inline-block;
          margin-left: 1em;
          color: white;
        }

        .iconMenu{
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
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