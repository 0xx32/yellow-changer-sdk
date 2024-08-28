import axios, { AxiosInstance } from 'axios'
import crypto from 'crypto'

import type { FetchRequestConfig } from '../@types/yellowChanger'

class YellowChanger {
	private readonly public_api_key: string
	private readonly secret_api_key: string
	private readonly base_headers = {}
	private readonly base_url: string
	private readonly _axios: AxiosInstance

	constructor({
		base_url,
		public_api_key,
		secret_api_key,
	}: YellowChangerProps) {
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
		return crypto
			.createHmac('sha256', this.secret_api_key)
			.update(message)
			.digest('hex')
	}

	private _fetch<ResponseData>({
		params: { method = 'GET', path, body = {} },
		config,
	}: FetchRequestConfig) {
		const headers: { [key: string]: string } = { ...this.base_headers }

		try {
			if (method.toUpperCase() === 'GET') {
				const signature = this.createHmacSHA256(JSON.stringify(body))

				headers['Signature'] = signature

				return this._axios.get<ResponseData>(path, {
					headers: { ...headers },
				})
			}

			if (method.toUpperCase() === 'POST') {
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

	async getAllRates(): Promise<ExchangeRate[]> {
		const response = await this._fetch<ExchangeRate[]>({
			params: {
				method: 'GET',
				path: 'trades/allRates',
			},
		})

		return response.data
	}
}

export { YellowChanger }
