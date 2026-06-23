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
	#url = '/votes';
	#apiClient: APIClient;
	#roomId: string;

	constructor (params: VotesAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
		this.#roomId = params.roomId;
	}

	async add ({ participantId, commentId }: AddVoteParams): Promise<CreateVoteResponse> {
		const vote = await this.#apiClient.post({
			url: `/rooms/${this.#roomId}${this.#url}`,
			body: { participantId, commentId },
		}) as CreateVoteResponse;

		return vote;
	}

	async remove ({ voteId }: RemoveVoteParams) {
		const response = await this.#apiClient.delete({
			url: `/rooms/${this.#roomId}${this.#url}/${voteId}`,
		});

		return response;
	}
}