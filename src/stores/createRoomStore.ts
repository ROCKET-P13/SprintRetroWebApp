import { create } from 'zustand';

interface CreateRoomStore {
	roomName: string;
	participantName: string;
	columns: Array<{
		title: string;
		position?: number;
	}>
}

export const createRoomStore = create<CreateRoomStore>((set) => ({
	roomName: '',
	participantName: '',
	columns: [],
}));