import { MetaContainer } from '@rebelstack-io/metaflux';
import '../../handlers';
import '../../components/header';
import '../../components/dropdown';
import '../../assets/css/general.css';

class TepagoMainContainer extends MetaContainer {
	// eslint-disable-next-line class-method-use-this
	render () {
		const content = document.createElement('div');
		content.id = 'container';
		const header = document.createElement('main-header');
		const dropdown = document.createElement('dropdown-menu');
		content.append(header, dropdown);
		return content;
	}
}

window.customElements.define('tepago-container', TepagoMainContainer);
