import { APIClient } from '@/API/APIClient';
import { Room } from '@/types/Room';

interface ColumnsAPIConstructorParams {
	apiClient?: APIClient;
}

interface CreateParams {
	roomId: string;
	title: string;
}

export class ColumnsAPI {
	#url = '/columns';
	#apiClient: APIClient;

	constructor (params: ColumnsAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async create ({ roomId, title }: CreateParams): Promise<Room> {
		const room = await this.#apiClient.post({
			url: `${this.#url}/${roomId}`,
			body: { title },
		}) as Room;

		return room;
	}
}
