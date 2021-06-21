import { parseHTML } from 'linkedom';
import EleventyCache from '@11ty/eleventy-cache-assets';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/';

const DEFAULT_URL_THEME = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css';

export const highlighter = async (content: string, url = DEFAULT_URL_THEME): Promise<string> => {
  const { document } = parseHTML(content);
  const head = document.getElementsByTagName('head')[0];

  const codedSections = [...document.querySelectorAll('pre > code')];
  if (codedSections.length > 0) {
    const css: string = await EleventyCache(url, {
      duration: '1h',
      type: 'text',
    });

    const inline = document.createElement('style');
    const inlinStyle = document.createTextNode(`/*! purgecss start ignore */ ${css} /*! purgecss end ignore */`);
    inline.appendChild(inlinStyle);
    head.appendChild(inline);

    codedSections.map((section) => {
      const languages = [];
      const language = section.className.split('-')[1];
      if (language) {
        languages.push(language);
        loadLanguages(languages);
        const code = section.innerHTML;
        const html = Prism.highlight(code, Prism.languages[language], language);
        section.innerHTML = html;
        const pre = section.parentElement as HTMLElement;
        pre.className = `${pre.className} language-${language}`;
        return section;
      }
    });
    content = document.toString();
  }
  return content;
};
