import React from 'react';
import { Icon } from './Icon';

interface EducationTopicProps {
  icon: React.ComponentProps<typeof Icon>['name'];
  title: string;
  description: string;
  children: React.ReactNode;
}

const EducationTopic: React.FC<EducationTopicProps> = ({ icon, title, description, children }) => (
  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
          <Icon name={icon} className="w-6 h-6 text-sky-500" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="mt-1 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
    <div className="mt-4 pl-16 space-y-2">
        {children}
    </div>
  </div>
);

const Tip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start">
        <Icon name="shield" className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
        <span className="text-slate-600 dark:text-slate-300">{children}</span>
    </div>
);

export const Education: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Icon name="book-open" className="w-16 h-16 mx-auto text-sky-500" />
        <h2 className="text-4xl font-extrabold mt-4 text-slate-800 dark:text-slate-100">Stay Informed, Stay Safe</h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Knowledge is your best defense against scams. Learn to recognize the signs of common fraudulent schemes.
        </p>
      </div>

      <div className="space-y-8">
        <EducationTopic
          icon="users"
          title="Pyramid & Ponzi Schemes"
          description="These schemes rely on recruiting new members to pay earlier ones."
        >
          <Tip>Be wary of promises of "guaranteed" high returns with little to no risk.</Tip>
          <Tip>Check if the business focuses more on recruitment than on selling an actual product or service.</Tip>
          <Tip>Understand that there are no "secret" or "exclusive" markets that guarantee wealth.</Tip>
        </EducationTopic>

        <EducationTopic
          icon="search"
          title="Phishing Scams"
          description="Scammers impersonate legitimate organizations to steal your personal information."
        >
          <Tip>Never click on suspicious links or download attachments from unknown senders.</Tip>
          <Tip>Hover over links to see the actual URL before clicking. Look for misspellings.</Tip>
          <Tip>Legitimate companies will rarely ask for sensitive information like passwords or social security numbers via email.</Tip>
        </EducationTopic>

        <EducationTopic
          icon="alert-triangle"
          title="Investment Fraud"
          description="Fraudulent investment opportunities promise big payouts but are designed to steal your money."
        >
          <Tip>Always independently verify any investment opportunity. Don't rely solely on information from the promoter.</Tip>
          <Tip>Be skeptical of high-pressure sales tactics that rush you into making a decision.</Tip>
          <Tip>If it sounds too good to be true, it probably is.</Tip>
        </EducationTopic>

        <EducationTopic
          icon="heart"
          title="Romance Scams"
          description="Scammers create fake online profiles to build relationships and then manipulate victims into sending money."
        >
          <Tip>Be cautious of anyone who quickly professes love or asks to move the conversation off the dating platform.</Tip>
          <Tip>Never send money, cryptocurrency, or gift cards to someone you've only met online.</Tip>
          <Tip>Perform a reverse image search on their profile picture to check for authenticity.</Tip>
        </EducationTopic>
        
        <EducationTopic
          icon="monitor"
          title="Tech Support Scams"
          description="Fraudsters pose as tech support agents to trick you into paying for unnecessary services or installing malware."
        >
          <Tip>Legitimate tech companies will not contact you unexpectedly about a problem with your device.</Tip>
          <Tip>Never grant a stranger remote access to your computer.</Tip>
          <Tip>Do not trust pop-up warnings that urge you to call a specific phone number for help.</Tip>
        </EducationTopic>

        <EducationTopic
          icon="gift"
          title="Fake Charities"
          description="Scammers exploit generosity by creating fake charities, especially after natural disasters."
        >
          <Tip>Verify a charity's legitimacy using a watchdog site like Charity Navigator or GuideStar before donating.</Tip>
          <Tip>Be wary of high-pressure donation requests and avoid giving cash or wire transfers.</Tip>
          <Tip>Donate directly through a charity's official website, not through unsolicited email links or social media messages.</Tip>
        </EducationTopic>
      </div>
    </div>
  );
};