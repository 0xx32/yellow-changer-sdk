import { YellowChanger } from './src/yellowChanger'

const PRIVATE_KEY = ''
const PUBLIC_KEY = ''

const yellowChanger = new YellowChanger({
	publicApiKey: PUBLIC_KEY,
	secretApiKey: PRIVATE_KEY,
})

// console.log(yellowChanger.getAllRates().then((data) => console.log(data)))
// console.log(yellowChanger.getDestinationList().then((data) => console.log(data)))
// console.log(yellowChanger.getRatesInDirection('USDT').then((data) => console.log(data)))
// console.log(
// 	'getTradeInfo',
// 	yellowChanger.getTradeInfo('0a79b0b697438a064dae83f618b41e6c3a25978f').then((data) => console.log(data))
// )
// console.log(
// 	yellowChanger
// 		.createTrade({
// 			sendCurrency: 'USDT',
// 			getCurrency: 'USDT',
// 			sendValue: 100,
// 			sendNetwork: 'TRC20',
// 			getNetwork: 'ERC20',
// 			credentials: '0x32BA8482FCb155B7F4e05f9f190778A430F7b8f4',
// 		})
// 		.then((data) => console.log(data))
// )
