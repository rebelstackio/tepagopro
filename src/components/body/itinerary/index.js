import { MetaComponent } from '@rebelstack-io/metaflux';
import './index.css';
import plane from '../../../assets/icons/itinerary/plane.svg';
import cup from '../../../assets/icons/itinerary/cup.svg';
import car from '../../../assets/icons/itinerary/car.svg';
import bed from '../../../assets/icons/itinerary/bed.svg';
import utensils from '../../../assets/icons/itinerary/utensils.svg';
import ship from '../../../assets/icons/itinerary/ship.svg';

class Itinerary extends MetaComponent {
	constructor () {
		super(global.TPGstorage);
	}
	/**
	 * ADD DOM LISTENERS
	 */
	addListeners () {
		const addBtn = document.querySelector('#add-item');
		const payBtn = document.querySelector('#pay-btn');
		if (addBtn !== null) {
			addBtn.addEventListener('click', () => {
				this.storage.dispatch({
					type: 'CHANGE-VIEW',
					viewNumber: 6
				});
			});
		}
		if (payBtn !== null) {
			payBtn.addEventListener('click', () => {
				if (typeof Culqi !== 'undefined') {
					console.log(this.getTotal())
					Culqi.settings({
						title: 'Tepago PRO',
						currency: 'USD',
						description: 'Checkout Itinerary',
						amount: this.getTotal()
					});
					Culqi.open();
				}
			})
		}
	}

	render () {
		let html = this.createItineraryItem();
		html += this.getAddItem();
		return html;
	}
	/**
	 * get the total to pay
	 */
	getTotal () {
		const { itinerary } = this.storage.getState().Main;
		let total = 0;
		Object.keys(itinerary).forEach(date => {
			itinerary[date].forEach(el => {
				total += parseFloat(el.amount) * parseInt(el.qty);
			})
		});
		total = total.toString().split('.').length > 1
			? total.toString().split('.').join('')
			: total.toString() + '00';
		return parseInt(total);
	}
	/**
	 * get the add item section
	 */
	getAddItem () {
		const metaType = document.querySelector('meta[name="tepago-type"]');
		let isCustomer = (metaType === null);
		if (isCustomer) {
			document.querySelector('.tepago-checkout')
			.innerHTML = `
				<label>Payments</label>
				<input type="submit" id="pay-btn" value="Cards"></input>
				<input type="submit" id="paypal-btn" value="PayPal"></input>
			`;
		}
		return !isCustomer
		? `
			<div class="new-item">
				<input type="submit" id="add-item" value="Add">
			</div>
		` : '';
	}
	/**
	 * create the itinerary vire
	 */
	createItineraryItem () {
		const { itinerary } = this.storage.getState().Main;
		let html = '';
		Object.keys(itinerary).forEach(date => {
			html += `<span class="date-title"> ${date} </span>`
			itinerary[date].forEach(item => {
				const icon = this.getIcon(item.type);
				const description = item.description.replace('\n', '</p><p>');
				html += `
					<div class="itinerary-item ${item.status}">
						<span>${item.time}</span>
						<img src=${icon}></img>
						<div class="itinerary-info">
							<h3>${item.title} <span class="type">${item.status}</span> </h3>
							<p>${description}</p>
						</div>
						<h3>$${ item.amount ? item.amount : '' }</h3>
					</div>
				`
			})
		});
		return html;
	}
	/**
	 * get the icon url 
	 * @param {String} type 
	 */
	getIcon(type) {
		const metaAsset = document.querySelector('meta[name="tepago-assets"]');
		let isMeta = metaAsset !== null;
		switch (type) {
			case 'plane':
				return isMeta ? metaAsset.content + 'src/assets/icons/itinerary/plane.svg' : plane;
			case 'cup':
				return isMeta ? metaAsset.content + 'src/assets/icons/itinerary/cup.svg' : cup;
			case 'car':
				return isMeta ? metaAsset.content + 'src/assets/icons/itinerary/car.svg' : car;
			case 'bed':
				return isMeta ? metaAsset.content + 'src/assets/icons/itinerary/bed.svg' : bed;
			case 'utensils':
				return isMeta ? metaAsset.content + 'src/assets/icons/itinerary/utensils.svg' : utensils; 
			case 'ship':
				return isMeta ? metaAsset.content + 'src/assets/icons/itinerary/ship.svg' : ship;
			default:
				//TODO: add default icon
				break;
		}
	}
	
	handleStoreEvents () {
		return {
			'ADD-ITINERARY': () => {
				this.innerHTML = this.createItineraryItem();
				this.innerHTML += this.getAddItem();
				this.addListeners();
			},
			'ADD-ITINERARY-EXT': () => {
				this.innerHTML = this.createItineraryItem();
				this.innerHTML += this.getAddItem();
				this.addListeners();
			},
			'CLEAR-ITINERARY': () => {
				this.innerHTML = this.createItineraryItem();
				this.innerHTML = this.getAddItem();
				this.addListeners();
			}
		}
	}

}

window.customElements.define('itinerary-format', Itinerary);