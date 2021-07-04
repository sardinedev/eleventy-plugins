import { pictureBuilder } from './pictureBuilder';

export default (eleventyConfig: any) => {
  eleventyConfig.namespace('sardine_', () => {
    eleventyConfig.addTransform('image-optimiser', async (content: string, outputPath: string) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
          const outputDir = eleventyConfig._config.dir.output;
          content = await pictureBuilder(content, outputPath, outputDir);
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};
