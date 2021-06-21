import { parseHTML } from 'linkedom';
import { highlighter } from '../lib/highlighter';

describe('well formated code', () => {
  let document: Document;
  const inputHTML = `
  <!DOCTYPE html>
  <head>
  </head>
  <html>
    <body>
      <pre class="mock">
        <code class="language-css">
          .body {
            margin: 0;
          }
        </code>
      </pre>
    </body>
  </html>`;

  beforeAll(async () => {
    const styledHTML = await highlighter(inputHTML);
    document = parseHTML(styledHTML).document;
  });

  test('inlines prism css', () => {
    const styles: HTMLStyleElement[] = [...document.querySelectorAll('style')];

    return expect(styles[0].innerHTML.startsWith('/*! purgecss start ignore */')).toBe(true);
  });

  test('adds class name to code element', () => {
    const codedSections = [...document.querySelectorAll('pre')];

    return expect(codedSections[0].className).toBe('mock language-css');
  });
});

test('ignores styling if cant find pre > code elements', async () => {
  const inputHTML = `
  <!DOCTYPE html>
  <head>
  </head>
  <html>
    <body>
        <code>
          .body {
            margin: 0;
          }
        </code>
    </body>
  </html>`;

  const styledHTML = await highlighter(inputHTML);
  const { document } = parseHTML(styledHTML);
  const styles: HTMLStyleElement[] = [...document.querySelectorAll('style')];

  return expect(styles).toHaveLength(0);
});

test('ignores if language class is not in the right format: language-{name}', async () => {
  const inputHTML = `
  <!DOCTYPE html>
  <head>
  </head>
  <html>
    <body>
      <pre>
        <code class="css">
          .body {
            margin: 0;
          }
        </code>
      </pre>
    </body>
  </html>`;

  const styledHTML = await highlighter(inputHTML);
  const { document } = parseHTML(styledHTML);
  const codedSections = [...document.querySelectorAll('pre')];

  return expect(codedSections[0].className).toBeFalsy();
});
