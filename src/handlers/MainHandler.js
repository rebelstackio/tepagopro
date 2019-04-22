/*
* DEFAULT HANDLER
*/

import { getItinerary } from '../controllers/firebase';

const MainDefaultState = {
	viewTitle: 'Shopping cart',
	viewNumber: 0,
	itinerary: getItinerary()
};
export default {
	MainDefaultState,
	MainHandler: {
		'CHANGE-VIEW': (action, state) => {
			console.log('dispatch change view#', action.viewNumber)
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
