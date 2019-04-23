import { MetaComponent } from '@rebelstack-io/metaflux';
import './index.css';

class ItemFormar extends MetaComponent {
	constructor () {
		super();
	}

	render () {
		let html = '<h3> TODO </h3>';
		return html;
	}

}

window.customElements.define('item-format', ItemFormar);