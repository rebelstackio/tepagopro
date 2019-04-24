import { MetaComponent } from '@rebelstack-io/metaflux';
import './shopping';
import './itinerary';
import './contactus';

class Body extends MetaComponent {
	constructor () {
		super(global.storage);
	}

	render () {
		return document.createElement('item-format');
	}
	/**
	 * change the view on dispatch
	 * @param {Int} n 
	 */
	changeView (n) {
		switch (n) {
			case 1:
				const itinerary = document.createElement('itinerary-format');
				// clean the DOM
				this.innerHTML = '';
				this.appendChild(itinerary);
				break;
			case 2:
				// TODO: create settings view
				break;
			case 3: 
				const history = document.createElement('item-format');
				// clean the DOM
				this.innerHTML = '';
				this.appendChild(history);
				break;
			case 4:
				//TODO: create contact us view
				const contact = document.createElement('contact-us');
				this.innerHTML = '';
				this.appendChild(contact);
				break;
			default:
				const shopping = document.createElement('item-format');
				// clean the DOM
				this.innerHTML = '';
				this.appendChild(shopping);
				break;
		}
	}

	handleStoreEvents () {
		return {
			'CHANGE-VIEW': () => {
				const { viewNumber } = this.storage.getState().Main;
				this.changeView(viewNumber);
			}
		}
	}

}

window.customElements.define('main-body', Body);