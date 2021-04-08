type StringRegExpArray = Array<RegExp | string>;
type ComplexSafelist = {
    standard?: StringRegExpArray;
    deep?: RegExp[];
    greedy?: RegExp[];
    variables?: StringRegExpArray;
    keyframes?: StringRegExpArray;
};
type UserDefinedSafelist = StringRegExpArray | ComplexSafelist;
interface RawContent<T = string> {
    extension: string;
    raw: T;
}

type ExtractorFunction<T = string> = (content: T) => string[];
interface Extractors {
    extensions: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractor: any;
}
export interface PurgeCSSOptions {
    content?: Array<string | RawContent>;
    contentFunction?: (sourceFile: string) => Array<string | RawContent>;
    defaultExtractor?: ExtractorFunction;
    extractors?: Array<Extractors>;
    fontFace?: boolean;
    keyframes?: boolean;
    output?: string;
    rejected?: boolean;
    stdin?: boolean;
    stdout?: boolean;
    variables?: boolean;
    safelist?: UserDefinedSafelist;
    blocklist?: StringRegExpArray;
    skippedContentGlobs?: Array<string>;
}
