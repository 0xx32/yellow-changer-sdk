type ApiRequestConfig = import('axios').AxiosRequestConfig

type RequestConfig<Params = undefined> = Params extends undefined
	? { config?: ApiRequestConfig }
	: { params: Params; config?: ApiRequestConfig }

interface BaseResponse {
	message: string
	status_code: number
}
