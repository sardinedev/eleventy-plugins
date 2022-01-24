import { highlighter } from './highlighter';

export interface OptionsInterface {
  urlTheme?: string;
}

module.exports = (eleventyConfig: any, options?: OptionsInterface) => {
  eleventyConfig.namespace('sardine-', () => {
    eleventyConfig.addTransform('code-highlighter', async (content: string, outputPath: string) => {
      try {
        if (outputPath && outputPath.endsWith('.html')) {
          content = await highlighter(content, options?.urlTheme);
        }
      } catch (error) {
        console.error(error);
      }
      return content;
    });
  });
};
