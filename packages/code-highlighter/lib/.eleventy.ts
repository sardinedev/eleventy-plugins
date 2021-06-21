import { highlighter } from './highlighter';

interface OptionsInterface {
  urlTheme?: string;
}

export default (eleventyConfig: any, options?: OptionsInterface) => {
  eleventyConfig.namespace('codeHighlighter', () => {
    eleventyConfig.addTransform('codeHighlighter', async (content: string, outputPath: string) => {
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
