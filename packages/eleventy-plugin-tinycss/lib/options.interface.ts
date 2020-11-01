import { Options as AutoprefixerOptions } from "autoprefixer";

export interface OptionsInterface {
  /** Autoprefixer options */
  autoprefixer?: AutoprefixerOptions
  /** The 11ty output directory. It defaults to `_site` */
  output?: string;
  purgeCSS?: any; //can't figure out the typings
}
