import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';

import { CreateParams, RoomsAPI } from '@/API/RoomsAPI';
import { Room } from '@/types/Room';

export const useCreateRoomMutation = () => {
	const roomsAPI = useMemo(() => new RoomsAPI(), []);

	return useMutation<Room, Error, CreateParams, object>({
		mutationFn: async (params) => {
			return await roomsAPI.create({
				name: params.name,
				participantName: params.participantName,
				columns: params.columns,
			});
		},
		onError: (error) => {
			console.log(error);
		},
		onSuccess: (room) => {
			console.log('room created', room);
		},
	});
};