import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { ColumnsAPI, UpdateColumnsResponse, UpdateParams } from '@/API/ColumnsAPI';
import { Room } from '@/types/Room';

interface UseUpdateColumnPositionsMutation {
	roomId: string;
}

interface MutationContext {
	previousRoomState?: Room;
}

export const useUpdateColumnPositionsMutation = ({ roomId }: UseUpdateColumnPositionsMutation) => {
	const queryClient = useQueryClient();

	const queryKey = ['room', roomId];

	const columnsAPI = useMemo(() => new ColumnsAPI({ roomId }), [roomId]);

	return useMutation<UpdateColumnsResponse, Error, UpdateParams, MutationContext>({
		mutationFn: async ({ columns }) => {
			return await columnsAPI.update({ columns });
		},
		onMutate: async ({ columns }) => {
			await queryClient.cancelQueries({ queryKey });

			const previousRoomState = queryClient.getQueryData<Room>(queryKey);

			queryClient.setQueryData<Room>(
				queryKey,
				(room) => {
					if (!room) {
						return room;
					}

					const columnsById = _.keyBy(room.columns, 'id');

					const updatedColumnsById = _.keyBy(columns, 'id');

					return {
						...room,
						columns: _.map(room.columns, (column) => {
							if (!updatedColumnsById[column.id]) {
								return column;
							}

							return {
								...columnsById[column.id],
								position: updatedColumnsById[column.id].position,
							};
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
		onSuccess: ({ columns }) => {
			queryClient.setQueryData<Room>(
				queryKey,
				(room) => {
					if (!room) {
						return room;
					}

					const updatedColumnsById = _.keyBy(columns, 'id');
					return {
						...room,
						columns: _.map(room.columns, (column) => {
							if (!updatedColumnsById[column.id]) {
								return column;
							}

							return {
								...column,
								position: updatedColumnsById[column.id].position,
							};
						}),
					};
				}
			);
		},
	});
};