import autoprefixer, { Autoprefixer, Options as AutoprefixerOptions} from "autoprefixer";
import cssnano from "cssnano";
import postcss, { AcceptedPlugin } from "postcss";
import purgeHtml from "purgecss-from-html";
import purgecss from "@fullhuman/postcss-purgecss";
import { promises } from "fs";
import { OptionsInterface } from "./options.interface";

/**
 * Transforms the CSS to a production ready state.
 * - PurgeCSS removes all unused CSS.
 * - Autoprefixer applies vendor specific prefixes
 * - CSSNano minifies the remaining CSS
 * @param {string} css The page CSS content
 * @param {string} html The raw HTML content
 */
export async function minify(
  css: string,
  html: string,
  options?: OptionsInterface
): Promise<string> {
  const defaultPurgeCSSOptions = {
    content: [
      {
        raw: html,
        extension: "html",
      },
    ],
    extractors: [
      {
        extractor: purgeHtml,
        extensions: ["html"],
      },
    ]
  };

  let purgeCSSOptions = {
    ...defaultPurgeCSSOptions,
  };

  let autoprefixerOptions: AutoprefixerOptions = {};

  if (options?.autoprefixer) {
    autoprefixerOptions = {
      ...options.autoprefixer
    }
  }

  if (options?.purgeCSS) {
    purgeCSSOptions = {
      ...purgeCSSOptions,
      ...options.purgeCSS
    }
  }

  const postcssPlugins: AcceptedPlugin[] = [
    purgecss(purgeCSSOptions) as AcceptedPlugin,
    autoprefixer(autoprefixerOptions) as AcceptedPlugin,
    cssnano as AcceptedPlugin,
  ];

  const minicss = await postcss(postcssPlugins).process(css, {
    from: undefined,
  });
  return minicss.css;
}

/**
 * Loads an external CSS file and returns the CSS content
 * @param link The URL for an external CSS
 */
export function getExternalFiles(
  link: HTMLLinkElement,
  root: string = '_site'
): Promise<string> {
  const src = `./${root}` + link.href;
  return promises.readFile(src, { encoding: "utf-8" });
}
