import markdownItLazyLoading from '@junwatu/markdown-it-lazy-loading';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt().use(markdownItLazyLoading, { img: 'lazy' });

export function markdown(node: HTMLElement) {
	node.innerHTML = md.render(node.textContent || '');
}
