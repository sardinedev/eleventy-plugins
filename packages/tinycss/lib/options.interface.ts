import { PurgeCSSOptions } from './purgeCSS.interface';

export interface OptionsInterface {
  /** The 11ty output directory. It defaults to `_site` */
  output?: string;
  purgeCSS?: PurgeCSSOptions;
}
