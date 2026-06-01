import { APIClient } from '@/API/APIClient';
import { Room } from '@/types/Room';

interface RoomsAPIContructorParams {
	apiClient?: APIClient;
}

interface GetByIdParams {
	roomId: string;
}

interface CreateParams {
	name: string;
}

export class RoomsAPI {
	#url = '/rooms';
	#apiClient: APIClient;

	constructor (params: RoomsAPIContructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async getById ({ roomId }: GetByIdParams): Promise<Room> {
		const room = await this.#apiClient.get({
			url: `${this.#url}/${roomId}`,
		}) as Room;

		return room;
	}

	async create ({ name }: CreateParams): Promise<Room> {
		const room = await this.#apiClient.post({
			url: `${this.#url}`,
			body: { name },
		}) as Room;

		return room;
	}
}