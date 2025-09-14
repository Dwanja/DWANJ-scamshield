import React from 'react';
import type { ScamAlert } from '../types';
import { AlertCard } from './AlertCard';
import { Icon } from './Icon';

interface AlertListProps {
  alerts: ScamAlert[];
  bookmarkedAlerts: Set<string>;
  onBookmarkToggle: (alertId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const AlertList: React.FC<AlertListProps> = ({ alerts, bookmarkedAlerts, onBookmarkToggle, searchQuery, onSearchChange }) => {
  return (
    <div>
      <div className="mb-6">
        <label htmlFor="scam-search" className="sr-only">Search Scams</label>
        <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="w-5 h-5 text-slate-400" />
            </div>
            <input
                type="search"
                id="scam-search"
                placeholder="Search scams by title, description, or keyword..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-20">
          <Icon name="inbox" className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500"/>
          <h3 className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-300">No Alerts Found</h3>
          <p className="mt-1 text-slate-500 dark:text-slate-400">There are no scam alerts matching your current search and filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              isBookmarked={bookmarkedAlerts.has(alert.id)}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};