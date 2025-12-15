import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">💪 Activities</h2>
      <div className="card">
        <div className="card-body">
          {activities.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={idx}>
                    <td><strong>{activity.user}</strong></td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">💪</div>
              <h4>No Activities Yet</h4>
              <p>Start logging your workouts to see them here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
