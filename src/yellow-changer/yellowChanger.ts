import axios, { AxiosInstance } from 'axios'
import crypto from 'crypto'

import type { CreateTradeParams, FetchRequestConfig } from '../@types/yellowChanger'

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
		console.log('message', message)

		return crypto.createHmac('sha256', this.secret_api_key).update(message).digest('hex')
	}

	private _fetch<ResponseData>({ params: { method = 'GET', path, body = {} }, config }: FetchRequestConfig) {
		const headers: { [key: string]: string } = { ...this.base_headers }

		try {
			if (method === 'GET') {
				const signature = this.createHmacSHA256(JSON.stringify(body))

				headers['Signature'] = signature

				return this._axios.get<ResponseData>(path, {
					headers: { ...headers },
					data: body,
				})
			}

			if (method === 'POST') {
				if (!body) throw new Error('Body of POST request is empty!')

				const signature = this.createHmacSHA256(JSON.stringify(body))
				headers['Signature'] = signature

				return this._axios.post<ResponseData>(path, body, {
					headers: { ...headers },
					...config,
				})
			}

			throw new Error(`Method ${method} is not supported!`)
		} catch (error: any) {
			throw new Error(error)
		}
	}

	/* 
	Gets all rates
	https://docs.yellowchanger.com/methods/allrates
	*/
	async getAllRates(): Promise<ExchangeRate[]> {
		const response = await this._fetch<ExchangeRate[]>({
			params: {
				method: 'GET',
				path: 'trades/allRates',
			},
		})

		return response.data
	}

	/* 
	Gets all destinations list
	https://docs.yellowchanger.com/methods/destinationslist
	*/
	async getDestinationList() {
		const response = await this._fetch<DestinationsList>({
			params: {
				method: 'GET',
				path: 'trades/destinationsList',
			},
		})

		return response.data
	}

	/*
	Gets all rates in specific direction
    https://docs.yellowchanger.com/methods/ratesindirection
	*/
	async getRatesInDirection(direction: string) {
		const response = await this._fetch<RateInDirection>({
			params: {
				method: 'GET',
				path: 'trades/ratesInDirection',
				body: {
					direction,
				},
			},
		})

		return response.data
	}

	/* 
	Gets trade info
	https://docs.yellowchanger.com/methods/tradeinfo
	*/
	async getTradeInfo(uniq_id: string) {
		const response = await this._fetch<TradeInfo>({
			params: {
				method: 'GET',
				path: 'trades/getInfo',
				body: {
					uniq_id,
				},
			},
		})

		return response.data
	}

	/*
	Creates trade
	https://docs.yellowchanger.com/methods/createtrade
	*/
	async createTrade(params: CreateTradeParams) {
		const response = await this._fetch<TradeInfo>({
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

		return response.data
	}
}

export { YellowChanger }
