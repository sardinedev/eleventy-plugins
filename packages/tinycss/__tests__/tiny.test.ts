import { tiny } from "../lib/tiny";
import { replaceWhitespace } from "../../../util/util";

test("should read CSS from an external file and inline the optimised CSS", async () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <link href="/mocks/styles.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let expectedHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <style>.a{font-size:large}</style>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let optimisedCSS = await tiny(inputHTML, {
		output: __dirname,
		purgeCSS: { keyframes: false },
	});

	optimisedCSS = replaceWhitespace(optimisedCSS);

	expectedHTML = replaceWhitespace(expectedHTML);

	return expect(optimisedCSS).toBe(expectedHTML);
});

test("should merge multiple inline CSS", async () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <style>h1{font-size: 2.5rem;}</style>
    </head>
    <body>
      <style>.a{padding: 0.5rem;}</style>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let expectedHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <style>h1{font-size:2.5rem}.a{padding:.5rem}</style>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let optimisedCSS = await tiny(inputHTML, { output: "tests" });

	optimisedCSS = replaceWhitespace(optimisedCSS);

	expectedHTML = replaceWhitespace(expectedHTML);

	return expect(optimisedCSS).toBe(expectedHTML);
});

test("should read CSS from an external file, inline the optimised CSS and keep the external CSS from diff domain", async () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <link href="/mocks/styles.css" rel="stylesheet" type="text/css">
    <link href="https://www.mock.com/styles.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let expectedHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <link href="https://www.mock.com/styles.css" rel="stylesheet" type="text/css">
    <style>.a{font-size:large}</style>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let optimisedCSS = await tiny(inputHTML, { output: __dirname });

	optimisedCSS = replaceWhitespace(optimisedCSS);

	expectedHTML = replaceWhitespace(expectedHTML);

	return expect(optimisedCSS).toBe(expectedHTML);
});

test("should read both an external CSS file and inline CSS and then inline optimised CSS", async () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <link href="/mocks/styles.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <style>.a{padding: 0.5rem;}</style>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let expectedHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    <style>.a{font-size:large} .a{padding:.5rem}</style>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let optimisedCSS = await tiny(inputHTML, { output: __dirname });

	optimisedCSS = replaceWhitespace(optimisedCSS);

	expectedHTML = replaceWhitespace(expectedHTML);

	return expect(optimisedCSS).toBe(expectedHTML);
});

test("should return the HTML if no CSS links are present", async () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let expectedHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let optimisedCSS = await tiny(inputHTML, { output: __dirname });

	optimisedCSS = replaceWhitespace(optimisedCSS);

	expectedHTML = replaceWhitespace(expectedHTML);

	return expect(optimisedCSS).toBe(expectedHTML);
});

test("should return the HTML if no inline or CSS links are present", async () => {
	const inputHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let expectedHTML = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <h1 class="a">Hello!</h1>
    </body>
  </html>`;

	let optimisedCSS = await tiny(inputHTML, { output: __dirname });

	optimisedCSS = replaceWhitespace(optimisedCSS);

	expectedHTML = replaceWhitespace(expectedHTML);

	return expect(optimisedCSS).toBe(expectedHTML);
});
