
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { analyzeScheme } from '../services/geminiService';
import { Icon } from './Icon';

const ResultDisplay: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const getRiskColor = (score: number) => {
    if (score > 75) return 'text-red-500';
    if (score > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="mt-6 p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md animate-fade-in">
      <h3 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-slate-100">Analysis Result</h3>
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold ${getRiskColor(result.riskScore)}`}>{result.riskScore}%</div>
        <div className="text-lg font-semibold text-slate-600 dark:text-slate-300">Risk Score</div>
        <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{result.summary}</p>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Explanation:</h4>
          <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{result.explanation}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Detected Red Flags:</h4>
          <ul className="space-y-1.5 pl-5">
            {result.redFlags.map((flag, index) => (
              <li key={index} className="flex items-start">
                <Icon name="flag" className="w-4 h-4 mr-2 mt-1 text-red-500 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300 text-sm">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const SchemeAnalyzer: React.FC = () => {
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      setError('Please provide details about the scheme.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysisResult = await analyzeScheme(details);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800/50 p-8 rounded-lg shadow-md">
        <div className="text-center">
            <Icon name="search" className="w-12 h-12 mx-auto text-sky-500" />
            <h2 className="text-3xl font-bold mt-4 text-slate-800 dark:text-slate-100">Scheme Analyzer</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
            Enter details about a suspicious opportunity, and our AI will evaluate it for red flags.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="scheme-details" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Describe the opportunity
            </label>
            <textarea
              id="scheme-details"
              rows={8}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white"
              placeholder="e.g., A friend offered me a chance to invest in a project with guaranteed 25% monthly returns. They said I need to recruit others to earn more..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <>
                    <Icon name="loader" className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Analyzing...
                </>
            ) : 'Analyze Scheme'}
          </button>

          {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}
        </form>
      </div>

      {result && <ResultDisplay result={result} />}
    </div>
  );
};
