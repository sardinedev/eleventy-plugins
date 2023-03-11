import type { EleventyConfig } from "../../../types/eleventy";
import type { OptionsInterface } from "./options.interface";
import { tiny } from "./tiny";

export type { OptionsInterface };

export default (eleventyConfig: EleventyConfig, options?: OptionsInterface) => {
	eleventyConfig.namespace("tinyCSS", () => {
		eleventyConfig.addTransform(
			"tinyCSS",
			async (content: string, outputPath: string) => {
				try {
					if (outputPath?.endsWith(".html")) {
						content = await tiny(content, options);
					}
				} catch (error) {
					console.error(error);
				}
				return content;
			},
		);
	});
};
