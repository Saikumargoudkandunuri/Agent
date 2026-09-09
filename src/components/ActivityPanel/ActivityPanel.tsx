import React from 'react';

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
}

interface ActivityPanelProps {
  activities: ActivityItem[];
}

export const ActivityPanel: React.FC<ActivityPanelProps> = ({ activities }) => {
  return (
    <div className="h-full bg-dark-900 border-r border-dark-700 w-64 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-dark-700">
        <h3 className="text-sm font-semibold text-white">Agent Activity</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-dark-500 text-sm">No activity yet</div>
          </div>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="bg-dark-800 rounded-lg p-3 border border-dark-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-primary-400 font-medium">{activity.action}</span>
              </div>
              <div className="text-xs text-dark-300">{activity.description}</div>
              <div className="text-xs text-dark-500 mt-1">
                {activity.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
