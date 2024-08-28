interface YellowChangerProps {
	public_api_key: string
	secret_api_key: string
	base_url?: string
}
interface YellowChangerResponseError {
	message: string
	statusCode: number
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
