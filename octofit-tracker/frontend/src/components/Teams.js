import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">👥 Teams</h2>
      <div className="card">
        <div className="card-body">
          {teams.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Team Name</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={idx}>
                    <td><strong>{team.name}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h4>No Teams Yet</h4>
              <p>Create a team to start competing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
