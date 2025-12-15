import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  const getRankClass = (index) => {
    if (index === 0) return 'rank-1';
    if (index === 1) return 'rank-2';
    if (index === 2) return 'rank-3';
    return 'rank-other';
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">🏆 Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          {leaderboard.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`rank-badge ${getRankClass(idx)}`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td><strong>{entry.team}</strong></td>
                    <td><strong>{entry.points}</strong> pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🏆</div>
              <h4>No Teams Yet</h4>
              <p>Teams will appear here once they start earning points!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
