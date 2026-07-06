import { APIClient } from '@/API/APIClient';

interface ColumnsAPIConstructorParams {
	apiClient?: APIClient;
	roomId: string;
}

interface CreateParams {
	title: string;
}

export interface UpdateParams {
	columns: Array<{
		id: string;
		position: number;
	}>
}

export interface CreateColumnReponse {
	id: string;
	title: string;
	position: number;
}

export interface UpdateColumnsResponse {
	columns: Array<{
		id: string;
		title: string;
		position: number;
	}>
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
		return await this.#apiClient.post({
			url: `/rooms/${this.#roomId}${this.#url}`,
			body: { title },
		}) as CreateColumnReponse;
	}

	async update ({ columns }: UpdateParams): Promise<UpdateColumnsResponse> {
		return await this.#apiClient.patch({
			url: `/rooms/${this.#roomId}${this.#url}`,
			body: { columns },
		}) as UpdateColumnsResponse;
	}
}
