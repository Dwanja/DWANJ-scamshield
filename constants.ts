import type { ScamAlert } from './types';
import { ScamCategory, SeverityLevel } from './types';

export const SCAM_CATEGORIES: ScamCategory[] = [
  ScamCategory.PyramidScheme,
  ScamCategory.PonziScheme,
  ScamCategory.Phishing,
  ScamCategory.InvestmentFraud,
  ScamCategory.IdentityTheft,
  ScamCategory.Other,
];

export const SEVERITY_LEVELS: SeverityLevel[] = [
  SeverityLevel.Low,
  SeverityLevel.Medium,
  SeverityLevel.High,
  SeverityLevel.Critical,
];

export const MOCK_ALERTS: ScamAlert[] = [
  {
    id: '1',
    title: 'Instant Crypto Profits Scam',
    description: 'A new online platform "CryptoGainz" is promising guaranteed 30% daily returns on crypto investments. They use high-pressure tactics and a flashy website but lack any real company information or registration.',
    category: ScamCategory.InvestmentFraud,
    severity: SeverityLevel.High,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 284,
    region: 'Global',
    redFlags: ['Guaranteed high returns', 'No physical address', 'Vague business model'],
  },
  {
    id: '2',
    title: 'Urgent "Bank Security" Phishing Email',
    description: 'An email pretending to be from a major national bank is circulating, asking users to "verify their account details immediately" due to a security breach. The link leads to a fake login page designed to steal credentials.',
    category: ScamCategory.Phishing,
    severity: SeverityLevel.Medium,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 451,
    region: 'USA',
    redFlags: ['Sense of urgency', 'Generic greeting', 'Mismatched sender email', 'Suspicious link'],
  },
  {
    id: '3',
    title: '"Wellness Elixir" Pyramid Scheme',
    description: 'A company named "VitalityBloom" is recruiting distributors for a miracle health drink. The focus is heavily on recruiting new members rather than selling the product, with large upfront inventory purchase requirements.',
    category: ScamCategory.PyramidScheme,
    severity: SeverityLevel.High,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 152,
    region: 'Europe',
    redFlags: ['Focus on recruitment', 'High-cost starter kits', 'Complex commission structure'],
  },
  {
    id: '4',
    title: 'Exclusive Real Estate Ponzi Scheme',
    description: 'An "investment club" is offering access to exclusive off-market real estate deals with promised returns of 20% annually. Early investors are paid with money from new investors, with no actual properties being purchased.',
    category: ScamCategory.PonziScheme,
    severity: SeverityLevel.Critical,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 98,
    region: 'Canada',
    redFlags: ['High returns with little risk', 'Consistent returns regardless of market', 'Unregistered investments'],
  },
  {
    id: '5',
    title: 'Fake Job Offer Data Theft',
    description: 'Scammers are posting fake job listings on popular career websites. Applicants are asked to provide extensive personal information, including social security numbers and bank details, under the guise of "background checks".',
    category: ScamCategory.IdentityTheft,
    severity: SeverityLevel.Critical,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 210,
    region: 'Australia',
    redFlags: ['Unprofessional communication', 'Requests for sensitive info too early', 'Vague job descriptions'],
  },
  {
    id: '6',
    title: 'Social Media "Friend" Emergency',
    description: 'A scammer hacks a social media account and messages friends claiming to be in an emergency and needing money wired immediately. They create a convincing story to pressure the victim into acting quickly.',
    category: ScamCategory.Other,
    severity: SeverityLevel.Medium,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 330,
    region: 'Global',
    redFlags: ['Unusual request for money', 'Pressure to act fast', 'Slightly off-tone language'],
  },
];