import React from 'react';
import { Icon } from './Icon';

interface FlagItemProps {
  icon: React.ComponentProps<typeof Icon>['name'];
  iconClass: string;
  title: string;
  description: string;
}

const FlagItem: React.FC<FlagItemProps> = ({ icon, iconClass, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <Icon name={icon} className={`w-6 h-6 ${iconClass}`} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800 dark:text-slate-100">{title}</h4>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  </div>
);

const redFlags = [
  {
    title: "Unusual Payment Requests",
    description: "The employer asks you to pay for training, background checks, software, or equipment. Legitimate companies cover these costs."
  },
  {
    title: "Vague or Unprofessional Communication",
    description: "Emails contain grammar/spelling errors, come from personal email addresses (e.g., @gmail.com), or the interview is conducted solely via text/chat."
  },
  {
    title: "'Too Good to Be True' Offers",
    description: "The salary is significantly higher than the industry average for your experience level, with minimal required effort."
  },
  {
    title: "Requests for Sensitive Info Upfront",
    description: "You're asked for your bank account details or social security number before receiving a formal, written offer."
  },
  {
    title: "High-Pressure Tactics",
    description: "The recruiter pressures you to accept the offer immediately, creating a false sense of urgency to prevent you from doing research."
  },
  {
    title: "Inconsistent Company Details",
    description: "The company website is new, unprofessional, or non-existent. Contact details are hard to find or look suspicious."
  }
];

const greenFlags = [
  {
    title: "Clear, Professional Job Description",
    description: "The role, responsibilities, and qualifications are clearly defined in the job listing."
  },
  {
    title: "Verifiable Company Presence",
    description: "The company has a professional website, a presence on platforms like LinkedIn, and a physical address you can verify."
  },
  {
    title: "Formal Interview Process",
    description: "The hiring process involves multiple steps, including phone screens and video or in-person interviews with team members."
  },
  {
    title: "Official Communication Channels",
    description: "All communication comes from a corporate email address (e.g., name@company.com), not a personal one."
  },
  {
    title: "No Upfront Costs",
    description: "The employer never asks you for money. They handle all costs associated with hiring and onboarding."
  },
  {
    title: "Written Job Offer",
    description: "You receive a formal, detailed offer letter outlining salary, benefits, start date, and job responsibilities to review and sign."
  }
];


export const JobSeekerShield: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <Icon name="briefcase" className="w-16 h-16 mx-auto text-sky-500" />
        <h2 className="text-4xl font-extrabold mt-4 text-slate-800 dark:text-slate-100">Job Seeker Shield</h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Analyze job listings and communications to spot scams before you share sensitive information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Red Flags Column */}
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-red-500 flex items-center mb-6">
            <Icon name="x-circle" className="w-7 h-7 mr-2" />
            Red Flags to Watch For
          </h3>
          <div className="space-y-6">
            {redFlags.map((flag) => (
              <FlagItem 
                key={flag.title}
                icon="flag"
                iconClass="text-red-500"
                title={flag.title}
                description={flag.description}
              />
            ))}
          </div>
        </div>

        {/* Green Flags Column */}
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-green-500 flex items-center mb-6">
            <Icon name="check-circle" className="w-7 h-7 mr-2" />
            Green Flags of Legitimacy
          </h3>
          <div className="space-y-6">
            {greenFlags.map((flag) => (
              <FlagItem 
                key={flag.title}
                icon="shield"
                iconClass="text-green-500"
                title={flag.title}
                description={flag.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};