import type { EleventyConfig } from "../../../types/eleventy";;
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { optimize } from "svgo";

const config = {
	plugins: [
		"removeDoctype",
		"removeXMLProcInst",
		"removeComments",
		"removeMetadata",
		"removeXMLNS",
		"removeEditorsNSData",
		"cleanupAttrs",
		"inlineStyles",
		"minifyStyles",
		"convertStyleToAttrs",
		"cleanupIDs",
		"removeRasterImages",
		"removeUselessDefs",
		"cleanupNumericValues",
		"cleanupListOfValues",
		"convertColors",
		"removeUnknownsAndDefaults",
		"removeNonInheritableGroupAttrs",
		"removeUselessStrokeAndFill",
		"removeViewBox",
		"cleanupEnableBackground",
		"removeHiddenElems",
		"removeEmptyText",
		"convertShapeToPath",
		"moveElemsAttrsToGroup",
		"moveGroupAttrsToElems",
		"collapseGroups",
		"convertPathData",
		"convertEllipseToCircle",
		"convertTransform",
		"removeEmptyAttrs",
		"removeEmptyContainers",
		"mergePaths",
		"removeUnusedNS",
		"reusePaths",
		"sortAttrs",
		"sortDefsChildren",
		"removeTitle",
		"removeDesc",
		"removeDimensions",
		"removeStyleElement",
		"removeScriptElement",
	],
};

export interface InlineSVGoptions {
	/** The base URL to the folder containing the SVG */
	baseUrl: string;
	svgoPlugins?: string[];
}

export default (eleventyConfig: EleventyConfig, options: InlineSVGoptions) => {
	eleventyConfig.addAsyncShortcode("svg", async (svgName: string) => {
		const svgData: string = readFileSync(
			join(options.baseUrl, `${svgName}.svg`),
			"utf8",
		);
		const svgoPlugins = options.svgoPlugins ?? [];
		const { data } = await optimize(svgData, { ...config, svgoPlugins });
		return data;
	});
};
