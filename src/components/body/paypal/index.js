import { MetaComponent } from '@rebelstack-io/metaflux';
import deleteIcon from '../../../assets/icons/times-solid.svg';
import checkIcon from '../../../assets/icons/check-solid .svg';
import squareIcon from '../../../assets/icons/square-regular.svg';
import paypalLogo from '../../../assets/img/paypal-logo.png';
import './index.css';

class Paypal extends MetaComponent {
	constructor () {
		super (global.storage);
	}
	/**
	 * ADD DOM LISTENERS
	 */
	addListeners () {
		document.querySelectorAll('.delete-item')
		.forEach(btn => {
			btn.addEventListener('click', (e) => {
				const index = e.target.parentElement.id.split('-')[1];
				this.storage.dispatch({ type: 'DELETE-ACCOUNT', index });
			})
		});
		document.querySelectorAll('.unselected-account')
		.forEach(btn => {
			btn.addEventListener('click', (e) => {
				const index = e.target.parentElement.id.split('-')[1];
				this.storage.dispatch({ type: 'SET-DEFAULT-ACCOUNT', index });
			})
		});
		document.querySelector('#cancel-btn')
		.addEventListener('click', () => {
			this.toggleNew();
		});
		document.querySelector('#add-paypal')
		.addEventListener('click', () => {
			this.toggleNew();
		})
	}

	render () {
		return `
				<div class="tepago-hide" id="new-account">
					<img src="${ paypalLogo }"></img>
					<input type="email" />
					<input type="password" />
					<div class="account-actions">
						<input type="button" id="cancel-btn" value="Cancel" />
						<input type="button" id="add-new" value="Save" />
					</div>
				</div>
				${ this.getAccountList() }
				<input type="button" id="add-paypal" value="Add new account">
		`
	}
	/**
	 * get the saved  accounts 
	 */
	getAccountList () {
		const { paypalAcounts } = this.storage.getState().Main;
		let html = '';
		paypalAcounts.forEach((pay, i) => {
			html += `
				<div id="i-${ i }" class="account-item">
					${ pay.isDefault
						? '<img src="'+ checkIcon +'"> </img>'
						: '<img class="unselected-account" src="'+ squareIcon +'"> </img>'
					}
					<input type="email" value="${ pay.email }"/>
					<img class="delete-item" src="${ deleteIcon }"> </img>
				</div>
			`
		});
		return html;
	}
	/**
	 * toggel visiblility for the add new account
	 */
	toggleNew () {
		const popup = document.querySelector('#new-account');
		popup.classList.toggle('tepago-hide');
	}

	handleStoreEvents () {
		return {
			'DELETE-ACCOUNT': () => {
				this.innerHTML = this.render();
				this.addListeners();
			},
			'SET-DEFAULT-ACCOUNT': () => {
				this.innerHTML = this.render();
				this.addListeners();
			}
		}
	}
}

window.customElements.define('paypal-crud', Paypal)