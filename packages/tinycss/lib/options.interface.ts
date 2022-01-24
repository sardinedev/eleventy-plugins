import autoprefixer from 'autoprefixer';
import { PurgeCSSOptions } from './purgeCSS.interface';

export interface OptionsInterface {
  /** Autoprefixer options */
  autoprefixer?: autoprefixer.Options;
  /** The 11ty output directory. It defaults to `_site` */
  output?: string;
  purgeCSS?: PurgeCSSOptions;
}
