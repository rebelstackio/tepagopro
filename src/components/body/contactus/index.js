import { MetaComponent } from '@rebelstack-io/metaflux';
import './index.css';

class Contactus extends MetaComponent {
	constructor () {
		super();
	}

	render () {
		return `
			<div> 
				<h3> Need help?</h3>
				<span> Questions? Send us a message </span>
			</div>
			<div>
				<h3>
					FAQ
				</h3>
			</div>
		`
	}
}

window.customElements.define('contact-us', Contactus);
