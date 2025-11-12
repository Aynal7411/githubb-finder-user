import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBox = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <section className="search-section">
      <div className="container">
        <h2>Find GitHub Users</h2>
        <p>Search for any GitHub user by their username to view their profile and repositories</p>
        <form onSubmit={handleSubmit} className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !username.trim()}
          >
            <Search size={18} />
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBox;