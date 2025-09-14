import React from 'react';
import type { View } from '../App';
import { Icon } from './Icon';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onMenuClick: () => void;
}

const NavItem: React.FC<{
    view: View;
    activeView: View;
    setActiveView: (view: View) => void;
    icon: React.ComponentProps<typeof Icon>['name'];
    label: string;
}> = ({ view, activeView, setActiveView, icon, label }) => (
  <button
    onClick={() => setActiveView(view)}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      activeView === view
        ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400'
        : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
    }`}
  >
    <Icon name={icon} className="w-5 h-5" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <button
              onClick={onMenuClick}
              className="lg:hidden mr-2 p-2 rounded-md text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Icon name="shield" className="w-8 h-8 text-sky-500" />
              <span className="text-xl font-bold text-slate-800 dark:text-slate-200">Scam Shield</span>
            </div>
          </div>
          <nav className="hidden sm:flex items-center space-x-2">
            <NavItem view="alerts" activeView={activeView} setActiveView={setActiveView} icon="alert-triangle" label="Alerts" />
            <NavItem view="analyzer" activeView={activeView} setActiveView={setActiveView} icon="search" label="Analyzer" />
            <NavItem view="jobseekers" activeView={activeView} setActiveView={setActiveView} icon="briefcase" label="Job Shield" />
            <NavItem view="education" activeView={activeView} setActiveView={setActiveView} icon="book-open" label="Learn" />
            <NavItem view="community" activeView={activeView} setActiveView={setActiveView} icon="users" label="Community" />
          </nav>
        </div>
      </div>
    </header>
  );
};