/*
* DEFAULT HANDLER
*/

import { getItinerary } from '../controllers/firebase';

const MainDefaultState = {
	viewTitle: 'Shopping cart',
	viewNumber: 0,
	itinerary: getItinerary(),
	inCart: {
		'Thursday, Jan 8, 2017': [
			{
				title: 'Tour 01',
				id: '0001',
				netPrice: '00.00'
			},
			{
				title: 'Tour 02',
				id: '0002',
				netPrice: '00.00'
			},
			{
				title: 'Tour 03',
				id: '0003',
				netPrice: '00.00'
			}
		]
	}
};
export default {
	MainDefaultState,
	MainHandler: {
		'CHANGE-VIEW': (action, state) => {
			console.log(action)
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
		},
		'DELETE-ITEM': (action, state) => {
			let array = state.Main.inCart[action.date];
			array.splice(action.index, 1);
			state.Main.inCart[action.date] = array;
			return { newState: state }
		}
	}
};
