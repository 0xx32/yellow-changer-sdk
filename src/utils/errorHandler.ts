import { YellowErrorResponse } from '../@types/yellowChanger'
import { AxiosError } from 'axios'

export const errorHandler = (error: AxiosError<YellowErrorResponse>) => {
	if (error instanceof AxiosError) {
		console.error(
			`request failed with status code: ${error.response?.data.statusCode}, message: ${error.response?.data.message}` ||
				error.message
		)
	} else {
		console.error(error)
	}
}
