import type { UserDefinedOptions as PurgeCSSOptions } from "purgecss";

export interface OptionsInterface {
	/** The 11ty output directory. It defaults to `_site` */
	output?: string;
	/** PurgeCSS Options : https://purgecss.com/configuration.html#options */
	purgeCSS?: PurgeCSSOptions;
	browserslists?: string;
}
