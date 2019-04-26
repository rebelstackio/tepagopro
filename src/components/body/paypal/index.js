import { MetaComponent } from '@rebelstack-io/metaflux';
import deleteIcon from '../../../assets/icons/times-solid.svg';
import checkIcon from '../../../assets/icons/'

class Paypal extends MetaComponent {
	constructor () {
		super ();
	}

	render () {
		return `
			<div>
				${ this.getAccountList() }
				<input type="button" value="Add new account">
			</div>
		`
	}
	/**
	 * get the saved  accounts 
	 */
	getAccountList () {
		const { paypalAcounts } = global.storage.getState().Main;
		const html = '';
		paypalAcounts.forEach(pay => {
			html += `
				<div>
					${ pay.isDefault
						? '<img src="'+ checkIcon +'"> </img>'
						: ''
					}
					<input type="email" value="${ pay.email }"/>
					<img src="${ deleteIcon }"> </img>
				</div>
			`
		});
		return html;
	}
}

window.customElements.define('paypal-crud', Paypal)