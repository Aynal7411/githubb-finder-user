import React from 'react';
import { Star, GitBranch, Calendar, Code } from 'lucide-react';

const RepositoryCard = ({ repo }) => {
  const getLanguageColor = (language) => {
    const languageColors = {
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'Java': '#b07219',
      'TypeScript': '#2b7489',
      'C++': '#f34b7d',
      'C#': '#178600',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'CSS': '#563d7c',
      'HTML': '#e34c26',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Shell': '#89e051',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33'
    };
    
    return languageColors[language] || '#6c757d';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="repo-card">
      <h3 className="repo-name">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
      </h3>
      
      <p className="repo-description">
        {repo.description || 'No description available'}
      </p>
      
      <div className="repo-details">
        {repo.language && (
          <div className="repo-detail language">
            <span 
              className="language-color" 
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            ></span>
            <span>{repo.language}</span>
          </div>
        )}
        
        <div className="repo-detail">
          <Star size={16} />
          <span>{repo.stargazers_count}</span>
        </div>
        
        <div className="repo-detail">
          <GitBranch size={16} />
          <span>{repo.forks_count}</span>
        </div>
        
        <div className="repo-detail">
          <Calendar size={16} />
          <span>Updated {formatDate(repo.updated_at)}</span>
        </div>
      </div>
      
      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.slice(0, 3).map(topic => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
          {repo.topics.length > 3 && (
            <span className="topic-tag more">+{repo.topics.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default RepositoryCard;