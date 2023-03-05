import { replaceWhitespace } from "../../../util/util";
import { linker } from "../lib/linker";

test("finds external anchor links", () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <body>
      <a href="https://www.out.com">Click me!</a>
      <a href="https://www.blank.com" target="_blank">Click me!</a>
      <a href="https://www.rel.com" rel="noopener">Click me!</a>
      <a href="/blog/">Click me!</a>
      <p>heelo</p>
    </body>
  </html>`;

	const expectedHTML = `
  <!DOCTYPE html>
  <html>
    <body>
      <a rel="noreferrer" target="_blank" href="https://www.out.com">Click me!</a>
      <a rel="noreferrer" href="https://www.blank.com" target="_blank">Click me!</a>
      <a target="_blank" href="https://www.rel.com" rel="noreferrer">Click me!</a>
      <a href="/blog/">Click me!</a>
      <p>heelo</p>
    </body>
  </html>`;

	return expect(replaceWhitespace(linker(inputHTML))).toBe(
		replaceWhitespace(expectedHTML),
	);
});
