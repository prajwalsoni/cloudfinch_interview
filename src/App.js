import React, { useState } from 'react';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRepos = async () => {
    setLoading(true);
    setError('');
    setRepos([]);
    setSelectedRepo(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>GitHub Repository Fetcher</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchRepos} disabled={loading}>
        {loading ? 'Loading...' : 'Get Repos'}
      </button>
      {error && <p className="error">{error}</p>}
      <RepoList repos={repos} onSelect={setSelectedRepo} />
      {selectedRepo && <RepoDetails repo={selectedRepo} />}
    </div>
  );
}

export default App;
