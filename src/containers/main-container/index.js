import { MetaContainer } from '@rebelstack-io/metaflux';
import '../../handlers';
import '../../components/header';
import '../../components/dropdown';
import '../../components/body';
import '../../assets/css/general.css';

class TepagoMainContainer extends MetaContainer {
	// eslint-disable-next-line class-method-use-this
	render () {
		const content = document.createElement('div');
		content.id = 'container';
		const header = document.createElement('main-header');
		const dropdown = document.createElement('dropdown-menu');
		const body = document.createElement('main-body');
		const payBtn = document.createElement('div');
		payBtn.className = 'tepago-checkout';
		if (typeof Culqi !== 'undefined') {
			Culqi.publicKey = process.env.QULQUI_KEY;
		}
		content.append(header, dropdown, body, payBtn);
		this.addListeners()
		return content;
	}
	/**
	 * add DOM Listeners
	 */
	addListeners () {
		try {
			document.body.addEventListener('click', (e) => {
				if (e.target.id !== 'menu-button' && e.target.id !== 'menu-img'){
					// if not the button for the open menu the you click outside
					global.TPGstorage.dispatch({ type: 'CLOSE-MENU' })
				}
				if (e.target.className !== 'info-btn' &&
					e.target.id !== 'info-options' &&
					e.target.className !== 'info-item' &&
					document.querySelector('#info-options') !== null
					) {
					document.querySelector('#info-options').classList.add('tepago-hide');
				}
			})
		} catch (err) {
			console.warn(err);
		}
	}
}

window.customElements.define('tepago-container', TepagoMainContainer);
