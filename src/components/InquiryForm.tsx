import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Globe, Check, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  selectedCategories: string[]; // Multi-selection chips
  budget: string;
  timeline: string;
  description: string;
  website: string; // Honeypot anti-spam field
}

interface TouchedState {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  description?: boolean;
}

const CATEGORY_OPTIONS = [
  'SaaS Product Engineering',
  'Custom Software & Platform',
  'Mobile Application',
  'Web & Digital Experiences',
  'ERP / CRM & Internal Portal',
  'API & System Integration',
];

const BUDGET_RANGES_USD = [
  '< $10k USD',
  '$10k - $25k USD',
  '$25k - $50k USD',
  '$50k - $100k USD',
  '$100k+ USD',
];

const BUDGET_RANGES_INR = [
  '< ₹25k INR',
  '₹25k - ₹75k INR',
  '₹75k - ₹2 Lakhs INR',
  '₹2L - ₹5 Lakhs INR',
  '₹5L - ₹10 Lakhs INR',
  '₹10L+ INR',
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string): boolean {
  if (!phone.trim()) return true; // Optional field
  return /^[\d\+\-\(\)\s]{7,20}$/.test(phone.trim());
}

function detectIsIndia(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = typeof navigator !== 'undefined' ? navigator.language || '' : '';
    return tz.includes('Kolkata') || tz.includes('Calcutta') || lang.toLowerCase().includes('in');
  } catch {
    return false;
  }
}

