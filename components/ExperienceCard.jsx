import { Badge } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function ExperienceCard({ experience }) {
  // Generate persistent colors for badges based on tag hash
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
  const getPersistentColor = (tag, lastColor = null) => {
    // Simple hash function for the tag
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      const char = tag.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Use absolute value and modulo to get consistent index
    let index = Math.abs(hash) % colors.length;
    
    // If this would be the same as the last color, shift to the next color
    if (lastColor && colors[index] === lastColor) {
      index = (index + 1) % colors.length;
    }
    
    return colors[index];
  };
  
  return (
    <div className="card-container" key={experience.business+experience.title}>
      <Card 
        style={{
          width: '25vh', 
          height:'45vh', 
          margin: 10,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px'
        }}
        className="linkcard">
          <Card.Img variant="left" src={experience.imageUrl} style={{ 
            margin: 10, 
            maxHeight: '11.25vh', 
            maxWidth: '23vh',
            objectFit: 'contain',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }} />
          <Card.Body style={{ color: '#F9F9F9' }}>
            <Card.Title style={{ color: '#F9F9F9' }}><b>{experience.business}</b></Card.Title>
            <Card.Text style={{ color: '#F9F9F9' }}>
              <b>{experience.title}</b>
            </Card.Text>
            <div style={{ fontSize: 12, color: '#ccc', marginBottom: '10px' }}>
              {experience.startDate} - {experience.endDate}
            </div>
            <div className='badgeArea'>
              {experience.tags && experience.tags.map((tag, index) => {
                const lastColor = index > 0 ? getPersistentColor(experience.tags[index - 1]) : null;
                return (
                  <Badge key={index} bg={getPersistentColor(tag, lastColor)} style={{ marginRight: '5px', marginBottom: '5px' }}>
                    {tag}
                  </Badge>
                );
              })}
            </div>
            <div style={{ fontSize:13, paddingBottom: '10px', color: '#e0e0e0' }} dangerouslySetInnerHTML={{__html: experience.description}} />
          </Card.Body>
        </Card>
    </div>
  );
}

export default ExperienceCard; 