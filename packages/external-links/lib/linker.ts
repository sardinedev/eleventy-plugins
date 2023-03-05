import { parseHTML } from "linkedom";

/**
 * Finds unsafe anchor tags and adds safer attributes
 * @param html The HTML string
 * @returns The parsed HTML with safe anchor tags
 */
export const linker = (html: string): string => {
	const { document } = parseHTML(html);
	const links = [...document.querySelectorAll<HTMLAnchorElement>("a")];

	if (links.length > 0) {
		links.map((link) => {
			if (/^(https?\:\/\/|\/\/)/i.test(link.href)) {
				link.target = "_blank";
				link.setAttribute("rel", "noreferrer");
			}
			return link;
		});
	} else {
		return html;
	}
	return document.toString();
};
