import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import SpecialOrbShower from "../../components/special-orb-shower";
import Image from 'next/image'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function About() {
  const { t } = useTranslation('about');
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  if (error) return <div> 500 - Failed to load</div>;
  if (!data || isLoading) return <div> Loading...</div>;
  
  const userData = JSON.parse(data);

  // Generate persistent colors for skills based on tag hash
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];
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
    
    // If this would be the same as the last color, find a different color
    if (lastColor && colors[index] === lastColor) {
      // Try the next color, and if that's also the same, keep going
      for (let i = 1; i < colors.length; i++) {
        const nextIndex = (index + i) % colors.length;
        if (colors[nextIndex] !== lastColor) {
          index = nextIndex;
          break;
        }
      }
    }
    
    return colors[index];
  };

  return (
    <div className="container">
      <main>
        <SpecialOrbShower/>
        
        <div className="profile-section">
          <div className="profile-image">
            <img 
              src="/assets/profile.jpg" 
              alt={userData.name}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="profile-placeholder" style={{ display: 'none' }}>
              <div className="placeholder-avatar">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="name">{userData.name}</h1>
            <p className="current-job">{userData.currentJob}</p>
            <a 
              href={`https://www.google.com/maps/search/${encodeURIComponent(userData.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              <p className="location">📍 {userData.location}</p>
            </a>
            <p className="description">{userData.longDescription}</p>
            
            <div className="links-section">
              <h3>Connect with me</h3>
              <div className="social-links">
                {userData.links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {link.name === 'LinkedIn' && <FontAwesomeIcon icon={faLinkedin} />}
                    {link.name === 'GitHub' && <FontAwesomeIcon icon={faGithub} />}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="tags-section">
          <h3>Skills & Technologies</h3>
          <div className="tags-container">
            {userData.tags.map((tag, index) => {
              // Build the color array progressively to ensure no adjacent duplicates
              const assignedColors = [];
              for (let i = 0; i < index; i++) {
                const prevTag = userData.tags[i];
                let prevHash = 0;
                for (let j = 0; j < prevTag.length; j++) {
                  const char = prevTag.charCodeAt(j);
                  prevHash = ((prevHash << 5) - prevHash) + char;
                  prevHash = prevHash & prevHash;
                }
                let prevIndex = Math.abs(prevHash) % colors.length;
                let prevColor = colors[prevIndex];
                
                // If this would be the same as the previous color, find a different one
                if (i > 0 && prevColor === assignedColors[i - 1]) {
                  for (let k = 1; k < colors.length; k++) {
                    const nextIndex = (prevIndex + k) % colors.length;
                    if (colors[nextIndex] !== assignedColors[i - 1]) {
                      prevColor = colors[nextIndex];
                      break;
                    }
                  }
                }
                assignedColors.push(prevColor);
              }
              
              const lastColor = assignedColors.length > 0 ? assignedColors[assignedColors.length - 1] : null;
              
              return (
                <Badge 
                  key={index} 
                  bg={getPersistentColor(tag, lastColor)}
                  className="skill-tag"
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="hobbies-section">
          <h3>Hobbies & Interests</h3>
          <div className="hobbies-container">
            {userData.hobbies.map((hobby, index) => (
              <div key={index} className="hobby-item">
                <span className="hobby-icon">{hobby.icon}</span>
                <span>{hobby.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          color: #F9F9F9;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          width: 100%;
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 3rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-image {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .profile-image img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #1976d2;
          box-shadow: 0 8px 32px rgba(25, 118, 210, 0.3);
        }

        .profile-placeholder {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #1976d2;
          box-shadow: 0 8px 32px rgba(25, 118, 210, 0.3);
        }

        .placeholder-avatar {
          font-size: 3rem;
          font-weight: bold;
          color: white;
        }

        .name {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .current-job {
          font-size: 1.2rem;
          color: #42a5f5;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .location {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 1rem;
        }

        .location-link {
          text-decoration: none;
          color: #ccc;
        }

        .location-link:hover {
          text-decoration: underline;
          color: #42a5f5;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #e0e0e0;
          max-width: 600px;
          margin-bottom: 2rem;
        }

        .links-section {
          margin-top: 1rem;
        }

        .links-section h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #42a5f5;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(25, 118, 210, 0.1);
          border: 1px solid rgba(25, 118, 210, 0.3);
          border-radius: 25px;
          color: #42a5f5;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .social-link:hover {
          background: rgba(25, 118, 210, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
          color: #64b5f6;
        }

        .tags-section, .hobbies-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
        }

        .tags-section h3, .hobbies-section h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #42a5f5;
          text-align: center;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .skill-tag {
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }

        .hobbies-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .hobby-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: default;
        }

        .hobby-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: none;
          box-shadow: none;
        }

        .hobby-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .profile-section {
            padding: 1.5rem;
            margin: 1rem;
          }

          .name {
            font-size: 2rem;
          }

          .description {
            font-size: 1rem;
          }

          .social-links {
            flex-direction: column;
            align-items: center;
          }

          .tags-container {
            gap: 0.3rem;
          }

          .skill-tag {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }

          .hobbies-container {
            gap: 0.5rem;
          }

          .hobby-item {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  )
}
