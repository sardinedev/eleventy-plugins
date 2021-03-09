import { parseHTML } from 'linkedom';

export const linker = (html: string): string => {
  const { document } = parseHTML(html);
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a')];

  if (links.length > 0) {
    links.map((link) => {
      if (/^(https?\:\/\/|\/\/)/i.test(link.href)) {
        link.target = '_blank';
        link.setAttribute('rel', 'noreferrer');
      }
      return link;
    });
  } else {
    return html;
  }
  return document.toString();
};
