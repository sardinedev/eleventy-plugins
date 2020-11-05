import { OptionsInterface } from './options.interface';
import { tiny } from './tiny';

export default (eleventyConfig: any, options?: OptionsInterface) => {
  eleventyConfig.namespace('tinyCSS', () => {
    eleventyConfig.addTransform('tinyCSS', async (content: string, outputPath: string) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
          content = await tiny(content, options);
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};
