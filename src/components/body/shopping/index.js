import { MetaComponent } from '@rebelstack-io/metaflux';
import infoIcon from '../../../assets/icons/info-solid.svg';
import deleteIcon from '../../../assets/icons/times-solid.svg';
import './index.css';

class ItemFormar extends MetaComponent {
	constructor () {
		super(global.TPGstorage);
	}
	/**
	 * Add DOM listeners
	 */
	addListeners () {
		const deleteButtons = document.querySelectorAll('.delete-btn');
		const infoButtons = document.querySelectorAll('.info-btn');
		deleteButtons.forEach(btn => {
			btn.addEventListener('click', () => {
				const index = btn.parentElement.id.split('-')[1];
				const date = btn.parentElement.id.split('-')[0];
				this.storage.dispatch({ type: 'DELETE-ITEM', index, date })
			});
		});
		infoButtons.forEach(btn => {
			btn.addEventListener('click', (e) => {
				const y = e.target.clientHeight + e.target.offsetTop;
				const x = e.target.offsetLeft - 160;
				const menu = document.querySelector('#info-options');
				menu.setAttribute('style', 'top: ' + y + 'px; left: ' + x + 'px');
				menu.classList.remove('tepago-hide');
			})
		})
	}

	render () {
		return this.createItems();
	}
	/**
	 * get the info options
	 */
	getInfoTemplate () {
		return `
			<div class="tepago-hide" id="info-options"> 
				<span class="info-item">View Details</span>
				<span class="info-item">Mark to delete</span>
				<span class="info-item">Set Timer</span>
			</div>
		`
	}

	/**
	 * create the items with the store
	 */
	createItems () {
		let html = this.getInfoTemplate();
		const { inCart } = global.TPGstorage.getState().Main;
		const metaAsset = document.querySelector('meta[name="tepago-assets"]');
		let isMeta = metaAsset !== null;
		Object.keys(inCart).forEach(date => {
			html += `<span class="date-title"> ${ date } </span>`
			inCart[date].forEach((item, i) => {
				html += `
					<div id="${ date + '-' + i }" class="box-item">
						<span>${ item.title }</span>
						<input type="text" value="${ item.netPrice }" readonly />
						<img class="info-btn" src="${ isMeta 
							? metaAsset.content + 'src/assets/icons/info-solid.svg'
							: infoIcon }"> </img>
						<img class="delete-btn" src="${ isMeta 
							? metaAsset.content + 'src/assets/icons/times-solid.svg'
							: deleteIcon }"> </img>
					</div>
				`
			})
		})
		return html;
	}

	handleStoreEvents () {
		return {
			'DELETE-ITEM': () => {
				this.innerHTML = this.createItems();
				this.addListeners();
			}
		}
	}

}

window.customElements.define('item-format', ItemFormar);