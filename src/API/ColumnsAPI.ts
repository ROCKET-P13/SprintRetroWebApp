import { APIClient } from '@/API/APIClient';
import { Column } from '@/types/Column';

interface ColumnsAPIConstructorParams {
	apiClient?: APIClient;
	roomId?: string;
}

interface CreateParams {
	title: string;
}

export class ColumnsAPI {
	#url = '/columns';
	#apiClient: APIClient;
	#roomId: undefined|string;

	constructor (params: ColumnsAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient();
		this.#roomId = params.roomId;
	}

	async create ({ title }: CreateParams): Promise<Column> {
		const column = await this.#apiClient.post({
			url: `${this.#url}/${this.#roomId}`,
			body: { title },
		}) as Column;

		return column;
	}
}
