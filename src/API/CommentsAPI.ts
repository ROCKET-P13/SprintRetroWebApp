import { APIClient } from '@/API/APIClient';
import { Comment } from '@/types/Comment';

interface CommentsAPIConstructorParams {
	apiClient?: APIClient;
	roomId: string;
}

export interface CreateCommentParams {
	roomId: string;
	columnId: string;
	participantId: string;
	body: string;
}

export class CommentsAPI {
	#url = '/comments';
	#apiClient: APIClient;
	#roomId:  string;

	constructor (params: CommentsAPIConstructorParams) {
		this.#apiClient = params.apiClient ?? new APIClient();
		this.#roomId = params.roomId;
	}

	async create ({ columnId, participantId, body }: CreateCommentParams): Promise<Comment> {
		const comment = await this.#apiClient.post({
			url: `/rooms/${this.#roomId}${this.#url}`,
			body: {
				columnId,
				participantId,
				body,
			},
		}) as Comment;

		return comment;
	}
}