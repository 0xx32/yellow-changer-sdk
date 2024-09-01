type ApiRequestConfig = import('axios').AxiosRequestConfig

type RequestConfig<Params = undefined> = Params extends undefined
	? { config?: ApiRequestConfig }
	: { params: Params; config?: ApiRequestConfig }

interface YellowErrorResponse {
	message: string
	statusCode: number
}
