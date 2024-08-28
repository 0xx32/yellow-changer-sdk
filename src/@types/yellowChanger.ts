interface FetchParams {
	method?: 'GET' | 'POST'
	path: string
	body?: any
}

export type FetchRequestConfig = RequestConfig<FetchParams>
