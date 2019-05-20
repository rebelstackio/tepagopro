import { MetaComponent } from '@rebelstack-io/metaflux';
import './shopping';
import './itinerary';
import './contactus';
import './settings';
import './paypal';

class Body extends MetaComponent {
	constructor () {
		super(global.TPGstorage);
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
				const settings = document.createElement('main-settings');
				this.innerHTML = '';
				this.appendChild(settings);
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
			case 5: 
				const payPal = document.createElement('paypal-crud');
				this.innerHTML = ''
				this.appendChild(payPal);
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