import { APIClient } from '@/API/APIClient';

interface VotesAPIConstructorParams {
	apiClient?: APIClient;
	roomId: string;
}

export interface AddVoteParams {
	roomId: string;
	participantId: string;
	commentId: string;
}

export interface RemoveVoteParams {
	roomId: string;
	voteId: string;
}

export interface CreateVoteResponse {
	id: string;
	columnId: string;
	commentId: string;
	participantName: string;
}

export class VotesAPI {
	// #url = '/votes';
	#url: string;
	#apiClient: APIClient;
	#roomId: string;

	constructor (params: VotesAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
		this.#roomId = params.roomId;
		this.#url = `/rooms/${this.#roomId}/votes`;
	}

	async add ({ participantId, commentId }: AddVoteParams): Promise<CreateVoteResponse> {
		const vote = await this.#apiClient.post({
			url: this.#url,
			body: { participantId, commentId },
		}) as CreateVoteResponse;

		return vote;
	}

	async remove ({ voteId }: RemoveVoteParams) {
		const response = await this.#apiClient.delete({
			url: `${this.#url}/${voteId}`,
		});

		return response;
	}
}