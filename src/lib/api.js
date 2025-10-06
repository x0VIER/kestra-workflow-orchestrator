const mockWorkflows = [
  { id: 'wf-1', name: 'Data Ingestion Pipeline', status: 'Running', lastRun: '2025-10-05T10:00:00Z' },
  { id: 'wf-2', name: 'Report Generation', status: 'Completed', lastRun: '2025-10-04T15:30:00Z' },
  { id: 'wf-3', name: 'User Onboarding Flow', status: 'Failed', lastRun: '2025-10-03T08:45:00Z' },
  { id: 'wf-4', name: 'Database Backup', status: 'Running', lastRun: '2025-10-05T12:00:00Z' },
];

const mockPlugins = [
  { id: 'plugin-1', name: 'AWS S3 Connector', version: '1.2.0', status: 'Active' },
  { id: 'plugin-2', name: 'Kafka Producer', version: '0.9.1', status: 'Active' },
  { id: 'plugin-3', name: 'Slack Notifier', version: '2.0.0', status: 'Inactive' },
];

export const fetchWorkflows = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWorkflows);
    }, 500);
  });
};

export const fetchPlugins = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlugins);
    }, 500);
  });
};

export const fetchDashboardStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeWorkflows: 12,
        successfulRuns: 85,
        failedRuns: 3,
      });
    }, 300);
  });
};

