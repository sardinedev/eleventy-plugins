import path from 'path';
import sharp, { Sharp } from 'sharp';
import { stat } from 'fs/promises';
import { parseHTML } from 'linkedom';

type ValidImageTypes = keyof Pick<Sharp, 'avif' | 'webp' | 'jpeg'>;

const IMAGE_FORMATS: ValidImageTypes[] = ['avif', 'webp', 'jpeg'];

/**
 * 1 - Parse HTML
 * 2 - Find Image elements
 * 3 - Read image's attributes (src, alt, title)
 * 4 - Use img src to create multiple image formats (avif, webp, optimize jpg)
 * 5 - Compose picture element
 */

// Different viewport sizes to be used to resize images
const widths = [1920, 1280, 640, 320];

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Creates an image name with the file with on it. ie:
 *
 * `/img/hey-1920w.jpg`
 * @param {string} filename The image filename
 * @param {number} width The desired image width
 * @param {string} format The image format
 */
 function sizedName(filename: string, width: number, format: string) {
  if (format === 'jpeg') {
    format = 'jpg';
  }

  return filename.replace(/\.\w+$/, () => '-' + width + 'w' + '.' + format);
}

/**
 * Resizes an image. For each image we'll have multiple sizes for different viewports.
 * @param {string} filename The image filename
 * @param {string} width The desired image width
 * @param {string} format The image format
 */
async function resize(filename: string, width: number, format: ValidImageTypes) {
  try {
    const out = sizedName(filename, width, format);
    if (await fileExists(out)) {
      return out;
    }

    await sharp(filename)
      .resize(width)
      [format]({
        quality: 75,
      })
      .toFile(out);

    return out;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Creates a <srcset> element with multiple images sizes:
 *
 * `<source srcset="/img/hey-1920w.jpg 1920w, /img/hey-1280w.jpg 1280w, /img/hey-640w.jpg 640w, /img/hey-320w.jpg 320w" sizes="(max-width: 608px) 100vw, 608px" type="image/jpeg">`
 * @param {string} filename
 * @param {string} format
 */
 async function srcset(filename: string, format: ValidImageTypes) {
  const names = await Promise.all(widths.map((w) => resize(filename, w, format)));
  return names.map((n, i) => `${n} ${widths[i]}w`).join(', ');
}

/**
 *
 * @param {HTMLImageElement} img The DOM element for the image
 * @param {string} src The image's URL
 * @param {string} format The image format
 */
async function setSrcset(img: HTMLSourceElement, src: string, format: ValidImageTypes) {
  img.setAttribute('srcset', await srcset(src, format));
  img.setAttribute(
    'sizes',
    img.getAttribute('align') ? '(max-width: 608px) 50vw, 187px' : '(max-width: 608px) 100vw, 608px',
  );
}

async function buildPictureElement(
  img: HTMLImageElement,
  outputPath: string,
  outputDir: string,
  formats: ValidImageTypes[],
) {
  const src = img.getAttribute('src') as string;
  let pathToImage = path.dirname(outputPath) + src;

  // if the image source is external, there's nothing to do
  if (/^(https?\:\/\/|\/\/)/i.test(src)) {
    return;
  }

  // if the image source is relative resolve the path to it
  if (/^\.+\//.test(src)) {
    pathToImage = '/' + path.relative(outputDir, path.resolve(path.dirname(outputPath), src));
  }

  // By setting the `height` and `width` attributes browsers can prevent Content Layout Shift when loading images
  try {
    console.log(pathToImage);
    const { format, height, width } = await sharp(pathToImage).metadata();
    if (height && width) {
      const heightString = height.toString();
      const widthString = height.toString();
      img.setAttribute('width', widthString);
      img.setAttribute('height', heightString);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
    img.setAttribute('decoding', 'async');

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading
    img.setAttribute('loading', 'lazy');

    // If the image type is SVG, we're done.
    if (format == 'svg') {
      return;
    }

    const doc = img.ownerDocument;
    const picture = doc.createElement('picture');

    for (const format of formats) {
      const el = doc.createElement('source');
      await setSrcset(el, pathToImage, format);
      el.setAttribute('type', `image/${format}`);
      picture.appendChild(el);
    }

    img.parentElement?.replaceChild(picture, img);
    picture.appendChild(img);
    return img;
  } catch (error) {
    console.warn(error.message);
    return;
  }
}

export const pictureBuilder = async (
  html: string,
  outputPath: string,
  outputDir = '_site',
  formats = IMAGE_FORMATS,
): Promise<string> => {
  const { document } = parseHTML(html);
  const images = [...document.querySelectorAll<HTMLImageElement>('img')];

  if (images.length > 0) {
    await Promise.all(images.map((img) => buildPictureElement(img, outputPath, outputDir, formats)));
    html = document.toString();
  }

  return html;
};
