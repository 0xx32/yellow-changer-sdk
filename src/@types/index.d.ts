interface YellowChangerProps {
	public_api_key: string
	secret_api_key: string
	base_url?: string
}

interface ExchangeRate {
	currency: string
	name: string
	withdraw_networks: WithdrawNetwork[]
	deposit_networks: DepositNetwork[]
	conversion_rates: {
		[key: string]: number
	}
}

interface DepositNetwork {
	network: string
	fee: number
	min_deposit: number
}
interface WithdrawNetwork {
	network: string
	fee: number
	min_withdraw: number
}
interface ConversionRates {
	[key: string]: number
}

interface DestinationsList {
	payin: Destination[]
	payout: Destination[]
}

interface Destination {
	currency: string
	network: string
	limit: Limit
}

interface Limit {
	min_amount: number
	max_amount: number
}

interface RateInDirection {
	currency: string
	name: string
	withdraw_networks: WithdrawNetwork[]
	deposit_networks: DepositNetwork[]
	conversion_rates: ConversionRates
}

interface TradeInfo {
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
