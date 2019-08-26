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
	 * MetaComponent constructor needs TPGstorage.
	 */
	constructor () {
		super(global.TPGstorage);
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
		const metaAsset = document.querySelector('meta[name="tepago-assets"]');
		const metaType = document.querySelector('meta[name="tepago-type"]');
		let isCustomer = (metaType !== null) && (metaType.content !== 'client');
		let isMeta = metaAsset !== null;
		const paypalElement = `
		<div class="menu-item">
		<img src="${ isMeta
			? metaAsset.content + 'src/assets/icons/dark/paypal-brands.svg'
			: paypalIcon }"></img>
		<a title="5"> Paypal </a>
		</div>
		`;
		return `
			<div class="menu-body tepago-hide">
				<div class="menu-item">
					<img src="${ isMeta
						? metaAsset.content + 'src/assets/icons/dark/shopping-cart-solid.svg'
						:cartIcon }"></img>
					<a title="0"> Shopping cart </a>
				</div>
				<div class="menu-item">
					<img src="${ isMeta
						? metaAsset.content + 'src/assets/icons/dark/map-marker-alt-solid.svg'
						:itineraryIcon }"></img>
					<a title="1"> Itinerary </a>
				</div>
				<div class="menu-item">
					<img src="${ isMeta
						? metaAsset.content + 'src/assets/icons/dark/history-solid.svg'
						: historyIcon }"></img>
					<a title="3"> History </a>
				</div>
				<div class="menu-item">
					<img src="${ isMeta
						? metaAsset.content + 'src/assets/icons/dark/envelope-solid.svg'
						: contactIcon }"></img>
					<a title="4"> Contact us </a>
				</div>
				
				${ isCustomer ? paypalElement : '' }
				
				<div class="menu-item">
					<img src="${ isMeta
						? metaAsset.content + 'src/assets/icons/dark/cogs-solid.svg'
						: settingIcon }"></img>
					<a title="2"> Settings </a>
				</div>
			</div>
		`;
	}

	handleStoreEvents () {
		return {
			'CLOSE-MENU': () => {
				document.querySelector('.menu-body').classList.add('tepago-hide');
			}
		}
	}

}

window.customElements.define('dropdown-menu', Dropdown);
