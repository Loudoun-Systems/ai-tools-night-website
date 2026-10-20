/** Decorative motion only: no content is ever hidden behind this action. */
export function ambient(node: HTMLElement) {
	if (typeof IntersectionObserver === 'undefined') return;
	const observer = new IntersectionObserver(
		([entry]) => {
			node.classList.toggle('motion-offscreen', !entry.isIntersecting);
		},
		{ rootMargin: '80px' }
	);
	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
