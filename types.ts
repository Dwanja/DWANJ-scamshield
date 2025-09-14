export enum SeverityLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum ScamCategory {
  PyramidScheme = 'Pyramid Scheme',
  PonziScheme = 'Ponzi Scheme',
  Phishing = 'Phishing',
  InvestmentFraud = 'Investment Fraud',
  IdentityTheft = 'Identity Theft',
  Other = 'Other',
}

export interface ScamAlert {
  id: string;
  title: string;
  description: string;
  category: ScamCategory;
  severity: SeverityLevel;
  date: string; // ISO string
  upvotes: number;
  region: string;
  redFlags: string[];
}

export interface AnalysisResult {
    riskScore: number;
    summary: string;
    explanation: string;
    redFlags: string[];
}