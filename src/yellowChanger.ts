import axios from 'axios'
import type { AxiosInstance } from 'axios'
import crypto from 'crypto'

import type {
	CreateTradeParams,
	DestinationsList,
	ExchangeRate,
	FetchRequestConfig,
	RateInDirection,
	TradeInfo,
	YellowChangerProps,
} from './@types/yellowChanger'
import { errorHandler } from './utils'

class YellowChanger {
	private readonly public_api_key: string
	private readonly secret_api_key: string
	private readonly base_headers = {}
	private readonly base_url: string
	private readonly _axios: AxiosInstance

	constructor({ base_url, public_api_key, secret_api_key }: YellowChangerProps) {
		this.base_url = base_url || 'https://api.yellowchanger.com/'
		this.public_api_key = public_api_key
		this.secret_api_key = secret_api_key
		this.base_headers = {
			'Content-Type': 'application/json',
			Y_API_KEY: this.public_api_key,
		}
		this._axios = axios.create({
			baseURL: this.base_url,
		})
	}

	private createHmacSHA256(message: string) {
		return crypto.createHmac('sha256', this.secret_api_key).update(message).digest('hex')
	}

	async sendRequest<ResponseData>({ params: { method = 'GET', path, body = {} }, config }: FetchRequestConfig) {
		const headers: { [key: string]: string } = { ...this.base_headers }

		if (method === 'GET') {
			const signature = this.createHmacSHA256(JSON.stringify(body))

			headers['Signature'] = signature

			const response = await this._axios
				.get<ResponseData>(path, {
					headers: { ...headers },
					data: body,
				})
				.catch((error) => errorHandler(error))

			return response
		}

		if (method === 'POST') {
			if (!body) throw new Error('Body of POST request is empty!')

			const signature = this.createHmacSHA256(JSON.stringify(body))
			headers['Signature'] = signature

			const response = await this._axios
				.post<ResponseData>(path, body, {
					headers: { ...headers },
					...config,
				})
				.catch((error) => errorHandler(error))

			return response
		}

		throw new Error(`Method ${method} is not supported!`)
	}

	/* 
	Gets all rates
	https://docs.yellowchanger.com/methods/allrates
	*/
	async getAllRates(): Promise<ExchangeRate[]> {
		const response = await this.sendRequest<ExchangeRate[]>({
			params: {
				method: 'GET',
				path: 'trades/allRates',
			},
		})

		if (response?.status !== 200) throw new Error('Failed to fetch rates!')

		return response.data
	}

	/* 
	Gets all destinations list
	https://docs.yellowchanger.com/methods/destinationslist
	*/
	async getDestinationList() {
		const response = await this.sendRequest<DestinationsList>({
			params: {
				method: 'GET',
				path: 'trades/destinationsList',
			},
		})

		if (response?.status !== 200) throw new Error('Failed to fetch destinations!')

		return response.data
	}

	/*
	Gets all rates in specific direction
    https://docs.yellowchanger.com/methods/ratesindirection
	*/
	async getRatesInDirection(direction: string) {
		const response = await this.sendRequest<RateInDirection>({
			params: {
				method: 'GET',
				path: 'trades/ratesInDirection',
				body: {
					direction,
				},
			},
		})

		if (response?.status !== 200) throw new Error('Failed to fetch rates!')

		return response.data
	}

	/* 
	Gets trade info
	https://docs.yellowchanger.com/methods/tradeinfo
	*/
	async getTradeInfo(uniq_id: string) {
		const response = await this.sendRequest<TradeInfo>({
			params: {
				method: 'GET',
				path: 'trades/getInfo',
				body: {
					uniq_id,
				},
			},
		})

		if (response?.status !== 200) throw new Error('Failed to fetch trade info!')

		return response.data
	}

	/*
	Creates trade
	https://docs.yellowchanger.com/methods/createtrade
	*/
	async createTrade(params: CreateTradeParams) {
		const response = await this.sendRequest<TradeInfo>({
			params: {
				method: 'POST',
				path: 'trades/createTrade',
				body: {
					send_name: params.sendCurrency,
					send_network: params.sendNetwork,
					send_value: params.sendValue,
					get_name: params.getCurrency,
					get_network: params.getNetwork,
					get_creds: params.credentials,
					uniq_id: params.uniqId,
					sbpBank: params.sbpBank,
				},
			},
		})

		if (response?.status !== 200) throw new Error('Failed to create trade!')

		return response.data
	}
}

export { YellowChanger }
