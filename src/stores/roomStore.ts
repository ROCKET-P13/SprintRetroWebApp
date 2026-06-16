import { create } from 'zustand';

import { Room } from '@/types/Room';

interface RoomStore {
	room: Room;
	setRoom: (data: Room) => void;
}

export const roomStore = create<RoomStore>((set, get) => ({
	room: {
		id: '',
		name: '',
		columns: [],
		participants: [],
	},
	setRoom: (data) => {
		set({ room: data });
	},
}));