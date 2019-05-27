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
		if (addBtn !== null) {
			addBtn.addEventListener('click', () => {
				this.storage.dispatch({
					type: 'CHANGE-VIEW',
					viewNumber: 6
				});
				/*const inputArray = document.querySelectorAll('.input-area > input');
				let data = {};
				inputArray.forEach(inp => {
					data[inp.name] = inp.value;
				});
				const icon = document.querySelector('.input-area > select').value;
				data.icon = icon;
				this.storage.dispatch({ type: 'ADD-ITINERARY', data })*/
			});
		}
	}

	render () {
		let html = this.createItineraryItem();
		html += this.getAddItem();
		return html;
	}
	/**
	 * get the add item section
	 */
	getAddItem () {
		const metaType = document.querySelector('meta[name="tepago-type"]');
		let isCustomer = (metaType === null);
		return !isCustomer
		? `
			<div class="new-item">
				<input type="submit" id="add-item" value="Add">
			</div>
		` : `
			<input type="submit" id="pay-btn" value="Pay">
		`;
	}

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