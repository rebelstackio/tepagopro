/**
 * GET CUSTOMER ITINERARY
 * 
 * TODO: implement this
 */
export function getItinerary () {
	return {
		'Thursday, Jan 8, 2017': [
			{
				time: '00:00 PTD AM',
				amount: '00.00',
				type: 'plane',
				title: 'XX-XXX',
				status: 'SCHEDULE',
				description: 'Plane detail(Airline)\nConf:XXXXX\nDep.Teminal X, Gate X, Seat: XX\nArr: 00:00 AM PTD'
			},
			{
				time: '00:00 PTD AM',
				type: 'cup',
				title: 'X Hours at XXXXXXXXX Airport Cafe',
				description:'',
				status: 'DISABLED'
			},{
				time: '00:00 PTD AM',
				amount: '00.00',
				type: 'plane',
				title: 'XX-XXX',
				status: 'SCHEDULE',
				description: 'Plane detail(Airline)\nConf:XXXXX\nDep.Teminal X, Gate X, Seat: XX\nArr: 00:00 AM PTD'
			},
			{
				time: '00:00 PTD AM',
				amount: '00.00',
				type: 'car',
				title: 'XX-XXX',
				status: 'PENDING',
				description: 'Car Detail:\nPlate:XXX-XX\nArr: 00:00 PM PTD'
			}
		],
		'Friday, Jan 09, 2017': [
			{
				time: '00:00 PTD AM',
				amount: '00.00',
				type: 'hotel',
				title: 'Hote: XXXXX',
				status: 'SCHEDULE',
				description: 'Check in: 00:00 AM PTD'
			}
		]
	}
}