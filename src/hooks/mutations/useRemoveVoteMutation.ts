import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { VotesAPI } from '@/API/VotesAPI';
import { Room } from '@/types/Room';

interface UseRemoveVoteMutationProps {
	roomId: string;
}

interface UseRemoveVoteMutationParams {
	commentId: string;
	voteId: string;
}

interface MutationContext {
	previousRoomState?: Room;
}

export const useRemoveVoteMutation = (
	{
		roomId,
	}: UseRemoveVoteMutationProps
) => {
	const queryClient = useQueryClient();

	const votesAPI = useMemo(() => new VotesAPI(), []);

	return useMutation<object, Error, UseRemoveVoteMutationParams, MutationContext>({
		mutationFn: async (params) => {
			return await votesAPI.remove({
				roomId,
				voteId: params.voteId,
			});
		},
		onMutate: async ({ commentId, voteId }) => {
			const queryKey = ['room', roomId];

			await queryClient.cancelQueries({ queryKey });

			const previousRoomState = queryClient.getQueryData<Room>(queryKey);

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
										votes: _.filter(comment.votes, (vote) => vote.id !== voteId),
									};
								}),
							};
						}),
					};
				}
			);

			return {
				previousRoomState,
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
	});
};