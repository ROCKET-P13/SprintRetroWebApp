import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { ColumnsAPI, UpdateColumnTitleParams, UpdateColumnTitleResponse } from '@/API/ColumnsAPI';
import { Room } from '@/types/Room';

interface UseUpdateColumnTitleMutation {
	roomId: string;
}

interface MutationContext {
	previousRoomState?: Room;
}

export const useUpdateColumnTitleMutation = ({ roomId }: UseUpdateColumnTitleMutation) => {
	const queryClient = useQueryClient();

	const queryKey = ['room', roomId];

	const columnsAPI = useMemo(() => new ColumnsAPI({ roomId }), [roomId]);

	return useMutation<UpdateColumnTitleResponse, Error, UpdateColumnTitleParams, MutationContext>({
		mutationFn: async ({ id, title }) => {
			return await columnsAPI.updateTitle({ id, title });
		},
		onMutate: async ({ id, title }) => {
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
						columns: _.map(room.columns, (column) => {
							return column.id === id
							 ? {
									...column,
									title,
							 }
							 : column;
						}),
					};
				}
			);

			return { previousRoomState };
		},
		onError: (_, __, context) => {
			if (!context?.previousRoomState) {
				return;
			}

			queryClient.setQueryData(
				queryKey,
				context.previousRoomState
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});
};