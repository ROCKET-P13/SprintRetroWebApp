import { APIClient } from '@/API/APIClient';

interface ColumnsAPIConstructorParams {
	apiClient?: APIClient;
	roomId: string;
}

interface CreateParams {
	title: string;
}

export interface CreateColumnReponse {
	id: string;
	title: string;
	position: number;
}

export class ColumnsAPI {
	#url = '/columns';
	#apiClient: APIClient;
	#roomId: string;

	constructor (params: ColumnsAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
		this.#roomId = params.roomId;
	}

	async create ({ title }: CreateParams): Promise<CreateColumnReponse> {
		console.log({ url: `${this.#url}/${this.#roomId}` });
		const column = await this.#apiClient.post({
			url: `/rooms/${this.#roomId}${this.#url}`,
			body: { title },
		}) as CreateColumnReponse;

		return column;
	}
}
