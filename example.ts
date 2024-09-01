import dotenv from 'dotenv'
import { YellowChanger } from './src/yellow-changer'

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY!
const PUBLIC_KEY = process.env.PUBLIC_KEY!

const yellowChanger = new YellowChanger({
	public_api_key: PUBLIC_KEY,
	secret_api_key: PRIVATE_KEY,
})

// console.log(yellowChanger.getAllRates().then((data) => console.log(data)))
// console.log(yellowChanger.getDestinationList().then((data) => console.log(data)))
// console.log(yellowChanger.getRatesInDirection('USDT').then((data) => console.log(data)))
// console.log(
// 	'getTradeInfo',
// 	yellowChanger.getTradeInfo('0a79b0b697438a064dae83f618b41e6c3a25978f').then((data) => console.log(data))
// )
// console.log(yellowChanger.createTrade({
// 	sendCurrency: 'USDT',
// 	getCurrency: 'USDT',
// 	sendValue: 100,
// 	sendNetwork: 'TRC20',
// 	getNetwork: 'ERC20',
// 	credentials: '0x32BA8482FCb155B7F4e05f9f190778A430F7b8f4'
// }).then((data) => console.log(data)))
