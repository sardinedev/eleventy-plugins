export default (eleventyConfig: any, options?: any) => {
  eleventyConfig.namespace('external-links', () => {
    eleventyConfig.addTransform('external-links', async (content: string, outputPath: string) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};
