import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterSidebar } from './components/FilterSidebar';
import { AlertList } from './components/AlertList';
import { SchemeAnalyzer } from './components/SchemeAnalyzer';
import { Education } from './components/Education';
import { JobSeekerShield } from './components/JobSeekerShield';
import type { ScamAlert, ScamCategory, SeverityLevel } from './types';
import { MOCK_ALERTS, SCAM_CATEGORIES } from './constants';
import { Icon } from './components/Icon';

export type View = 'alerts' | 'analyzer' | 'education' | 'community' | 'jobseekers';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('alerts');
  const [alerts] = useState<ScamAlert[]>(MOCK_ALERTS);
  const [bookmarkedAlerts, setBookmarkedAlerts] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<ScamCategory | 'all' | 'bookmarked'>('all');
  const [activeSeverity, setActiveSeverity] = useState<SeverityLevel | 'all'>('all');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookmarkToggle = useCallback((alertId: string) => {
    setBookmarkedAlerts(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(alertId)) {
        newBookmarks.delete(alertId);
      } else {
        newBookmarks.add(alertId);
      }
      return newBookmarks;
    });
  }, []);

  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Filter by active category
    if (activeCategory === 'bookmarked') {
      filtered = filtered.filter(alert => bookmarkedAlerts.has(alert.id));
    } else if (activeCategory !== 'all') {
      filtered = filtered.filter(alert => alert.category === activeCategory);
    }
    
    // Filter by severity
    if (activeSeverity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === activeSeverity);
    }

    // Filter by search query
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      filtered = filtered.filter(alert => 
        alert.title.toLowerCase().includes(trimmedQuery) ||
        alert.description.toLowerCase().includes(trimmedQuery) ||
        alert.redFlags.some(flag => flag.toLowerCase().includes(trimmedQuery))
      );
    }
    
    return filtered;
  }, [alerts, activeCategory, bookmarkedAlerts, activeSeverity, searchQuery]);

  const trendingAlerts = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return [...alerts]
      .filter(alert => new Date(alert.date) > oneWeekAgo)
      .sort((a, b) => b.upvotes - a.upvotes)
      .slice(0, 5);
  }, [alerts]);

  const renderContent = () => {
    switch (activeView) {
      case 'alerts':
        return <AlertList 
                    alerts={filteredAlerts} 
                    bookmarkedAlerts={bookmarkedAlerts} 
                    onBookmarkToggle={handleBookmarkToggle} 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />;
      case 'analyzer':
        return <SchemeAnalyzer />;
      case 'jobseekers':
        return <JobSeekerShield />;
      case 'education':
        return <Education />;
      case 'community':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Icon name="users" className="w-16 h-16 mx-auto text-sky-500" />
              <h2 className="text-4xl font-extrabold mt-4 text-slate-800 dark:text-slate-100">Community Forum</h2>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
                Coming Soon: A place to share experiences and seek guidance from other users.
              </p>
            </div>

            <div className="flex justify-end mb-6">
              <button
                disabled
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-400 cursor-not-allowed"
              >
                <Icon name="share" className="w-5 h-5 mr-2" />
                Share Your Experience
              </button>
            </div>
            
            {/* Placeholder for user-shared content */}
            <div className="space-y-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <AlertList 
                    alerts={filteredAlerts} 
                    bookmarkedAlerts={bookmarkedAlerts} 
                    onBookmarkToggle={handleBookmarkToggle} 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header activeView={activeView} setActiveView={setActiveView} onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <FilterSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
          categories={SCAM_CATEGORIES}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSeverity={activeSeverity}
          setActiveSeverity={setActiveSeverity}
          trendingAlerts={trendingAlerts}
          bookmarkedCount={bookmarkedAlerts.size}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;