import type { EleventyConfig } from "../../../types/eleventy";
import { Options, minify } from "html-minifier";

export default (eleventyConfig: EleventyConfig, options: Options = {}) => {
	const htmlOptions: Options = {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		decodeEntities: true,
		html5: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeOptionalTags: true,
		sortAttributes: true,
		sortClassName: true,
	};

	Object.assign(htmlOptions, options);

	eleventyConfig.namespace("tinyHTML", () => {
		eleventyConfig.addTransform(
			"tinyHTML",
			(content: string, outputPath: string) => {
				try {
					if (outputPath?.endsWith(".html")) {
						content = minify(content, htmlOptions);
					}
				} catch (error) {
					console.error(error);
				}
				return content;
			},
		);
	});
};
