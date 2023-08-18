import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import { Badge } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

function ObjectRow(experience) {
      return (
        <Card 
          bg="dark"
          text="white"
          style={{width: '20vh', height:'35vh', margin: 10 }}
          key={experience.business+experience.title} className="linkcard">
            <Card.Img variant="left" src={experience.imageUrl} style={
              { margin: 10,
              }} />
            <Card.Body>
              <Card.Title><b>{experience.business}</b></Card.Title>
              <Card.Text>
                <b>{experience.title}</b>
              </Card.Text>
              <div className='badgeArea'>
                <Badge bg="primary">Devops</Badge>
              </div>
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
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
            >
              <div className='dataCircle'>
                <h5 style={{ borderBottom: "1px solid" }}>2 years</h5>
                <h6>From 2018</h6>
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FontAwesomeIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <h5>
                Eat
              </h5>
              <Typography>Because you need strength</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
            >
              10:00 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Code
              </Typography>
              <Typography>Because it&apos;s awesome!</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <HotelIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Sleep
              </Typography>
              <Typography>Because you need rest</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
              <TimelineDot color="secondary">
                <RepeatIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Repeat
              </Typography>
              <Typography>Because this is the life you love!</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: center;
          background-color: transparent;
          color: #F9F9F9;
        }

        .dataCircle {
          width: 100px;
          height: 100px;
          flex: 1;
          flex-direction: column;
          display: flex;
          border-radius: 50%;
          background-color: #1976d2;
          color: black;
          justify-content: center;
          align-items: center;
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

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
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
