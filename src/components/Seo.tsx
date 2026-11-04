import { useEffect } from 'react';

/** Injects a JSON-LD <script> into <head> while mounted (keyed by id so it is never duplicated). */
export const JsonLd: React.FC<{ id: string; data: Record<string, unknown> }> = ({ id, data }) => {
  useEffect(() => {
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      el?.remove();
    };
  }, [id, data]);
  return null;
};

const setMeta = (selector: string, attr: 'content', value: string) => {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute(attr, value);
};

export interface PageMeta {
  title: string;
  description: string;
}

/** Updates <title> and the description / social tags (used when the hash-route "page" changes). */
export const applyPageMeta = ({ title, description }: PageMeta) => {
  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
};

export const PAGE_META: Record<'home' | 'privacy' | 'terms' | 'about', PageMeta> = {
  home: {
    title: 'MONOLITH CODES | Custom Software Development Studio',
    description:
      'Custom software development studio. We hand-code websites, web apps, SaaS platforms, mobile apps and ERP/CRM systems with 100% IP ownership. Get a quote.',
  },
  privacy: {
    title: 'Privacy Policy | MONOLITH CODES',
    description:
      'How MONOLITH CODES collects, uses and protects personal data submitted through this website, and the choices and rights you have over that data.',
  },
  terms: {
    title: 'Terms of Use | MONOLITH CODES',
    description:
      'The terms that govern access to and use of the MONOLITH CODES website and its project inquiry tools.',
  },
  about: {
    title: 'About MONOLITH CODES | Software Engineering Studio & Team',
    description:
      'Meet the founders and engineers behind MONOLITH CODES — a custom software engineering studio building hand-coded web apps, SaaS, mobile apps and ERP/CRM systems.',
  },
};
