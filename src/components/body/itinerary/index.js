import { MetaComponent } from '@rebelstack-io/metaflux';
import './index.css';
import plane from '../../../assets/icons/itinerary/plane.svg';
import cup from '../../../assets/icons/itinerary/cup.svg';
import car from '../../../assets/icons/itinerary/car.svg';
import bed from '../../../assets/icons/itinerary/bed.svg';

class Itinerary extends MetaComponent {
	constructor () {
		super();
	}

	render () {
		const { itinerary } = global.storage.getState().Main;
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
						<h3>${ item.amount ? item.amount : '' }</h3>
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
		switch (type) {
			case 'plane':
				return plane;
			case 'cup':
				return cup;
			case 'car':
				return car;
			case 'hotel':
				return bed; 
			default:
				//TODO: add default icon
				break;
		}
	}
	

}

window.customElements.define('itinerary-format', Itinerary);