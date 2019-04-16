import { MetaComponent } from '@rebelstack-io/metaflux';
import menuIcon from '../../assets/icons/bars-solid.svg'
import './index.css';

class EditChannel extends MetaComponent {
	
	/**
	 * MetaComponent constructor needs storage.
	 */
	constructor () {
		super(global.storage);
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
		this.storage.dispatch({type: 'OPEN-MENU'})
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

	handleStoreEvents () {
		return {
			'OPEN-ITINERARY': () => {
				const shceduleLimit = document.createElement('span');
				shceduleLimit.className = 'schedule-limit';
				shceduleLimit.innerHTML = 'Thu Apr-16,Sat May-04, 2019'
				document.querySelector('.title').innerHTML = 'Itinerary';
				document.querySelector('.balance-box').appendChild(shceduleLimit);
			}
		}
	}

}

window.customElements.define('main-header', EditChannel);
