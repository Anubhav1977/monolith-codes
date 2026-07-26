import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const PROJECT_TYPES = [
  'Web & Digital Experiences',
  'Custom Software & Platform',
  'SaaS Product Engineering',
  'Mobile Application',
  'ERP / CRM & Internal Portal',
  'API & System Integration',
];

const BUDGET_RANGES = [
  '< $10k',
  '$10k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k+',
];

export const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    projectType: PROJECT_TYPES[0],
    budget: BUDGET_RANGES[1],
    timeline: '1-2 Months',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }

    setStatus('submitting');

    // Simulate submission delay with realistic async flow
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  if (status === 'success') {
    return (
      <div className="p-8 rounded-lg border border-mc-border bg-mc-surface text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-mc-orange-10 border border-mc-orange text-mc-orange flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-sans font-medium text-mc-text-strong mb-2">
          Inquiry Received
        </h3>
        <p className="text-mc-text-body text-sm max-w-md mx-auto mb-6">
          Thank you, <span className="text-mc-text-strong font-medium">{formData.name}</span>. Our lead software architect will review your project parameters ({formData.projectType}) and respond within 24 business hours.
        </p>

        <div className="p-4 rounded bg-mc-surface-deep border border-mc-border text-left max-w-md mx-auto mb-6 font-mono text-xs text-mc-text-secondary">
          <div className="text-mc-orange mb-1">RECORD SUMMARY:</div>
          <div>Type: {formData.projectType}</div>
          <div>Budget: {formData.budget}</div>
          <div>Timeline: {formData.timeline}</div>
          <div>Contact: {formData.email}</div>
        </div>

        <button
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              company: '',
              projectType: PROJECT_TYPES[0],
              budget: BUDGET_RANGES[1],
              timeline: '1-2 Months',
              description: '',
            });
          }}
          className="px-5 py-2.5 text-xs font-mono rounded bg-mc-surface-deep border border-mc-border text-mc-text hover:border-mc-border-strong transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-lg border border-mc-border bg-mc-surface space-y-6">
      {status === 'error' && (
        <div className="p-3 rounded bg-mc-orange-10 border border-mc-orange text-mc-orange text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
            Your Name <span className="text-mc-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full h-12 px-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text placeholder-mc-text-tertiary focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
            Work Email <span className="text-mc-orange">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className="w-full h-12 px-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text placeholder-mc-text-tertiary focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          />
        </div>
      </div>

      {/* Row 2: Company & Project Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
            Company / Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className="w-full h-12 px-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text placeholder-mc-text-tertiary focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          />
        </div>

        <div>
          <label htmlFor="projectType" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
            Primary Requirement
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Type Tags selector */}
      <div>
        <label className="block text-xs font-mono text-mc-text-secondary uppercase mb-3">
          Select Target System Category
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => {
            const isSelected = formData.projectType === type;
            return (
              <button
                type="button"
                key={type}
                onClick={() => setFormData({ ...formData, projectType: type })}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono rounded-[4px] border transition-all',
                  isSelected
                    ? 'bg-mc-orange-10 border-mc-orange text-mc-orange font-medium'
                    : 'bg-mc-surface-deep border-mc-border text-mc-text-secondary hover:border-mc-border-strong hover:text-mc-text'
                )}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Budget Range & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          >
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
            Target Timeline
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="e.g. 2-3 Months, Q3 launch"
            className="w-full h-12 px-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text placeholder-mc-text-tertiary focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          />
        </div>
      </div>

      {/* Row 4: Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-mono text-mc-text-secondary uppercase mb-2">
          Project Overview & Workflow Requirements <span className="text-mc-orange">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what you want to build, existing systems to integrate, key user roles, or key business outcomes..."
          className="w-full p-4 rounded-[6px] bg-mc-surface-deep border border-mc-border text-mc-text placeholder-mc-text-tertiary focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all min-h-[120px]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'w-full h-12 text-sm font-sans font-semibold rounded-[6px] bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark flex items-center justify-center gap-2 transition-all shadow-md',
          status === 'submitting' && 'opacity-70 cursor-not-allowed'
        )}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Project Inquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="text-center font-mono text-[11px] text-mc-text-tertiary">
        Direct technical review within 24h • Non-disclosure agreement guaranteed
      </div>
    </form>
  );
};
