import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { CreateVoteResponse, VotesAPI } from '@/API/VotesAPI';
import { Room } from '@/types/Room';

interface UseAddVoteMutationProps {
	roomId: string;
	participantId: string;
}

interface NewVote {
	commentId: string;
	participantName: string;
}

interface MutationContext {
	previousRoomState?: Room;
	temporaryId: string;
}

export const useAddVoteMutation = (
	{
		roomId,
		participantId,
	}: UseAddVoteMutationProps
) => {
	const queryClient = useQueryClient();

	const votesAPI = useMemo(() => new VotesAPI({ roomId }), [roomId]);

	return useMutation<CreateVoteResponse, Error, NewVote, MutationContext>({
		mutationFn: async (params) => {
			return await votesAPI.add({
				roomId,
				participantId,
				commentId: params.commentId,
			});
		},
		onMutate: async ({ commentId, participantName }) => {
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
							return {
								...column,
								comments: column.comments.map((comment) => {
									if (comment.id !== commentId) {
										return comment;
									}

									return {
										...comment,
										votes: [
											...(comment.votes || []),
											{
												id: temporaryId,
												participantName,
											},
										],
									};
								}),
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
			response,
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
							if (column.id !== response.columnId) {
								return column;
							}

							return {
								...column,
								comments: column.comments.map((comment) => {
									if (comment.id !== response.commentId) {
										return comment;
									}

									return {
										...comment,
										votes: comment.votes ? comment.votes.map((vote) => {
											return vote.id === context?.temporaryId
												? response
												: vote;
										}) : [],
									};
								}),
							};
						}),
					};
				}
			);
		},
	});
};