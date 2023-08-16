import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCubes, faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import Image from "next/image"
import Card from 'react-bootstrap/Card';
import SpecialOrbShower from "../../components/special-orb-shower";
import Carousel from 'react-bootstrap/Carousel';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function ObjectRow(experience) {
      return (
        <Card 
          bg="dark"
          text="white"
          style={{width: '41vh', margin: 10 }}
          key={experience.business+experience.title} className="linkcard">
            <Card.Img variant="left" src={experience.imageUrl} />
            <Card.Body>
              <Card.Title><b>{experience.business}</b></Card.Title>
              <Card.Text>
                <b>{experience.title}</b>
              </Card.Text>
              <div style={{ fontSize:13}} dangerouslySetInnerHTML={{__html: experience.description}} />
            </Card.Body>
          </Card>
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
          margin-top: 3rem;
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
