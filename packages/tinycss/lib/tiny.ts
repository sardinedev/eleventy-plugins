import { JSDOM } from 'jsdom';
import { OptionsInterface } from './options.interface';
import { getExternalFiles, minify } from './util';

/**
 * Optimises The CSS for each HTML page by:
 * - Inlining external CSS files
 * - Merging multiple inline styles
 * @param html The HTML content
 * @param options The plugin options
 */
export const tiny = async (html: string, options?: OptionsInterface) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const styles: HTMLStyleElement[] = [...document.querySelectorAll('style')];
  const links: HTMLLinkElement[] = [...document.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]')];

  if (links.length > 0 || styles.length > 0) {
    let css: string = '';

    if (links.length > 0) {
      const externalCSS = await Promise.all(
        links.map((link) => {
          if (/^(https?\:\/\/|\/\/)/i.test(link.href)) {
            return;
          }
          return getExternalFiles(link, options?.output);
        }),
      );
      css = externalCSS.join('');
      links.map((link) => {
        if (/^(https?\:\/\/|\/\/)/i.test(link.href)) {
          return;
        }
        return link.remove();
      });
    }

    if (styles.length > 0) {
      for (const style of styles) {
        css = css + style.textContent;
        style.remove();
      }
    }
    const minicss = await minify(css, html, options);
    const inline = document.createElement('style');
    const head = document.getElementsByTagName('head')[0];
    const inlinStyle = document.createTextNode(minicss);
    inline.appendChild(inlinStyle);
    head.appendChild(inline);
    html = dom.serialize();
  }

  return html;
};
