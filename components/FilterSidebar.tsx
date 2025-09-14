import React from 'react';
import type { ScamAlert, ScamCategory, SeverityLevel } from '../types';
import { SEVERITY_LEVELS } from '../constants';
import { Icon } from './Icon';

interface FilterSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: ScamCategory[];
  activeCategory: ScamCategory | 'all' | 'bookmarked';
  setActiveCategory: (category: ScamCategory | 'all' | 'bookmarked') => void;
  activeSeverity: SeverityLevel | 'all';
  setActiveSeverity: (severity: SeverityLevel | 'all') => void;
  trendingAlerts: ScamAlert[];
  bookmarkedCount: number;
}

const NavLink: React.FC<{
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  isActive: boolean;
  onClick: () => void;
  count?: number;
}> = ({ label, icon, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-colors text-sm ${
      isActive
        ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 font-semibold'
        : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800/60'
    }`}
  >
    <div className="flex items-center space-x-3">
        <Icon name={icon} className="w-5 h-5"/>
        <span>{label}</span>
    </div>
    {count !== undefined && <span className="text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{count}</span>}
  </button>
);

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  setIsOpen,
  categories,
  activeCategory,
  setActiveCategory,
  activeSeverity,
  setActiveSeverity,
  trendingAlerts,
  bookmarkedCount,
}) => {
    
  const handleCategoryClick = (category: ScamCategory | 'all' | 'bookmarked') => {
    setActiveCategory(category);
    if(window.innerWidth < 1024) { // Close sidebar on mobile after selection
        setIsOpen(false);
    }
  };
    
  const handleSeverityClick = (severity: SeverityLevel | 'all') => {
    setActiveSeverity(severity);
    if(window.innerWidth < 1024) {
        setIsOpen(false);
    }
  };

  return (
    <>
        <aside className={`fixed lg:relative lg:translate-x-0 z-10 w-64 lg:w-72 bg-white dark:bg-slate-800/50 dark:border-r dark:border-slate-800/70 p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="space-y-6">
                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filters</h3>
                    <div className="space-y-1">
                        <NavLink label="All Scams" icon="layout-list" isActive={activeCategory === 'all'} onClick={() => handleCategoryClick('all')} />
                        <NavLink label="Bookmarked" icon="bookmark" isActive={activeCategory === 'bookmarked'} onClick={() => handleCategoryClick('bookmarked')} count={bookmarkedCount}/>
                    </div>
                </div>

                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Categories</h3>
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <NavLink key={cat} label={cat} icon="tag" isActive={activeCategory === cat} onClick={() => handleCategoryClick(cat)} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Severity</h3>
                    <div className="space-y-1">
                        <NavLink label="All Severities" icon="shield" isActive={activeSeverity === 'all'} onClick={() => handleSeverityClick('all')} />
                        {SEVERITY_LEVELS.map((level) => (
                           <NavLink key={level} label={level} icon="alert-triangle" isActive={activeSeverity === level} onClick={() => handleSeverityClick(level)} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-2">
                        <Icon name="trending-up" className="w-4 h-4" />
                        <span>Trending Scams</span>
                    </h3>
                    <div className="space-y-2 mt-2">
                        {trendingAlerts.map(alert => (
                            <a key={alert.id} href="#" className="block p-3 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{alert.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{alert.upvotes} upvotes</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
        {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 z-0 lg:hidden"></div>}
    </>
  );
};