import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { ColumnsAPI } from '@/API/ColumnsAPI';
import { Room } from '@/types/Room';

interface UseRemoveColumnMutationProps {
	roomId: string;
}

interface UseRemoveColumnMutationParams {
	columnId: string;
}

interface MutationContext {
	previousRoomState?: Room;
}

export const useRemoveColumnMutation = ({ roomId }: UseRemoveColumnMutationProps) => {
	const queryClient = useQueryClient();

	const columnsAPI = useMemo(() => new ColumnsAPI({ roomId }), [roomId]);

	const queryKey = ['room', roomId];

	return useMutation<object, Error, UseRemoveColumnMutationParams, MutationContext>({
		mutationFn: async ({ columnId }) => {
			return await columnsAPI.remove({ columnId });
		},
		onMutate: async ({ columnId }) => {
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
						columns: _.filter(room.columns, (column) => column.id !== columnId),
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
				queryKey,
				context.previousRoomState
			);
		},
	});
};