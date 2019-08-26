import '../containers/main-container'

document.addEventListener('DOMContentLoaded', () => {
	const container = document.createElement('tepago-container');
	document.querySelector('#tepago-area').appendChild(container);
	const culqiScript = document.createElement('script');
	culqiScript.innerHTML = `
		function culqi() {
			if (Culqi.token) {
				console.log(Culqi.token);
				window.TPGstorage.dispatch({
					type: 'SALES_APROVED',
					data: Culqi.token
				});
			} else {
				window.TPGstorage.dispatch({
					type: 'SALES_DENIED',
					data: Culqi.error
				});
			}
		}
	`;
	document.body.append(culqiScript);
});