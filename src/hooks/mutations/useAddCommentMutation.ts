import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { CommentsAPI } from '@/API/CommentsAPI';
import { Comment } from '@/types/Comment';
import { Room } from '@/types/Room';

interface UseAddCommentMutationProps {
	roomId: string;
	columnId: string;
	participantId: string;
	participantName: string;
}

interface NewComment {
	body: string;
}

interface MutationContext {
	previousRoomState?: Room;
	temporaryId: string;
}

export const useAddCommentMutation = (
	{
		roomId,
		columnId,
		participantId,
		participantName,
	}: UseAddCommentMutationProps
) => {
	const queryClient = useQueryClient();

	const commentsAPI = useMemo(() => new CommentsAPI({ roomId }), [roomId]);

	return useMutation<Comment, Error, NewComment, MutationContext>({
		mutationFn: async ({ body }) => {
			return await commentsAPI.create({
				roomId,
				columnId,
				participantId,
				body,
			});
		},
		onMutate: async ({ body }) => {
			const queryKey = ['room', roomId];

			await queryClient.cancelQueries({ queryKey });

			const previousRoomState = queryClient.getQueryData<Room>(queryKey);

			const temporaryId = crypto.randomUUID();

			queryClient.setQueryData<Room>(
				queryKey,
				(room) => {
					if (!room) {
						return room;
					}

					return {
						...room,
						columns: room.columns.map((column) => {
							if (column.id !== columnId) {
								return column;
							}

							return {
								...column,
								comments: [
									...column.comments,
									{
										id: temporaryId,
										body,
										voteCount: 0,
										createdBy: participantName,
										votes: [],
									},
								],
							};
						}),
					};
				}
			);

			return {
				previousRoomState,
				temporaryId,
			};
		},
		onError: (
			_,
			__,
			context
		) => {
			if (!context?.previousRoomState) {
				return;
			}

			queryClient.setQueryData(
				['room', roomId],
				context.previousRoomState
			);
		},
		onSuccess: (
			createdComment,
			_,
			context
		) => {
			queryClient.setQueryData<Room>(
				['room', roomId],
				(room) => {
					if (!room) {
						return room;
					}

					return {
						...room,
						columns: room.columns.map((column) => {
							if (column.id !== columnId) {
								return column;
							}

							return {
								...column,
								comments: column.comments.map(
									(comment) =>
										comment.id === context?.temporaryId
											? createdComment
											: comment
								),
							};
						}),
					};
				}
			);
		},
	});
};