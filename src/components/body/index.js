import { MetaComponent } from '@rebelstack-io/metaflux';
import './itinerary';

class Body extends MetaComponent {
	constructor () {
		super();
	}

	render () {
		return document.createElement('itinerary-format');
	}

	

}

window.customElements.define('main-body', Body);