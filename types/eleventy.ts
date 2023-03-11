export interface EleventyConfig {
  /**
   * A shortcode returns content (a JavaScript string or template literal) that is used in the template.
   * 
   * https://www.11ty.dev/docs/shortcodes/
   */
  addAsyncShortcode: (name: string, callback: (content: string, path: string) => Promise<string>) => void;
  /**
   * Transforms can modify a template’s output. For example, use a transform to format/prettify an HTML file with proper whitespace.
   * The provided transform function must return the original or transformed content.
   * 
   * https://www.11ty.dev/docs/config/#transforms
   */
  addTransform: (name: string, callback: (content: string, path: string) => string | Promise<string>) => void;
  /**
   * You can namespace parts of your configuration using `eleventyConfig.namespace`.
   * This will add a string prefix to all filters, tags, helpers, shortcodes, collections, and transforms.
   */
  namespace: (namespace: string, callback: () => void) => void;
}
