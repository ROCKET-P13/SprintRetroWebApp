import { WebSocketRequestTypes } from '@/Common/WebSocketRequestTypes';
import { Room } from '@/types/Room';

export interface RoomUpdatedMessage {
	type: WebSocketRequestTypes.JOIN_ROOM,
	payload: Room
}