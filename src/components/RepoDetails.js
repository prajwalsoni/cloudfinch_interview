import React from 'react';

function RepoDetails({ repo }) {
  return (
    <div className="repo-details">
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description available.'}</p>
    </div>
  );
}

export default RepoDetails;
