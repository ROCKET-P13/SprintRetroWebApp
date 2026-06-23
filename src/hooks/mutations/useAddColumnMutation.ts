import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ColumnsAPI } from '@/API/ColumnsAPI';
import { Column } from '@/types/Column';
import { Room } from '@/types/Room';

interface UseAddColumnMutationProps {
	roomId: string;
}

interface NewColumn {
	title: string;
}

interface MutationContext {
	previousRoomState?: Room;
	temporaryId: string;
}

export const useAddColumnMutation = ({ roomId }: UseAddColumnMutationProps) => {
	const queryClient = useQueryClient();

	const queryKey = ['room', roomId];

	const columnsAPI = useMemo(() => new ColumnsAPI({ roomId }), [roomId]);

	return useMutation<Column, Error, NewColumn, MutationContext>({
		mutationFn: async ({ title }) => {
			return await columnsAPI.create({ title });
		},
		onMutate: async ({ title }) => {
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
						columns: [
							...room.columns,
							{
								id: temporaryId,
								title,
								position: room.columns.length + 1,
								comments: [],
							},
						],
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
				queryKey,
				context.previousRoomState
			);
		},
		onSuccess: (createdColumn, _, context) => {
			queryClient.setQueryData<Room>(
				queryKey,
				(room) => {
					if (!room) {
						return room;
					}

					return {
						...room,
						columns: room.columns.map((column) => column.id === context.temporaryId ? createdColumn : column),
					};
				}
			);
		},
	});
};