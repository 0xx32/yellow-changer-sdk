import dotenv from 'dotenv'
import { YellowChanger } from './yellow-changer'

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY!
const PUBLIC_KEY = process.env.PUBLIC_KEY!

const yellowChanger = new YellowChanger({
	public_api_key: PUBLIC_KEY,
	secret_api_key: PRIVATE_KEY,
})

console.log(yellowChanger.getAllRates().then((data) => console.log(data)))
