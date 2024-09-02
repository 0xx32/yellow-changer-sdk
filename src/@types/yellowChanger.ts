type ApiRequestConfig = import('axios').AxiosRequestConfig

type RequestConfig<Params = undefined> = Params extends undefined
	? { config?: ApiRequestConfig }
	: { params: Params; config?: ApiRequestConfig }

interface FetchParams {
	method?: 'GET' | 'POST'
	path: string
	body?: any
}

export type FetchRequestConfig = RequestConfig<FetchParams>
export interface YellowErrorResponse {
	message: string
	statusCode: number
}

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

export interface YellowChangerProps {
	public_api_key: string
	secret_api_key: string
	base_url?: string
}

export interface ExchangeRate {
	currency: string
	name: string
	withdraw_networks: WithdrawNetwork[]
	deposit_networks: DepositNetwork[]
	conversion_rates: {
		[key: string]: number
	}
}

export interface DepositNetwork {
	network: string
	fee: number
	min_deposit: number
}
export interface WithdrawNetwork {
	network: string
	fee: number
	min_withdraw: number
}
export interface ConversionRates {
	[key: string]: number
}

export interface DestinationsList {
	payin: Destination[]
	payout: Destination[]
}

export interface Destination {
	currency: string
	network: string
	limit: Limit
}

export interface Limit {
	min_amount: number
	max_amount: number
}

export interface RateInDirection {
	currency: string
	name: string
	withdraw_networks: WithdrawNetwork[]
	deposit_networks: DepositNetwork[]
	conversion_rates: ConversionRates
}

export interface TradeInfo {
	send_name: string
	send_network: string
	get_network: string
	uniq_id: string
	status: number
	payment_wallet: string
	userPaidHash: string
	ourHash: string
	get_creds: string
	network_commission: number
	date: number
	time_expire: number
	send_value: string
	get_value: string
}
