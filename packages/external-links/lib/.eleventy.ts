import { linker } from '../lib/linker';

module.exports = (eleventyConfig: any) => {
  eleventyConfig.namespace('external-links', () => {
    eleventyConfig.addTransform('external-links', (content: string, outputPath: string) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
          content = linker(content);
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};
