import EleventyCache from "@11ty/eleventy-cache-assets";
import { parseHTML } from "linkedom";
import fetch from "node-fetch";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/";


const DEFAULT_URL_THEME =
	"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css";

export async function getPrismTheme(url: string): Promise<string> {
	try {
			const response = await fetch(url);
			return await response.text();
	} catch (error) {
		console.error("[@sardine/eleventy-plugin-code-highlighter]: Failed to fetch prism theme from CDN");
		throw error;
	}
}

export const highlighter = async (
	content: string,
	url = DEFAULT_URL_THEME,
): Promise<string> => {
	const { document } = parseHTML(content);
	const head = document.getElementsByTagName("head")[0];

	if (!head) {
		console.warn("[@sardine/eleventy-plugin-code-highlighter]: No head tag found");
		return content;
	}

	const codedSections = [...document.querySelectorAll("pre > code")];
	if (codedSections.length > 0) {
		let css: string;
		try {
			css = await EleventyCache(url, {
				duration: "1h",
				type: "text",
			});
		} catch (_error) {
			console.warn("[@sardine/eleventy-plugin-code-highlighter]: Failed to fetch prism theme from cache. Trying to fetch from CDN");
			css = await getPrismTheme(url);
		}

		const inline = document.createElement("style");
		const inlinStyle = document.createTextNode(
			`/*! purgecss start ignore */ ${css} /*! purgecss end ignore */`,
		);
		inline.appendChild(inlinStyle);
		head.appendChild(inline);

		codedSections.map((section) => {
			const languages: string[] = [];
			const language = section.className.split("-")[1];
			if (language) {
				languages.push(language);
				loadLanguages(languages);
				const code = section.innerHTML;
				const prismGrammar = Prism.languages[language];
				if (!prismGrammar) {
					console.warn(
						`[@sardine/eleventy-plugin-code-highlighter]: No valid language found. Check https://prismjs.com/#supported-languages for supported languages. Language: ${language}`,
					);
					return section;
				}
				const html = Prism.highlight(code, prismGrammar, language);
				section.innerHTML = html;
				const pre = section.parentElement as HTMLElement;
				pre.className = `${pre.className} language-${language}`;
				return section;
			}
			console.warn("[@sardine/eleventy-plugin-code-highlighter]: No valid language pattern found. Pattern should be: language-<language>");
			return section;
		});
		content = document.toString();
	}
	return content;
};
