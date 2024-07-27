import { marked } from "marked";

export const configureMarked = () => {
    const renderer = {
        heading(text, depth) {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            return `
                <h${depth} class="group relative">
                    <a class="anchor-heading" id="${escapedText}" href="#${escapedText}">
                        <span>#</span>
                    </a>
                    ${text}
                </h${depth}>
            `;
        }
    };
    marked.use({ renderer });
};

configureMarked();

export const convertMarkdownToHTML = (content) => {
    return marked.parse(content);
};
