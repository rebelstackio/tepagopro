import { MetaComponent } from '@rebelstack-io/metaflux';
import menuIcon from '../../assets/icons/bars-solid.svg';
import cartIcon from '../../assets/icons/shopping-cart-solid.svg';
import itineraryIcon from '../../assets/icons/map-marker-alt-solid.svg';
import settingIcon from '../../assets/icons/cogs-solid.svg';
import contactIcon from '../../assets/icons/envelope-solid.svg';
import historyIcon from '../../assets/icons/history-solid.svg';
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
		const { viewTitle } = global.storage.getState().Main;
		let total = '0.00';
		return `
		<div>
			<div class="title-box">
				<img src="${ cartIcon }"></img>
				<h4 class="title">${ viewTitle }</h4>
			</div>
			<div class="balance-box">
				<p>Balance: </p>
				<span class="subtotal">
					$${ total }
				</span> 
			</div>
			<div id="menu-button">
				<img id="menu-img" src="${menuIcon}"></img>
			</div>
		</div>
		`;
	}
	/**
	 * change the icon base on the view the current state its 
	 */
	changeIcon () {
		const x = this.storage.getState().Main.viewNumber;
		const titleIcon = document.querySelector('.title-box > img');
		switch (x) {
			case 1:
				titleIcon.src = itineraryIcon;
				break;
			case 2:
				titleIcon.src = settingIcon;
				break;
			case 3:
				titleIcon.src = historyIcon;
				break;
			case 4:
				titleIcon.src = contactIcon;
				break;
			default:
				titleIcon.src = cartIcon;
				break;
		}
	}

	handleStoreEvents () {
		return {
			'CHANGE-VIEW': () => {
				const { viewTitle } = global.storage.getState().Main;
				this.changeIcon();
				document.querySelector('.title').innerHTML = viewTitle;
			}
		}
	}

}

window.customElements.define('main-header', EditChannel);
