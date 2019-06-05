import { MetaComponent } from '@rebelstack-io/metaflux';
import menuIcon from '../../assets/icons/bars-solid.svg';
import cartIcon from '../../assets/icons/shopping-cart-solid.svg';
import itineraryIcon from '../../assets/icons/map-marker-alt-solid.svg';
import settingIcon from '../../assets/icons/cogs-solid.svg';
import contactIcon from '../../assets/icons/envelope-solid.svg';
import historyIcon from '../../assets/icons/history-solid.svg';
import './index.css';

class Header extends MetaComponent {
	
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
		this.querySelector('#menu-button')
		.addEventListener('click', (e) => {
			const y = e.target.offsetTop - 20;
			const x = e.target.offsetLeft;
			console.log(x, y)
			this.handleMenu(y, x)
		})
	}

	handleMenu(y, x) {
		this.storage.dispatch({type: 'OPEN-MENU', data: {x, y}})
	}

	render () {
		const { viewTitle } = global.TPGstorage.getState().Main;
		let total = '0.00';
		const metaAsset = document.querySelector('meta[name="tepago-assets"]');
		const metaType = document.querySelector('meta[name="tepago-type"]');
		let isMeta = metaAsset !== null;
		let isCustomer = (metaType === null);
		return `
		<div>
			<div class="title-box">
				<img src="${ isMeta 
					? metaAsset.content + '/src/assets/icons/map-marker-alt-solid.svg'
					: itineraryIcon }"></img>
				<h4 class="title">${ viewTitle }</h4>
			</div>
			<div class="balance-box">
				<p>Balance: </p>
				<span class="subtotal">
					$${ total }
				</span> 
			</div>
			<div class="${isCustomer ? 'tepago-hide' : ''}" id="menu-button">
				<img id="menu-img" src="${ isMeta 
					? metaAsset.content + '/src/assets/icons/bars-solid.svg'
					: menuIcon}"></img>
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
		const metaAsset = document.querySelector('meta[name="tepago-assets"]');
		let isMeta = metaAsset !== null;
		switch (x) {
			case 1:
				titleIcon.src = isMeta 
				? metaAsset.content + '/src/assets/icons/map-marker-alt-solid.svg'
				: itineraryIcon;
				break;
			case 2:
				titleIcon.src = isMeta
				? metaAsset.content + '/src/assets/icons/cogs-solid.svg'
				: settingIcon;
				break;
			case 3:
				titleIcon.src = isMeta
				? metaAsset.content + '/src/assets/icons/history-solid.svg'
				: historyIcon;
				break;
			case 4:
				titleIcon.src =  isMeta
				? metaAsset.content + '/src/assets/icons/envelope-solid.svg'
				: contactIcon;;
				break;
			default:
				titleIcon.src = isMeta
				? metaAsset.content + '/src/assets/icons/shopping-cart-solid.svg'
				: cartIcon;
				break;
		}
	}
	/**
	 * set the total in the header
	 */
	setTotal() {
		const { itinerary } = this.storage.getState().Main;
		let total = 0;
		Object.keys(itinerary).forEach(date => {
			itinerary[date].forEach(el => {
				total += parseFloat(el.amount) * parseInt(el.qty);
			})
		});
		document.querySelector('.subtotal').innerHTML = '$' + total;
	}

	handleStoreEvents () {
		return {
			'CHANGE-VIEW': () => {
				const { viewTitle } = global.TPGstorage.getState().Main;
				this.changeIcon();
				document.querySelector('.title').innerHTML = viewTitle;
			},'ADD-ITINERARY': () => {
				this.setTotal();
			},
			'ADD-ITINERARY-EXT': () => {
				this.setTotal();
			},
		}
	}

}

window.customElements.define('main-header', Header);
