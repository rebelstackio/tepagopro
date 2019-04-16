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
		this.querySelector('#menu-button')
		.addEventListener('click', () => {
			this.handleMenu()
		})
	}

	handleMenu() {
		global.storage.dispatch({type: 'OPEN-MENU'})
	}

	render () {
		let { viewTitle } = global.storage.getState().Main;
		let total = '0.00';
		return `
		<div>
			<h4 class="title">${ viewTitle }</h4>
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
