import { parseHTML } from 'linkedom';
import { pictureBuilder } from '../lib/pictureBuilder';

describe('well formated code', () => {
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
    const styledHTML = await pictureBuilder(inputHTML, '__tests__/_site/posts/index.html');
    document = parseHTML(styledHTML).document;
  });

  test('inlines prism css', () => {
    const picture: HTMLPictureElement[] = [...document.querySelectorAll('picture')];
    console.log(picture[0].innerHTML);
    return expect(picture[0]).toBeTruthy();
  });

  // test('adds class name to code element', () => {
  //   const codedSections = [...document.querySelectorAll('pre')];

  //   return expect(codedSections[0].className).toBe('mock language-css');
  // });
});
