import { APIClient } from '@/API/APIClient';
import { Comment } from '@/types/Comment';

interface CommentsAPIConstructorParams {
	apiClient?: APIClient;
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

	constructor (params: CommentsAPIConstructorParams = {}) {
		this.#apiClient = params.apiClient ?? new APIClient();
	}

	async create ({ roomId, columnId, participantId, body }: CreateCommentParams): Promise<Comment> {
		const comment = await this.#apiClient.post({
			url: `/rooms/${roomId}${this.#url}`,
			body: {
				columnId,
				participantId,
				body,
			},
		}) as Comment;

		return comment;
	}
}