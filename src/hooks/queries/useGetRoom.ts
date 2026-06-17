import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { RoomsAPI } from '@/API/RoomsAPI';

export const useGetRoom = ({ roomId }: { roomId: string }) => {
	const roomsAPI = useMemo(() => new RoomsAPI(), []);
	return useQuery({
		queryKey: ['room', roomId],
		queryFn: async () => {
			return await roomsAPI.getById({ roomId });
		},
		enabled: !!roomId,
		placeholderData: (previousData) => previousData,
	});
};