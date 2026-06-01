import { APIClient } from '@/API/APIClient';
import { Room } from '@/types/Room';

interface VotesAPIConstructorParams {
	apiClient?: APIClient;
}

interface CreateParams {
	roomId: string;
	participantId: string;
	commentId: string;
}

export class VotesAPI {
	#url = '/participants';
	#apiClient: APIClient;

	constructor (params: VotesAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async create ({ roomId, participantId, commentId }: CreateParams) {
		const room = await this.#apiClient.post({
			url: `${this.#url}/${roomId}`,
			body: { participantId, commentId },
		}) as Room;

		return room;
	}
}