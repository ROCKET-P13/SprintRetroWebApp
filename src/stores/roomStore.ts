import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Room } from '@/types/Room';

type RoomStoreSession = {
	roomId: string;
	participantId: string;
	participantName: string
	isRoomAdmin: boolean;
}

interface RoomStore {
	session: RoomStoreSession;
	room: Room;
	setSession: (data: RoomStoreSession) => void;
	setRoom: (data: Room) => void;
	clearSession: () => void;
}

export const roomStore = create<RoomStore>()(
	persist(
		(set) => ({
			session: {
				roomId: '',
				participantId: '',
				participantName: '',
				isRoomAdmin: false,
			},
			room: {
				id: '',
				name: '',
				columns: [],
				participants: [],
			},
			setSession: (data: RoomStoreSession) => {
				set({
					session: {
						roomId: data.roomId,
						participantId: data.participantId,
						participantName: data.participantName,
						isRoomAdmin: data.isRoomAdmin,
					},
				});
			},
			setRoom: (data: Room) => {
				set({
					room: data,
				});
			},
			clearSession: () => {
				set({
					session: {
						roomId: '',
						participantId: '',
						participantName: '',
						isRoomAdmin: false,
					},

					room: {
						id: '',
						name: '',
						columns: [],
						participants: [],
					},
				});
			},
		}),
		{
			name: 'sprint-retro-session',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				session: state.session,
			}),
			merge: (persistedState, currentState) => ({
				...currentState,
				...(persistedState ?? {}),
				room: currentState.room,
			}),
		}
	)
);