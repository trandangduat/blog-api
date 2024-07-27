import { marked } from "marked";

const slashEscape = (text) => {
    return text.toLowerCase().replace(/[^\w]+/g, '-');
};

export const configureMarked = () => {
    const renderer = {
        heading(text, depth) {
            const escapedText = slashEscape(text);
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

export const exportHeadingsFromMarkdown = (content) => {
    const headings = marked.lexer(content).filter((value) => value.type == 'heading' && value.depth <= 3);
    return headings.map((heading) => ({
        text: heading.text,
        depth: heading.depth,
        url: '#' + slashEscape(heading.text)
    }));
};
