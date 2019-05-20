import { MetaComponent } from '@rebelstack-io/metaflux';
import deleteIcon from '../../../assets/icons/times-solid.svg';
import checkIcon from '../../../assets/icons/check-solid .svg';
import squareIcon from '../../../assets/icons/square-regular.svg';
import paypalLogo from '../../../assets/img/paypal-logo.png';
import './index.css';

class Paypal extends MetaComponent {
	constructor () {
		super (global.TPGstorage);
		this.addNewAccount = this.addNewAccount.bind(this);
	}
	/**
	 * ADD DOM LISTENERS
	 */
	addListeners () {
		// delete buttons for every item
		document.querySelectorAll('.delete-item')
		.forEach(btn => {
			btn.addEventListener('click', (e) => {
				const index = e.target.parentElement.id.split('-')[1];
				this.storage.dispatch({ type: 'DELETE-ACCOUNT', index });
			})
		});
		// unchecked items to set as default an account
		document.querySelectorAll('.unselected-account')
		.forEach(btn => {
			btn.addEventListener('click', (e) => {
				const index = e.target.parentElement.id.split('-')[1];
				this.storage.dispatch({ type: 'SET-DEFAULT-ACCOUNT', index });
			})
		});
		// cancel button for the add new account window
		document.querySelector('#cancel-btn')
		.addEventListener('click', () => {
			this.toggleNew();
		});
		// add new account button
		document.querySelector('#add-paypal')
		.addEventListener('click', () => {
			this.toggleNew();
		});
		// dispatch the event of add new paypal account
		document.querySelector('#add-new')
		.addEventListener('click', this.addNewAccount);
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
	/**
	 * add item to the store
	 */
	addNewAccount () {
		const email = document.querySelector('#new-account > input[type="email"]').value;
		const pass = document.querySelector('#new-account > input[type="password"]').value;
		if (email !== '' && pass !== '') {
			this.storage.dispatch({
				type: 'ADD-NEW-ACCOUNT',
				data: {
					email, pass
				}
			});
		}
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
			},
			'ADD-NEW-ACCOUNT': () => {
				this.innerHTML = this.render();
				this.addListeners();
			}
		}
	}
}

window.customElements.define('paypal-crud', Paypal)