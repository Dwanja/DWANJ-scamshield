import React, { useState, useEffect } from 'react';
import type { ScamAlert, SeverityLevel } from '../types';
import { Icon } from './Icon';

interface AlertCardProps {
  alert: ScamAlert;
  isBookmarked: boolean;
  onBookmarkToggle: (alertId: string) => void;
}

const CategoryPill: React.FC<{ category: string }> = ({ category }) => (
    <span className="inline-block bg-sky-100 text-sky-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-sky-900 dark:text-sky-300">
        {category}
    </span>
);

const SeverityPill: React.FC<{ severity: SeverityLevel }> = ({ severity }) => {
    const severityStyles: { [key in SeverityLevel]: string } = {
        'Low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        'Critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    const severityIconColor: { [key in SeverityLevel]: string } = {
        'Low': 'text-green-500',
        'Medium': 'text-yellow-500',
        'High': 'text-orange-500',
        'Critical': 'text-red-500',
    };

    return (
        <span className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-1 rounded-full ${severityStyles[severity]}`}>
            <Icon name="alert-triangle" className={`w-3 h-3 mr-1.5 ${severityIconColor[severity]}`} />
            {severity}
        </span>
    );
};


export const AlertCard: React.FC<AlertCardProps> = ({ alert, isBookmarked, onBookmarkToggle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        // navigator is only available in the browser, check for its existence
        if (navigator.share) {
            setCanShare(true);
        }
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Scam Alert: ${alert.title}`,
                    text: `Warning! A scam called "${alert.title}" is being reported. Here's a quick summary: ${alert.description.substring(0, 100)}... Stay safe! #ScamShield #FraudAlert`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className='flex flex-wrap gap-y-2'>
                           <CategoryPill category={alert.category} />
                           <SeverityPill severity={alert.severity} />
                        </div>
                        <h2 className="text-xl font-bold mt-2 text-slate-800 dark:text-slate-100">{alert.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                            <span>{new Date(alert.date).toLocaleDateString()}</span>
                            <span className="flex items-center"><Icon name="map-pin" className="w-4 h-4 mr-1"/>{alert.region}</span>
                            <span className="flex items-center"><Icon name="arrow-up-circle" className="w-4 h-4 mr-1"/>{alert.upvotes} Upvotes</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {canShare && (
                             <button 
                                onClick={handleShare} 
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Share alert"
                            >
                                <Icon name="share" className="w-6 h-6 text-slate-400" />
                            </button>
                        )}
                        <button 
                            onClick={() => onBookmarkToggle(alert.id)} 
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                        >
                            <Icon name="bookmark" className={`w-6 h-6 ${isBookmarked ? 'fill-yellow-400 text-yellow-500' : 'text-slate-400'}`} />
                        </button>
                    </div>
                </div>
                
                <p className={`mt-4 text-slate-600 dark:text-slate-300 transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-20 overflow-hidden'}`}>
                    {alert.description}
                </p>

                 <div className={`mt-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Red Flags:</h4>
                    <ul className="space-y-1.5 pl-5">
                        {alert.redFlags.map((flag, index) => (
                            <li key={index} className="flex items-start">
                                <Icon name="flag" className="w-4 h-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 text-sm">{flag}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3">
                 <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                    {isExpanded ? 'Show Less' : 'Show More Details'}
                </button>
            </div>
        </div>
    );
};