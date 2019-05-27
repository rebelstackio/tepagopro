/**
 * GET CUSTOMER ITINERARY
 * 
 * TODO: implement this
 */
export function getItinerary () {
	return {}
}
/**
 * get remenber accounts
 */
export function getPaypalAcounts () {
	return [
		{
			email: 'test@example.com',
			isDefault: true
		},
		{
			email: 'example@test.com',
			isDefault: false
		}
	]
}

export function getOptions () {
	return [
		{
			title: 'Paracas Reserve and Islas Ballestas',
			description: 'Transfer to Paracas dock<br/>English speaking guide',
			price: 28,
			icon: 'ship'
		},
		{
			title: 'Islas Ballestas First Class',
			description: 'Transfer to Paracas dock<br/>English speaking guide<br/>Islas Ballestas First Class',
			price: 50,
			icon: 'ship'
		},
		{
			title: 'Cruise member islas ballestas standard tour',
			description: 'Pickup and dropoff directly from port/harbor<br/>All entrance fees<br/>Private transportation.',
			price: 85,
			icon: 'ship'
		},
	]
}