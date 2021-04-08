import { Options as AutoprefixerOptions } from 'autoprefixer';
import { PurgeCSSOptions } from './purgeCSS.interface';

export interface OptionsInterface {
  /** Autoprefixer options */
  autoprefixer?: AutoprefixerOptions;
  /** The 11ty output directory. It defaults to `_site` */
  output?: string;
  purgeCSS?: PurgeCSSOptions;
}
