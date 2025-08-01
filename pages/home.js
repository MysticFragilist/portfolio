import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";

import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCubes, faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import SpecialOrbShower from "../components/special-orb-shower";

export default function Home() {
  const { t } = useTranslation('home');
  var router = useRouter();

  return (
    <div className="container">
      <main>
        <SpecialOrbShower/>

        <h1 className="title">
          {t('welcome')}<a href="/views/home">{t('portfolio')}</a>
          <motion.div
            animate={{ rotate: [null, 30, -20, 30, -20, 0] }}
            transition={{ duration: 1.5 }}
            style={{ display: "inline-block" }}
          >
            👋
          </motion.div>
        </h1>
        <p className="description">
          {t('created')}<code>Samuel Montambault</code>
        </p>

        <div className="grid">
          <a
            onClick={() => router.push('/views/about')}
            className="linkcard"
          >
            <FontAwesomeIcon icon={faCubes} />&nbsp;
            <h3 className="inline">{t('projects-title')} &rarr;</h3>
            <p>{t('projects-description')}</p>
          </a>

          <a
            onClick={() => router.push('/views/cli')}
            className="linkcard"
          >
            <FontAwesomeIcon icon={faCode} />&nbsp;
            <h3 className="inline">Sam CLI &rarr;</h3>
            <Badge bg="primary" pill="true" style={{ display: "inline-block", float: "right" }}>new</Badge>
            <p>{t('cli-description')}</p>
          </a>

          <a
            onClick={() => router.push('/views/experiences')}
            className="linkcard"
          >
            <FontAwesomeIcon icon={faBriefcase} />&nbsp;
            <h3 className="inline">{t('experiences-title')} &rarr;</h3>
            <p>
              {t('experiences-description')}
            </p>
          </a>
          
          <a
            onClick={() => router.push('/views/about')}
            className="linkcard"
          >
            <FontAwesomeIcon icon={faBook} />&nbsp;
            <h3 className="inline">{t('about-title')} &rarr;</h3>
            <p>{t('about-description')}</p>
          </a>

        </div>
      </main>

      <style jsx>{`
        .container {
          height: 95vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          color: #F9F9F9;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #393D47;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #5584F1;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          display: inline-block;
          background: #393D47;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          color: #C17B1F;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
        }

        .linkcard {
          margin: 0.5rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          cursor: pointer;
        }

        .linkcard:hover,
        .linkcard:focus,
        .linkcard:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .linkcard h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .linkcard p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        
        .inline {
          display: inline-block;
        }
        
        .badgeNew {
          display: inline-block;
          margin: 0 0 1rem 0;
          float: right;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
