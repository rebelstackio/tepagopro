import { MetaContainer } from '@rebelstack-io/metaflux';
import '../../handlers';
import '../../components/header';
import '../../assets/css/general.css';

class TepagoMainContainer extends MetaContainer {
	// eslint-disable-next-line class-method-use-this
	render () {
		const content = document.createElement('div');
		content.id = 'container';
		const header = document.createElement('main-header');
		content.appendChild(header);
		return content;
	}
}

window.customElements.define('tepago-container', TepagoMainContainer);
