import React from 'react';
import { Users, UserPlus, Code, MapPin, Link, Building, Calendar } from 'lucide-react';

const UserProfile = ({ user }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) return null;

  return (
    <section className="user-profile">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              className="avatar" 
            />
            <div className="user-info">
              <h1 className="user-name">{user.name || user.login}</h1>
              <p className="user-login">@{user.login}</p>
              <p className="user-bio">{user.bio || 'No bio available'}</p>
              <div className="user-stats">
                <div className="stat">
                  <Users size={18} />
                  <span>{user.followers}</span>
                  <span>followers</span>
                </div>
                <div className="stat">
                  <UserPlus size={18} />
                  <span>{user.following}</span>
                  <span>following</span>
                </div>
                <div className="stat">
                  <Code size={18} />
                  <span>{user.public_repos}</span>
                  <span>repositories</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-details">
            {user.location && (
              <div className="detail">
                <MapPin size={18} />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.blog && (
              <div className="detail">
                <Link size={18} />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.blog}
                </a>
              </div>
            )}
            
            {user.company && (
              <div className="detail">
                <Building size={18} />
                <span>{user.company}</span>
              </div>
            )}
            
            <div className="detail">
              <Calendar size={18} />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;