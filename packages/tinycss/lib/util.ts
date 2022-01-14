import postcss, { AcceptedPlugin } from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';
import { transform } from '@parcel/css';
import { promises } from 'fs';
import { OptionsInterface } from './options.interface';
import { PurgeCSSOptions } from './purgeCSS.interface';

/**
 * Transforms the CSS to a production ready state.
 * - PurgeCSS removes all unused CSS.
 * - Autoprefixer applies vendor specific prefixes
 * - CSSNano minifies the remaining CSS
 * @param {string} rawCss The page CSS content
 * @param {string} html The raw HTML content
 */
export async function minify(rawCss: string, html: string, options?: OptionsInterface): Promise<string> {
  try {
    const userPurgeCSSOptions = options?.purgeCSS ?? {};
    const purgeCSSOptions: PurgeCSSOptions = {
      content: [
        {
          raw: html,
          extension: 'html',
        },
      ],
    };

    Object.assign(purgeCSSOptions, userPurgeCSSOptions);

    const { code } = transform({
      filename: 'style.css',
      code: Buffer.from(rawCss),
      minify: true,
    });

    const postcssPlugins: AcceptedPlugin[] = [purgecss(purgeCSSOptions)];

    const { css } = await postcss(postcssPlugins).process(code, {
      from: undefined,
    });
    return css;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Loads an external CSS file and returns the CSS content
 * @param link The URL for an external CSS
 */
export function getExternalFiles(link: HTMLLinkElement, root = '_site'): Promise<string> {
  const src = root + link.href;
  return promises.readFile(src, { encoding: 'utf-8' });
}
