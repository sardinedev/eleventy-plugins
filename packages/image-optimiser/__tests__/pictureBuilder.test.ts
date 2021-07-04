import { parseHTML } from 'linkedom';
import { pictureBuilder } from '../lib/pictureBuilder';

describe('optimise images', () => {
  let document: Document;
  const inputHTML = `
  <!DOCTYPE html>
  <head>
  </head>
  <html>
    <body>
      <img src="/public/test.jpg" />
    </body>
  </html>`;

  beforeAll(async () => {
    const styledHTML = await pictureBuilder(inputHTML, '__tests__/site/posts/index.html', '__tests__/site');
    document = parseHTML(styledHTML).document;
  });

  test('run e2e', () => {
    const picture: HTMLPictureElement[] = [...document.querySelectorAll('picture')];
    console.log(picture[0].innerHTML);
    return expect(picture[0]).toBeTruthy();
  });

  // test('adds class name to code element', () => {
  //   const codedSections = [...document.querySelectorAll('pre')];

  //   return expect(codedSections[0].className).toBe('mock language-css');
  // });
});
