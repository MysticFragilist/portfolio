import useTranslation from 'next-translate/useTranslation';
import useSWR from 'swr';
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faChrome } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Projects() {
  const { t } = useTranslation('projects');
  const { data, error, isLoading } = useSWR('/api/data', fetcher);

  if (error) return <div> 500 - Failed to load</div>;
  if (!data || isLoading) return <div> Loading...</div>;

  const userData = JSON.parse(data);
  const projects = userData.projects || [];

  // Funky color palette for tags
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];
  const getPersistentColor = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = ((hash << 5) - hash) + tag.charCodeAt(i);
      hash = hash & hash;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="container">
      <main>
        <h1 className="title">{t('projects-title') || 'Projects'}</h1>
        <div className="projects-grid">
          {projects.map((project, idx) => {
            const CardContent = (
              <motion.div
                key={idx}
                className="project-card"
                whileHover={{ rotate: -2 + Math.random() * 4, scale: 1.04, boxShadow: "0 8px 32px 0 rgba(25,118,210,0.25)" }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                tabIndex={0}
                style={{ cursor: project.url ? 'pointer' : 'default' }}
              >
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.name} className="project-img-top-left" />
                )}
                <div className="project-content">
                  <h2 className="project-title">{project.name}</h2>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-links">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" onClick={e => e.stopPropagation()}>
                        <FontAwesomeIcon icon={faChrome} />
                      </a>
                    )}
                  </div>
                  <div className="project-tags">
                    {project.repository && (
                      <Badge bg="secondary" className="project-repo">{project.repository}</Badge>
                    )}
                    {project.visibility && (
                      <Badge bg="info" className="project-visibility">{project.visibility}</Badge>
                    )}
                    {project.lastUpdated && (
                      <Badge bg="dark" className="project-updated">{project.lastUpdated}</Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            );
            return project.url ? (
              <a
                key={idx}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
                tabIndex={0}
                aria-label={`Open ${project.name} on GitHub`}
              >
                {CardContent}
              </a>
            ) : CardContent;
          })}
        </div>
        <style jsx>{`
          .container {
            height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: transparent;
            color: #F9F9F9;
          }
          main {
            padding: 2rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 1200px;
            width: 100%;
          }
          .title {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #1976d2, #42a5f5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            width: 100%;
          }
          .project-card {
            background: rgba(30, 34, 54, 0.35);
            border-radius: 20px;
            border: 1.5px solid rgba(66, 165, 245, 0.25);
            box-shadow: 0 8px 32px 0 rgba(25,118,210,0.25);
            padding: 1.5rem 1.5rem 1rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: box-shadow 0.3s, transform 0.3s;
            color: #F9F9F9;
            position: relative;
            overflow: hidden;
          }
          .project-img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-bottom: 1rem;
            border-radius: 12px;
            background: #222c;
            box-shadow: 0 2px 8px rgba(25,118,210,0.10);
          }
          .project-img-top-left {
            width: 80px;
            height: 80px;
            object-fit: contain;
            float: left; /* Float the image to the left */
            margin-right: 1rem; /* Add some space between image and text */
            border-radius: 12px;
            background: #222c;
            box-shadow: 0 2px 8px rgba(25,118,210,0.10);
          }
          .project-content {
            width: 100%;
            text-align: center;
          }
          .project-title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #F9F9F9;
          }
          .project-desc {
            font-size: 1rem;
            color: #e0e0e0;
            margin-bottom: 1rem;
          }
          .project-links {
            margin-bottom: 1rem;
          }
          .project-link {
            color: #42a5f5;
            font-size: 1.3rem;
            margin: 0 0.5rem;
            transition: color 0.2s, transform 0.2s;
          }
          .project-link:hover {
            color: #1976d2;
            transform: scale(1.2);
          }
          .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
          }
          .project-repo {
            background: #393D47;
            color: #C17B1F;
          }
          .project-visibility {
            background: #1976d2;
            color: #fff;
          }
          .project-updated {
            background: #222;
            color: #fff;
          }
          @media (max-width: 600px) {
            .projects-grid {
              grid-template-columns: 1fr;
            }
            .project-card {
              padding: 1rem;
            }
          }
        `}</style>
      </main>
    </div>
  );
} 