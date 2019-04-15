import { MetaContainer } from '@rebelstack-io/metaflux';

class TepagoMainContainer extends MetaContainer {
	// eslint-disable-next-line class-method-use-this
	render () {
		const content = document.createElement('div');
		content.id = 'container';
		content.innerHTML = `
			<h2> SITE UNDER DEVELOP </h2>
		`;
		return content;
	}
}

window.customElements.define('tepago-container', TepagoMainContainer);
