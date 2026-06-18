import { useMutation } from '@tanstack/react-query';

import { roomWebSocketClient } from '@/WebSocket/RoomWebSocketClient';

interface JoinRoomMutationParams {
	roomId: string;
	participantId: string;
}
export const useJoinRoom = () => {
	return useMutation({
		mutationFn: async (params: JoinRoomMutationParams) => await roomWebSocketClient.join(params),
	});
};