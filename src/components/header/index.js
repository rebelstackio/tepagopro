import { MetaComponent } from '@rebelstack-io/metaflux';
import menuIcon from '../../assets/icons/bars-solid.svg'
import './index.css';

class EditChannel extends MetaComponent {
	
	/**
	 * MetaComponent constructor needs storage.
	 */
	constructor () {
		super();
	}

	/**
	 * add DOM listener
	 */
	addListeners() {
		//
	}

	render () {
		// this will come from the store
		let title = 'Shopping Cart';
		let total = '0.00';
		return `
		<div>
			<h3 class="title">${ title }</h3>
			<div class="balance-box">
				<p>Total: </p>
				<span class="subtotal">
					$${ total }
				</span> 
			</div>
			<div id="menu-button">
				<img src="${menuIcon}"></img>
			</div>
		</div>
		`;
	}

}

window.customElements.define('main-header', EditChannel);
