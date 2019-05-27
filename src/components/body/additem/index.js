import { MetaComponent } from '@rebelstack-io/metaflux';
import './index.css';
import plane from '../../../assets/icons/itinerary/plane.svg';
import cup from '../../../assets/icons/itinerary/cup.svg';
import car from '../../../assets/icons/itinerary/car.svg';
import bed from '../../../assets/icons/itinerary/bed.svg';
import utensils from '../../../assets/icons/itinerary/utensils.svg';

class ItineraryItem extends MetaComponent {
	constructor () {
		super(global.TPGstorage);
	}
	/**
	 * ADD DOM LISTENERS
	 */
	addListeners () {
		const addBtn = document.querySelector('#add-selected');
		const allOptions = document.querySelectorAll('.itinerary-item.selectable');
		addBtn.addEventListener('click', () => {
			const {optionSelected} = this.storage.getState().Main;
			if (optionSelected.title !== '') {
				//some thing
				const qtyInp = document.querySelector('#qty');
				const dateInp = document.querySelector('#date-picker');
				const timeInp = document.querySelector('#time-picker');
				if (qtyInp.value !== '' &&
					timeInp.value !== '' &&
					dateInp.value !== '') {
					optionSelected.qty = qtyInp.value;
					optionSelected.date = dateInp.value;
					optionSelected.time = timeInp.value;
					this.storage.dispatch({ type: 'ADD-ITINERARY', data: optionSelected });
					this.storage.dispatch({ type: 'CHANGE-VIEW', viewNumber: 1 });
				}
			}
		});
		allOptions.forEach(opt => {
			opt.addEventListener('click', () => {
				const {options} = this.storage.getState().Main;
				const index = opt.id.split('-')[1];
				this.storage.dispatch({
					type: 'SELECT-ITEM',
					data: options[index]
				});
			})
		})
		/*const addBtn = document.querySelector('#add-item');
		if (addBtn !== null) {
			addBtn.addEventListener('click', () => {
				this.storage.dispatch({
					type: 'CHANGE-VIEW',
					viewNumber: 5
				})
				const inputArray = document.querySelectorAll('.input-area > input');
				let data = {};
				inputArray.forEach(inp => {
					data[inp.name] = inp.value;
				});
				const icon = document.querySelector('.input-area > select').value;
				data.icon = icon;
				this.storage.dispatch({ type: 'ADD-ITINERARY', data })
			});
		}*/
	}

	render () {
		const {options, optionSelected} = this.storage.getState().Main;
		let item = '';
		options.forEach((opt, i) => {
			item += `
				<div class="itinerary-item selectable" id="i-${i}">
					<h3>${ opt.title }</h3>
					<img src="${ this.getIcon(opt.icon) }">
					<span> ${ opt.description } </span>
					<h3>
						$${opt.price}
					</h3>
				</div>
			`
		});
		return `
			<div class="add-items">
				<div class="selected">
					<p class="selected-title">${optionSelected.title === '' ? 'Select item' : optionSelected.title}</p>
					<p class="selected-price">${optionSelected.price === '' ? 'Select Item': optionSelected.price}</p>
					<input type="text" placeholder="date" id="date-picker"/>
					<input type="text" placeholder="Qty" id="qty"/>
					<input typle="text" placeholder="Time" id="time-picker"/>
					<input type="submit" id="add-selected" value="Add"/>
				</div>
				${ item }
			</div>
		`
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
			'SELECT-ITEM': () => {
				const {optionSelected} = this.storage.getState().Main;
				document.querySelector(".selected-title").innerHTML = optionSelected.title;
				document.querySelector(".selected-price").innerHTML = '$' + optionSelected.price;
			}
		}
	}

}

window.customElements.define('itinerary-item', ItineraryItem);