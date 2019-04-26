import { MetaComponent } from '@rebelstack-io/metaflux';
import cartIcon from '../../assets/icons/dark/shopping-cart-solid.svg';
import itineraryIcon from '../../assets/icons/dark/map-marker-alt-solid.svg';
import settingIcon from '../../assets/icons/dark/cogs-solid.svg';
import contactIcon from '../../assets/icons/dark/envelope-solid.svg';
import historyIcon from '../../assets/icons/dark/history-solid.svg';
import paypalIcon from '../../assets/icons/dark/paypal-brands.svg';
import './index.css';

class Dropdown extends MetaComponent {
	
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
		const items = document.querySelectorAll('.menu-item');
		for (let i = 0; i < items.length; i++) {
			items[i].addEventListener('click', () => {
				const title = items[i].querySelector('a').title;
				this.storage.dispatch({
					type: 'CHANGE-VIEW',
					viewNumber: parseInt(title)
				});
				this.storage.dispatch({
					type: 'CLOSE-MENU'
				})
			})
		}
	}

	render () {
		return `
			<div class="menu-body tepago-hide">
				<div class="menu-item">
					<img src="${ cartIcon }"></img>
					<a title="0"> Shopping cart </a>
				</div>
				<div class="menu-item">
					<img src="${ itineraryIcon }"></img>
					<a title="1"> Itinerary </a>
				</div>
				<div class="menu-item">
					<img src="${ historyIcon }"></img>
					<a title="3"> History </a>
				</div>
				<div class="menu-item">
					<img src="${ contactIcon }"></img>
					<a title="4"> Contact us </a>
				</div>
				<div class="menu-item">
					<img src="${ paypalIcon }"></img>
					<a title="5"> Paypal </a>
				</div>
				<div class="menu-item">
					<img src="${ settingIcon }"></img>
					<a title="2"> Settings </a>
				</div>
			</div>
		`;
	}

	handleStoreEvents () {
		return {
			'OPEN-MENU': () => {
				document.querySelector('.menu-body').classList.remove('tepago-hide');
			},
			'CLOSE-MENU': () => {
				document.querySelector('.menu-body').classList.add('tepago-hide');
			}
		}
	}

}

window.customElements.define('dropdown-menu', Dropdown);
