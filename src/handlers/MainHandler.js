/*
* DEFAULT HANDLER
*/

const MainDefaultState = {
	viewTitle: 'Shopping cart',
	viewNumber: 0
};

export default {
	MainDefaultState,
	MainHandler: {
		'CHANGE-VIEW': (action, state) => {
			switch (action.viewNumber) {
				case 1: 
					state.Main.viewTitle = 'Itinerary';
					break;
				case 2: 
					state.Main.viewTitle = 'Settings';
					break;
				case 3: 
					state.Main.viewTitle = 'History';
					break;
				case 4: 
					state.Main.viewTitle = 'Contact us';
					break;
				default:
					state.Main.viewTitle = 'Shopping cart'
					break;
			}
			state.Main.viewNumber = action.viewNumber;
			return { newState: state };
		}
	}
};
