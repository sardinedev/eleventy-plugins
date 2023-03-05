import { PurgeCSS } from "purgecss";
import type { UserDefinedOptions as PurgeCSSOptions } from "purgecss";
import browserslist from "browserslist";
import { transform, browserslistToTargets } from "@parcel/css";
import { promises } from "fs";
import { OptionsInterface } from "./options.interface";

/**
 * Transforms the CSS to a production ready state.
 * - PurgeCSS removes all unused CSS.
 * - Autoprefixer applies vendor specific prefixes
 * - CSSNano minifies the remaining CSS
 * @param {string} rawCss The page CSS content
 * @param {string} html The raw HTML content
 */
export async function minify(
	rawCss: string,
	html: string,
	options?: OptionsInterface,
): Promise<string> {
	try {
		const userPurgeCSSOptions = options?.purgeCSS ?? {};

		const targets = browserslistToTargets(
			browserslist(options?.browserslists ?? null),
		);

		const { code } = transform({
			filename: "style.css",
			code: Buffer.from(rawCss),
			minify: true,
			targets,
		});

		const purgeCSSOptions: PurgeCSSOptions = {
			content: [
				{
					raw: html,
					extension: "html",
				},
			],
			css: [{ raw: code.toString() }],
		};

		Object.assign(purgeCSSOptions, userPurgeCSSOptions);

		const [{ css }] = await new PurgeCSS().purge(purgeCSSOptions);

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
export function getExternalFiles(
	link: HTMLLinkElement,
	root = "_site",
): Promise<string> {
	const src = root + link.href;
	return promises.readFile(src, { encoding: "utf-8" });
}
