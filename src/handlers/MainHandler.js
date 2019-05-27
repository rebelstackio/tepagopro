/*
* DEFAULT HANDLER
*/

import { getItinerary, getPaypalAcounts, getOptions } from '../controllers/firebase';

const MainDefaultState = {
	viewTitle: 'Shopping cart',
	viewNumber: 1,
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
	},
	options: getOptions(),
	optionSelected: {
		title: '',
		price: ''
	},
	lastItinerary: {},
	paypalAcounts: getPaypalAcounts()
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
				case 6:
					state.Main.viewTitle = 'Add item';
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
		},
		'DELETE-ACCOUNT': (action, state) => {
			let array = state.Main.paypalAcounts;
			array.splice(action.index, 1);
			state.Main.paypalAcounts = array;
			return { newState: state }
		},
		'SET-DEFAULT-ACCOUNT': (action, state) => {
			let array = state.Main.paypalAcounts.map(item => {
				if (item.isDefault) {
					item.isDefault = false;
				}
				return item;
			});
			array[action.index].isDefault = true;
			state.Main.paypalAcounts = array;
			return { newState: state }
		},
		'ADD-NEW-ACCOUNT': (action, state) => {
			state.Main.paypalAcounts.push({
				email: action.data.email,
				isDefault: false
			});
			return { newState: state }
		},
		'ADD-ITINERARY': (action, state) => {
			const { data } = action;
			const date = new Date(data.date).toDateString();
			const { itinerary } = state.Main;
			state.Main.lastItinerary = data;
			const newItinerary = Object.assign({}, itinerary, {
				[date]: [{
					time: data.time,
					amount: data.price,
					type: data.icon,
					title: data.title,
					status: 'PENDING',
					description: data.description,
					qty: data.qty
				}]
			});
			state.Main.optionSelected = { title: '', price: '' };
			state.Main.itinerary = newItinerary;
			return { newState: state }
		},
		'CLEAR-ITINERARY': (action, state) => {
			state.Main.itinerary = {};
			return { newState: state }
		},
		'ADD-ITINERARY-EXT': (action, state) => {
			const { data } = action;
			const { itinerary } = state.Main;
			state.Main.lastItinerary = data;
			const date = new Date(data.date).toDateString();
			const newItinerary = Object.assign({}, itinerary, {
				[date]: [{
					time: data.time,
					amount: data.price,
					type: data.icon,
					title: data.title,
					status: 'PENDING',
					description: data.description,
					qty: data.qty
				}]
			});
			state.Main.itinerary = newItinerary;
			return { newState: state }
		},
		'SELECT-ITEM': (action, state) => {
			state.Main.optionSelected = action.data;
			return { newState: state }
		}
	}
};
