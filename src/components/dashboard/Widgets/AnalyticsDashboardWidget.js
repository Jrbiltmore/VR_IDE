import React, { useState, useEffect } from 'react';

// Mock data for demonstration
const mockAnalytics = {
  activeUsers: 120,
  sessionDuration: 35,
  interactionCount: 450,
  systemPerformance: 'Good',
  engagementMetrics: [
    'High engagement on Scene 1',
    'Medium engagement on Scene 2',
    'Low engagement on Scene 3'
  ]
};

const AnalyticsDashboardWidget = () => {
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Any setup or data fetching for the widget can go here
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredMetrics = analytics.engagementMetrics.filter(metric =>
    metric.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="widget analytics-dashboard">
      <h3>Analytics Dashboard</h3>
      <div>
        <p><strong>Active Users:</strong> {analytics.activeUsers}</p>
        <p><strong>Session Duration:</strong> {analytics.sessionDuration} minutes</p>
        <p><strong>Interaction Count:</strong> {analytics.interactionCount}</p>
        <p><strong>System Performance:</strong> {analytics.systemPerformance}</p>
      </div>
      <div>
        <h4>Engagement Metrics</h4>
        <input
          type="text"
          placeholder="Filter metrics..."
          value={filter}
          onChange={handleFilterChange}
        />
        <ul>
          {filteredMetrics.map((metric, index) => (
            <li key={index}>{metric}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsDashboardWidget;
