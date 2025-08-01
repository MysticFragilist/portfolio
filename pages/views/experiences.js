import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import ExperienceCard from '../../components/ExperienceCard';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Experiences() {
  const { t } = useTranslation('experiences');
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  if (error) return <div> 500 - Failed to load</div>;
  if (!data || isLoading) return <div> Loading...</div>;
  
  const evalData = JSON.parse(data);
  const rows = [];
  for (let i = 0; i < evalData.experiences.length; i++) {
    rows.push(<ExperienceCard key={i} experience={evalData.experiences[i]} />);
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
          height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: left;
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

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
          padding: 0 1rem;
        }

        .card-container {
          display: flex;
          justify-content: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .badgeArea {
          display: block;
          width: 100%;
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