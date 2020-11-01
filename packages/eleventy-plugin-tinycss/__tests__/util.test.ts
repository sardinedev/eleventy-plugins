import { getExternalFiles, minify } from '../src/util';
import { JSDOM } from "jsdom";

test('should return a promise with the contents of a CSS file', () => {
  const dom = new JSDOM();
  const document = dom.window.document;
  const linkElement: HTMLLinkElement = document.createElement('link');
  linkElement.href = '/tests/mocks/styles.css';

  const expected = `.a {font-size: large;}\n#b {color: aqua;}\n`;

  return expect(getExternalFiles(linkElement, '.')).resolves.toBe(expected);
})

test('should return a promise with the CSS styles used in the HTML', () => {
  const fullCSS = `.a {font-size: large;}\n#b {color: aqua;}\n`;
  const baseHTML = `<!DOCTYPE html>
  <html>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

  const expected = `.a{font-size:large}`;

  return expect(minify(fullCSS, baseHTML)).resolves.toBe(expected);
})


test('should accept Autoprefixer options', () => {
  const fullCSS = `.a {font-size: large;-webkit-border-radius: 12px;border-radius: 12px;}\n`;
  const baseHTML = `<!DOCTYPE html>
  <html>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

  const expected = `.a{font-size:large;-webkit-border-radius:12px;border-radius:12px}`;

  return expect(minify(fullCSS, baseHTML, {autoprefixer: { remove: false}})).resolves.toBe(expected);
})
