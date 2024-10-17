import React from 'react';

function RepoList({ repos, onSelect }) {
  return (
    <div className="repo-list">
      <h2>Repositories</h2>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} onClick={() => onSelect(repo)}>
              <span>{repo.name}</span> - <span>⭐ {repo.stargazers_count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RepoList;
