import axios, { AxiosError } from 'axios';

interface RequestParams {
	method: string;
	url: string;
	body?: object;
	headers?: Record<string, string>;
}

interface APIError {
	status: number;
	message: string;
}

interface GetParams {
	url: string;
}

interface PostParams {
	url: string;
	body: object;
}

interface DeleteParams {
	url: string;
}

interface PatchParams {
	url: string;
	body: object;
}

export class APIClient {
	#API_BASE_URL = import.meta.env.API_BASE_URL ?? '/api';

	async #request (params: RequestParams) : Promise<object> {
		try {
			const response = await axios.request({
				method: params.method,
				url: `${this.#API_BASE_URL}${params.url}`,
				data: params.body,
				headers: {
					'Content-Type': 'application/json',
					...(params.headers || {}),
				},
				withCredentials: true,
			});

			return response.data;
		} catch (error) {
			const axiosError = error as AxiosError<{ message?: string }>;

			if (axiosError.response) {
				const apiError: APIError = {
					status: axiosError.response.status,
					message: axiosError.response.data?.message || 'API Error',
				};
				throw apiError;
			}

			const networkError: APIError = {
				status: 0,
				message: axiosError.message || 'Network Error',
			};
			throw networkError;
		}
	}

	async get ({ url }: GetParams): Promise<object> {
		return await this.#request({
			method: 'GET',
			url,
		});
	}

	async post ({ url, body }: PostParams): Promise<object> {
		return await this.#request({
			method: 'POST',
			url,
			body,
		});
	}

	async delete ({ url }: DeleteParams): Promise<object> {
		return await this.#request({
			method: 'DELETE',
			url,
		});
	}

	async patch ({ url, body }: PatchParams): Promise<object> {
		return await this.#request({
			method: 'PATCH',
			url,
			body,
		});
	}
}