export const InquiryForm: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  // Auto-detect visitor location on initial mount
  useEffect(() => {
    if (detectIsIndia()) {
      setCurrency('INR');
    }
  }, []);

  const budgetOptions = currency === 'INR' ? BUDGET_RANGES_INR : BUDGET_RANGES_USD;

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedCategories: [CATEGORY_OPTIONS[1]], // Default multi-selection
    budget: budgetOptions[1],
    timeline: '1-2 Months',
    description: '',
    website: '', // Honeypot field
  });

  // Handle Currency Toggle
  const handleCurrencyChange = (newCurrency: 'USD' | 'INR') => {
    setCurrency(newCurrency);
    const newOptions = newCurrency === 'INR' ? BUDGET_RANGES_INR : BUDGET_RANGES_USD;
    setFormData((prev) => ({
      ...prev,
      budget: newOptions[1],
    }));
  };

  // Toggle Category Multi-Selection
  const toggleCategory = (category: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCategories.includes(category);
      if (exists) {
        // Allow unchecking if at least 1 remains selected
        if (prev.selectedCategories.length === 1) return prev;
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...prev.selectedCategories, category],
        };
      }
    });
  };

  const [touched, setTouched] = useState<TouchedState>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form render timestamp token for bot timing check
  const formRenderTimeRef = useRef<string>(Date.now().toString());

  const handleBlur = (field: keyof TouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name in touched) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  // Field validation status
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = validateEmail(formData.email);
  const isPhoneValid = validatePhone(formData.phone);
  const isDescriptionValid = formData.description.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    setTouched({
      name: true,
      email: true,
      phone: true,
      description: true,
    });

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isDescriptionValid) {
      setStatus('error');
      setErrorMessage('Please fix the highlighted errors before submitting your inquiry.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectType: formData.selectedCategories.join(', '), // Format multi-selected categories for server
          _formRenderTime: formRenderTimeRef.current,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(
          result.error || 'Unable to submit inquiry. Please check your details and try again.'
        );
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        'Connection error while submitting inquiry. Please check your network or reach us directly at studio@monolithcodes.com.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 sm:p-8 rounded-xl border border-mc-border bg-mc-surface text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-mc-orange-10 border border-mc-orange text-mc-orange flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-sans font-medium text-mc-text-strong mb-2">
          Inquiry Received
        </h3>
        <p className="text-mc-text-body text-sm max-w-md mx-auto mb-6">
          Thank you, <span className="text-mc-text-strong font-medium">{formData.name}</span>. A confirmation email has been sent to <span className="text-mc-text-strong font-medium">{formData.email}</span>. Our lead software engineering team has queued your inquiry for architect review.
        </p>

        <div className="p-4 rounded-lg bg-mc-surface-deep border border-mc-border text-left max-w-md mx-auto mb-6 font-mono text-xs text-mc-text-secondary">
          <div className="text-mc-orange mb-1 font-semibold">RECORD SUMMARY:</div>
          <div>Requirements: {formData.selectedCategories.join(', ')}</div>
          <div>Estimated Budget: {formData.budget}</div>
          <div>Timeline: {formData.timeline}</div>
          <div>Work Email: {formData.email}</div>
          {formData.company && <div>Company: {formData.company}</div>}
        </div>

        <button
          onClick={() => {
            setStatus('idle');
            setTouched({});
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              selectedCategories: [CATEGORY_OPTIONS[1], CATEGORY_OPTIONS[2]],
              budget: budgetOptions[1],
              timeline: '1-2 Months',
              description: '',
              website: '',
            });
            formRenderTimeRef.current = Date.now().toString();
          }}
          className="px-5 py-2.5 text-xs font-mono rounded-lg bg-mc-surface-deep border border-mc-border text-mc-text hover:border-mc-border-strong transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-8 rounded-xl border border-mc-border bg-mc-surface space-y-5 sm:space-y-6 shadow-xl">
      {/* Honeypot field for anti-spam bot capture (hidden from real users) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website}
        onChange={handleChange}
        className="hidden pointer-events-none opacity-0 absolute -z-10"
        aria-hidden="true"
      />

      {status === 'error' && (
        <div className="p-3.5 rounded-lg bg-mc-orange-10 border border-mc-orange text-mc-orange text-xs font-mono flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Email & Full Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Email Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="email" className="block text-xs font-mono text-mc-text-secondary uppercase">
              Work Email <span className="text-mc-orange">*</span>
            </label>
            {touched.email && (
              <span className="text-[11px] font-mono">
                {isEmailValid ? (
                  <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Valid</span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" /> Invalid email</span>
                )}
              </span>
            )}
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            placeholder="jane@company.com"
            className={cn(
              'w-full h-11 sm:h-12 px-4 rounded-lg bg-mc-surface-deep border text-sm text-mc-text placeholder-mc-text-tertiary transition-all outline-none',
              touched.email && isEmailValid && 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 bg-emerald-950/10',
              touched.email && !isEmailValid && 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 bg-rose-950/10',
              !touched.email && 'border-mc-border focus:border-mc-orange focus:ring-1 focus:ring-mc-orange'
            )}
          />
        </div>

        {/* Full Name Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="name" className="block text-xs font-mono text-mc-text-secondary uppercase">
              Full Name <span className="text-mc-orange">*</span>
            </label>
            {touched.name && (
              <span className="text-[11px] font-mono">
                {isNameValid ? (
                  <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Valid</span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" /> Min 2 chars</span>
                )}
              </span>
            )}
          </div>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            placeholder="Jane Doe"
            className={cn(
              'w-full h-11 sm:h-12 px-4 rounded-lg bg-mc-surface-deep border text-sm text-mc-text placeholder-mc-text-tertiary transition-all outline-none',
              touched.name && isNameValid && 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 bg-emerald-950/10',
              touched.name && !isNameValid && 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 bg-rose-950/10',
              !touched.name && 'border-mc-border focus:border-mc-orange focus:ring-1 focus:ring-mc-orange'
            )}
          />
        </div>
      </div>

      {/* Row 2: Project Budget (with USD/INR currency selector) & Timeline / Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Project Budget */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="budget" className="block text-xs font-mono text-mc-text-secondary uppercase">
              Project Budget
            </label>
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-mc-surface-deep p-0.5 rounded border border-mc-border">
              <button
                type="button"
                onClick={() => handleCurrencyChange('INR')}
                className={cn(
                  'px-2 py-0.5 text-[10px] font-mono rounded transition-all',
                  currency === 'USD'
                    ? 'bg-mc-orange text-mc-bg font-bold'
                    : 'text-mc-text-tertiary hover:text-mc-text'
                )}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyChange('INR')}
                className={cn(
                  'px-2 py-0.5 text-[10px] font-mono rounded transition-all flex items-center gap-1',
                  currency === 'INR'
                    ? 'bg-mc-orange text-mc-bg font-bold'
                    : 'text-mc-text-tertiary hover:text-mc-text'
                )}
              >
                <Globe className="w-2.5 h-2.5 inline" /> INR (₹)
              </button>
            </div>
          </div>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full h-11 sm:h-12 px-4 rounded-lg bg-mc-surface-deep border border-mc-border text-sm text-mc-text focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          >
            {budgetOptions.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline / Target Launch */}
        <div>
          <label htmlFor="timeline" className="block text-xs font-mono text-mc-text-secondary uppercase mb-1.5">
            Target Timeline
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="e.g. 1-2 Months, Q3 launch"
            className="w-full h-11 sm:h-12 px-4 rounded-lg bg-mc-surface-deep border border-mc-border text-sm text-mc-text placeholder-mc-text-tertiary focus:border-mc-orange focus:ring-1 focus:ring-mc-orange transition-all"
          />
        </div>
      </div>

      {/* Row 3: Description / Goals */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="description" className="block text-xs font-mono text-mc-text-secondary uppercase">
            Tell us about your product and goals <span className="text-mc-orange">*</span>
          </label>
          {touched.description && (
            <span className="text-[11px] font-mono">
              {isDescriptionValid ? (
                <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Valid</span>
              ) : (
                <span className="text-rose-400 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" /> Min 10 chars</span>
              )}
            </span>
          )}
        </div>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          value={formData.description}
          onChange={handleChange}
          onBlur={() => handleBlur('description')}
          placeholder="Describe your product idea, key features to build, target user roles, or key business outcomes..."
          className={cn(
            'w-full p-3.5 sm:p-4 rounded-lg bg-mc-surface-deep border text-sm text-mc-text placeholder-mc-text-tertiary transition-all outline-none min-h-[100px] sm:min-h-[110px]',
            touched.description && isDescriptionValid && 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 bg-emerald-950/10',
            touched.description && !isDescriptionValid && 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 bg-rose-950/10',
            !touched.description && 'border-mc-border focus:border-mc-orange focus:ring-1 focus:ring-mc-orange'
          )}
        />
      </div>

      {/* Row 4: How can we help you? (Multi-Select Category Chips) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-xs font-mono text-mc-text-secondary uppercase">
            How can we help you? <span className="text-mc-text-tertiary font-normal">(Select Multiple)</span>
          </label>
          <span className="text-[11px] font-mono text-mc-orange">
            {formData.selectedCategories.length} Selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((category) => {
            const isSelected = formData.selectedCategories.includes(category);
            return (
              <button
                type="button"
                key={category}
                onClick={() => toggleCategory(category)}
                className={cn(
                  'px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 active:scale-95 touch-manipulation',
                  isSelected
                    ? 'bg-mc-orange-10 border-mc-orange text-mc-orange font-semibold shadow-sm'
                    : 'bg-mc-surface-deep border-mc-border text-mc-text-secondary hover:border-mc-border-strong hover:text-mc-text'
                )}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-mc-orange shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-mc-text-tertiary shrink-0" />
                )}
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 5: Action Row (Primary Button + Prefer Email link) */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'w-full sm:w-auto px-7 h-12 text-sm font-sans font-semibold rounded-lg bg-mc-orange text-mc-bg hover:bg-mc-orange-highlight active:bg-mc-orange-dark flex items-center justify-center gap-2 transition-all shadow-md shrink-0',
            status === 'submitting' && 'opacity-70 cursor-not-allowed'
          )}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Prefer email link */}
        <div className="text-xs font-mono text-mc-text-tertiary text-center sm:text-right">
          Prefer email?{' '}
          <a
            href="mailto:studio@monolithcodes.com"
            className="text-mc-text-strong underline underline-offset-4 hover:text-mc-orange transition-colors"
          >
            studio@monolithcodes.com
          </a>
        </div>
      </div>
    </form>
  );
};
