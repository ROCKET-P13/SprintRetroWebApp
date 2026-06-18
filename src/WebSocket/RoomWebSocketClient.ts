import { WebSocketRequestTypes } from '@/Common/WebSocketRequestTypes';
import { Room } from '@/types/Room';
import { RoomUpdatedMessage } from '@/types/RoomUpdatedMessage';
import { WebSocketClient } from '@/WebSocket/WebSocketClient';

interface RoomWebSocketClientConstructorParams {
	webSocketClient?: WebSocketClient;
}

interface JoinRoomParams {
	roomId: string;
	participantId: string;
}

class RoomWebSocketClient {
	#webSocketClient: WebSocketClient;

	constructor (params: RoomWebSocketClientConstructorParams = {}) {
		this.#webSocketClient = params.webSocketClient ?? new WebSocketClient();
		this.#webSocketClient.connect();
	}

	async join ({ roomId, participantId }: JoinRoomParams) {
		return await this.#webSocketClient.send(
			WebSocketRequestTypes.JOIN_ROOM,
			{
				roomId,
				participantId,
			}
		);
	}

	subscribe (listener: (room: Room) => void): () => void {
		return this.#webSocketClient.subscribe((data: RoomUpdatedMessage) => {
			listener(data.payload);
		});
	}
}

export const roomWebSocketClient = new RoomWebSocketClient();