import { MetaComponent } from '@rebelstack-io/metaflux';
import './index.css';
//this is use but it's dynamic generated
import plane from '../../../assets/icons/itinerary/plane.svg';
import cup from '../../../assets/icons/itinerary/cup.svg';
import car from '../../../assets/icons/itinerary/car.svg';

class Itinerary extends MetaComponent {
	constructor () {
		super();
	}

	render () {
		const { itinerary } = global.storage.getState().Main;
		let html = '';
		Object.keys(itinerary).forEach(date => {
			html = `<span class="date-title"> ${date} </span>`
			itinerary[date].forEach(item => {
				const icon = this.getIcon(item.type);
				const description = item.description.replace('\n', '</p><p>');
				html += `
					<div class="itinerary-item">
						<span>${item.time}</span>
						<img src=${icon}></img>
						<div class="itinerary-info">
							<h3>${item.title}</h3>
							<span class="type-${item.status}">${item.status}</span>
							<p>${description}</p>
						</div>
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
			default:
				//TODO: add default icon
				break;
		}
	}
	

}

window.customElements.define('itinerary-format', Itinerary);