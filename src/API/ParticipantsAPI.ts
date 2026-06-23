import { APIClient } from '@/API/APIClient';
import { Room } from '@/types/Room';

interface ParticipantsAPIConstructorParams {
	apiClient?: APIClient;
	roomId: string;
}

interface CreateParams {
	roomId: string;
	name: string;
}

export class ParticipantsAPI {
	#url = '/participants';
	#apiClient: APIClient;
	#roomId: string;

	constructor (params: ParticipantsAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
		this.#roomId = params.roomId;
	}

	async create ({ name }: CreateParams) {
		const room = await this.#apiClient.post({
			url: `${this.#url}/${this.#roomId}`,
			body: { name },
		}) as Room;

		return room;
	}
}