import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode, faCubes, faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Boop from '../components/boop';
import Link from 'next/link';

function LinkWithTooltip({ id, children, href, tooltip }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="bottom"
      delayShow={300}
      delayHide={150}
    >
      <span style={{ display: 'inline-block', width: 40, height: 40, verticalAlign: 'middle', textAlign: 'center', lineHeight: '40px' }}>
        <Link href={href} style={{ display: 'inline-block', width: '100%', height: '100%' }}>{children}</Link>
      </span>
    </OverlayTrigger>
  );
}

export default function NavBar(props) {
  return (
  <div>
    <ul>
      <li>
        <LinkWithTooltip href="/views/about" tooltip="About Me 🙆‍♂️">
          <Boop x={-4} y={4} timing={200}>
              <FontAwesomeIcon icon={faBook} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </LinkWithTooltip>
      </li>
      <li>
        <LinkWithTooltip href="/views/experiences" tooltip="My experiences 💼">
          <Boop rotation={-20} timing={200}>
            <FontAwesomeIcon icon={faBriefcase} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </LinkWithTooltip>
      </li>
      <li>
        <LinkWithTooltip href="/home" tooltip="Home 🏡">
          <Boop scale={1.3} timing={200}>
            <FontAwesomeIcon icon={faHome} style={{ opacity: 1, color:'white', }} size="xl" />
          </Boop>
        </LinkWithTooltip>
      </li>
      <li>
        <LinkWithTooltip href="/views/projects" tooltip="Projects 🚀">
          <Boop rotation={20} timing={200}>
            <FontAwesomeIcon icon={faCubes} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </LinkWithTooltip>
      </li>
      <li>
        <LinkWithTooltip href="/views/cli" tooltip="Sam CLI 📱">
          <Boop x={4} y={4} timing={200}>
            <FontAwesomeIcon icon={faCode} style={{ opacity: 1, color:'white', }} />
          </Boop>
        </LinkWithTooltip>
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