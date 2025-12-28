'use client';

import { useEffect } from 'react';
import { Language } from '@/lib/translations';

interface SEOHeadProps {
  lang: Language;
}

const seoData = {
  en: {
    title: 'IBUILDRUN | Full-Stack Developer & Software Architect',
    description: 'Full-Stack Software Engineer & Architect. Specializing in Next.js, React, TypeScript, .NET, and AI-augmented development. Building scalable web applications and enterprise systems.',
    ogTitle: 'IBUILDRUN | Full-Stack Developer & Software Architect',
    ogDescription: 'Full-Stack Software Engineer specializing in Next.js, React, TypeScript, .NET, and AI-augmented development.',
  },
  ru: {
    title: 'IBUILDRUN | Full-Stack Разработчик и Архитектор ПО',
    description: 'Full-Stack разработчик и архитектор программного обеспечения. Специализация: Next.js, React, TypeScript, .NET и AI-разработка. Создание масштабируемых веб-приложений и корпоративных систем.',
    ogTitle: 'IBUILDRUN | Full-Stack Разработчик и Архитектор ПО',
    ogDescription: 'Full-Stack разработчик. Специализация: Next.js, React, TypeScript, .NET и AI-разработка.',
  },
};

const SEOHead: React.FC<SEOHeadProps> = ({ lang }) => {
  useEffect(() => {
    const data = seoData[lang];
    
    // Update document title
    document.title = data.title;
    
    // Update html lang attribute
    document.documentElement.lang = lang;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', data.description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', data.ogTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', data.ogDescription);
    }
    
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', lang === 'ru' ? 'ru_RU' : 'en_US');
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', data.ogTitle);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', data.ogDescription);
    }

    // Update JSON-LD
    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      try {
        const jsonLd = JSON.parse(jsonLdScript.textContent || '{}');
        if (jsonLd['@graph']) {
          const website = jsonLd['@graph'].find((item: { '@type': string }) => item['@type'] === 'WebSite');
          if (website) {
            website.description = lang === 'ru' 
              ? 'Full-Stack Разработчик и Архитектор ПО - Портфолио'
              : 'Full-Stack Developer & Software Architect Portfolio';
          }
          const person = jsonLd['@graph'].find((item: { '@type': string }) => item['@type'] === 'Person');
          if (person) {
            person.description = data.description;
          }
        }
        jsonLdScript.textContent = JSON.stringify(jsonLd);
      } catch {
        // ignore JSON parse errors
      }
    }
  }, [lang]);

  return null;
};

export default SEOHead;
