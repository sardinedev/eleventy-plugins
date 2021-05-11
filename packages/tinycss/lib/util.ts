import autoprefixer, { Options as AutoprefixerOptions } from 'autoprefixer';
import cssnano from 'cssnano';
import postcss, { AcceptedPlugin } from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';
import { promises } from 'fs';
import { OptionsInterface } from './options.interface';
import { PurgeCSSOptions } from './purgeCSS.interface';

/**
 * Transforms the CSS to a production ready state.
 * - PurgeCSS removes all unused CSS.
 * - Autoprefixer applies vendor specific prefixes
 * - CSSNano minifies the remaining CSS
 * @param {string} css The page CSS content
 * @param {string} html The raw HTML content
 */
export async function minify(css: string, html: string, options?: OptionsInterface): Promise<string> {
  try {
    const userAutoprefixerOptions = options?.autoprefixer ?? {};
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

    const autoprefixerOptions: AutoprefixerOptions = Object.assign({}, userAutoprefixerOptions);

    const postcssPlugins: AcceptedPlugin[] = [
      purgecss(purgeCSSOptions),
      autoprefixer(autoprefixerOptions) as AcceptedPlugin,
      cssnano as AcceptedPlugin,
    ];

    const minicss = await postcss(postcssPlugins).process(css, {
      from: undefined,
    });
    return minicss.css;
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
