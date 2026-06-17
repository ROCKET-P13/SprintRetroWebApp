import { APIClient } from '@/API/APIClient';
import { Vote } from '@/types/Vote';

interface VotesAPIConstructorParams {
	apiClient?: APIClient;
}

export interface AddVoteParams {
	roomId: string;
	participantId: string;
	commentId: string;
}

export class VotesAPI {
	#url = '/votes';
	#apiClient: APIClient;

	constructor (params: VotesAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async add ({ roomId, participantId, commentId }: AddVoteParams): Promise<Vote> {
		const vote = await this.#apiClient.post({
			url: `/rooms/${roomId}${this.#url}`,
			body: { participantId, commentId },
		}) as Vote;

		return vote;
	}
}