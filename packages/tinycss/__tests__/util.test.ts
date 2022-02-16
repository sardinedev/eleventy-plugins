import { getExternalFiles, minify } from '../lib/util';
import { replaceWhitespace } from '../../../util/util';
import { JSDOM } from 'jsdom';

test('should return a promise with the contents of a CSS file', async () => {
  const dom = new JSDOM();
  const document = dom.window.document;
  const linkElement: HTMLLinkElement = document.createElement('link');
  linkElement.href = '/mocks/styles.css';

  const expected = `.a{font-size:large;}#b{color:aqua;}`;

  let optimisedCSS = await getExternalFiles(linkElement, __dirname);
  optimisedCSS = replaceWhitespace(optimisedCSS);

  return expect(optimisedCSS).toBe(expected);
});

test('should return a promise with the CSS styles used in the HTML', async () => {
  const fullCSS = `.a {font-size: large;}\n#b {color: aqua;}\n`;
  const baseHTML = `<!DOCTYPE html>
  <html>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

  const expected = replaceWhitespace('.a{font-size:large}');

  let optimisedCSS = await minify(fullCSS, baseHTML);

  optimisedCSS = replaceWhitespace(optimisedCSS);

  return expect(optimisedCSS).toBe(expected);
});

test('should accept Browserslist options', async () => {
  const fullCSS = `.a {-webkit-border-radius:12px;font-size: large;border-radius: 12px;}\n`;
  const baseHTML = `<!DOCTYPE html>
  <html>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

  const expected = `.a{border-radius:12px;font-size:large}`;

  let optimisedCSS = await minify(fullCSS, baseHTML, { browserslists: 'last 2 versions' });
  optimisedCSS = replaceWhitespace(optimisedCSS);

  return expect(optimisedCSS).toBe(expected);
});
