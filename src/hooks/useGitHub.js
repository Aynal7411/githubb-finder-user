import { useState, useEffect } from 'react';

const GITHUB_API_BASE = 'https://api.github.com';

export const useGitHub = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);

  const reposPerPage = 9;

  const searchUser = async (username) => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setCurrentPage(1);

    try {
      // Fetch user data
      const userResponse = await fetch(`${GITHUB_API_BASE}/users/${username}`);
      
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      setUser(userData);
      setTotalRepos(userData.public_repos);

      // Fetch first page of repositories
      await fetchRepositories(username, 1);
      
    } catch (err) {
      setError(err.message);
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositories = async (username, page) => {
    try {
      const reposResponse = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${reposPerPage}&page=${page}`
      );
      
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const reposData = await reposResponse.json();
      setRepos(reposData);
      setCurrentPage(page);
      
    } catch (err) {
      setError('Failed to load repositories');
      setRepos([]);
    }
  };

  const changePage = (page) => {
    if (user) {
      fetchRepositories(user.login, page);
    }
  };

  return {
    user,
    repos,
    loading,
    error,
    currentPage,
    totalRepos,
    reposPerPage,
    searchUser,
    changePage,
  };
};