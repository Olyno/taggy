import party from 'party-js';

export function confetti(node: HTMLElement) {
	node.addEventListener('click', () => {
		party.confetti(node, {
			count: party.variation.range(20, 40)
		});
	});
}
