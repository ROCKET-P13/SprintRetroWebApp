import { APIClient } from '@/API/APIClient';
import { Room } from '@/types/Room';

interface CommentsAPIConstructorParams {
	apiClient?: APIClient;
}

interface CreateParams {
	roomId: string;
	participantId: string;
	body: string;
}

export class CommentsAPI {
	#url = '/comments';
	#apiClient: APIClient;

	constructor (params: CommentsAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async create ({ roomId, participantId, body }: CreateParams) {
		const room = await this.#apiClient.post({
			url: `${this.#url}/${roomId}`,
			body: { participantId, body },
		}) as Room;

		return room;
	}
}