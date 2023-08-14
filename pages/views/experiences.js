import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCubes, faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import Image from "next/image"

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function ObjectRow(experience) {
    const image = experience.imageUrl ? (<Image
      src={experience.imageUrl}
      width={60}
      height={60}
      alt="test"
      style={{ float: "left", display: "inline-block", marginTop: 5, marginRight: 10 }}
    />) : (<FontAwesomeIcon icon={faBriefcase} style={{ float: "left", display: "inline-block", marginTop: 6, marginRight: 10 }} size="3x" />);

    return (
      <div key={experience.business+experience.title} className="linkcard">
          {image}
          <h3>{experience.business}</h3>
          <b>{experience.title}</b>
          <p>{experience.description}</p>
        </div>
    );
}

export default function Experiences() {
  const { t } = useTranslation('experiences');
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  if (error) return <div> 500 - Failed to load</div>;
  if (!data || isLoading) return <div> Loading...</div>;
  
  const evalData = JSON.parse(data);
  const rows = [];
  for (let i = 0; i < evalData.experiences.length; i++) {
    rows.push(ObjectRow(evalData.experiences[i]));
  }
  return (
    <div className="container">
      <main>
        <h1 className="title">
          {t('title')}
        </h1>
        
        <div className="grid">
          {rows}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          color: #F9F9F9;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: center;
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
          margin-top: 3rem;
        }

        .linkcard {
          margin: 1rem;
          flex-basis: 100%;
          display: inline-block;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
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
