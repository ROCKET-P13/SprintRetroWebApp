import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Room } from '@/types/Room';

type RoomStoreSession = {
	roomId: string;
	participantId: string;
	participantName: string
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
			},
			room: {
				id: '',
				name: '',
				createdBy: '',
				columns: [],
				participants: [],
			},
			setSession: (data: RoomStoreSession) => {
				set({
					session: {
						roomId: data.roomId,
						participantId: data.participantId,
						participantName: data.participantName,
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
					},
					room: {
						id: '',
						name: '',
						createdBy: '',
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