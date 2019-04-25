import { MetaComponent } from '@rebelstack-io/metaflux';

class Settings extends MetaComponent {
	constructor () {
		super();
	}

	render () {
		return `
			<div> 
				<h3>Clear history</h3>
			</div>
			<div>
				<h3>
					App info
				</h3>
			</div>
			<div>
				<h3>
					Terms and privacy policy
				</h3>
			</div>
		`
	}
}

window.customElements.define('main-settings', Settings);
