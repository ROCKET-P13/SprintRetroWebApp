import { APIClient } from '@/API/APIClient';
import { Room } from '@/types/Room';

interface ParticipantsAPIConstructorParams {
	apiClient?: APIClient;
}

interface CreateParams {
	roomId: string;
	name: string;
}

export class ParticipantsAPI {
	#url = '/participants';
	#apiClient: APIClient;

	constructor (params: ParticipantsAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async create ({ roomId, name }: CreateParams) {
		const room = await this.#apiClient.post({
			url: `${this.#url}/${roomId}`,
			body: { name },
		}) as Room;

		return room;
	}
}