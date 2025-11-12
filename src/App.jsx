import React from 'react';
import { useGitHub } from './hooks/useGitHub';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import UserProfile from './components/UserProfile';
import RepositoryCard from './components/RepositoryCard';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import Error from './components/Error';
import './index.css';

function App() {
  const {
    user,
    repos,
    loading,
    error,
    currentPage,
    totalRepos,
    reposPerPage,
    searchUser,
    changePage
  } = useGitHub();

  const initialState = !user && !loading && !error;

  return (
    <div className="App">
      <Header />
      
      <main className="main">
        <SearchBox onSearch={searchUser} loading={loading} />
        
        {initialState && (
          <div className="initial-state">
            <div className="initial-icon">🔍</div>
            <h3>Search for a GitHub User</h3>
            <p>
              Enter a GitHub username in the search box above to get started. 
              You'll see the user's profile information and their public repositories.
            </p>
          </div>
        )}
        
        {loading && <Loading />}
        
        {error && (
          <Error 
            message={error} 
            onRetry={() => searchUser(user?.login || '')} 
          />
        )}
        
        {user && <UserProfile user={user} />}
        
        {user && repos.length > 0 && (
          <section className="repositories-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Repositories</h2>
                <div className="repos-count">
                  {totalRepos} repositories
                </div>
              </div>
              
              <div className="repositories-grid">
                {repos.map(repo => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalItems={totalRepos}
                itemsPerPage={reposPerPage}
                onPageChange={changePage}
              />
            </div>
          </section>
        )}
        
        {user && repos.length === 0 && !loading && (
          <div className="no-repos">
            <h3>No repositories found</h3>
            <p>This user doesn't have any public repositories.</p>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2023 GitHub User Finder. This is a demo project.</p>
            <div className="footer-links">
              <a 
                href="https://docs.github.com/en/rest" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub API
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;