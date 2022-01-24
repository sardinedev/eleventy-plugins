import { pictureBuilder } from './pictureBuilder';

interface OptionsInterface {
  /** The 11ty output directory. It defaults to `_site` */
  output?: string;
}

module.exports = (eleventyConfig: any, options?: OptionsInterface) => {
  eleventyConfig.namespace('sardine_', () => {
    eleventyConfig.addTransform('image-optimiser', async (content: string, outputPath: string) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
          const outputDir = options?.output ?? '_site';
          content = await pictureBuilder(content, outputPath, outputDir);
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};
