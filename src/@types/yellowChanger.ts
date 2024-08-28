interface FetchParams {
	method?: 'GET' | 'POST'
	path: string
	body?: any
}

export type FetchRequestConfig = RequestConfig<FetchParams>

export interface CreateTradeParams {
	sendCurrency: string
	getCurrency: string
	sendValue: number
	sendNetwork: string
	getNetwork: string
	credentials: string
	uniqId?: string
	sbpBank?: string
}
