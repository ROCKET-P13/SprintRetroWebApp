import { create } from 'zustand';
interface CreateRoomStore {
	roomName: string;
	participantName: string;
	columns: Array<{
		title: string;
		position?: number;
	}>
	updateCreateRoomStore: (data: Partial<CreateRoomStore>) => void;
}

export const createRoomStore = create<CreateRoomStore>((set, get) => ({
	roomName: '',
	participantName: '',
	columns: [],
	updateCreateRoomStore: (data) => {
		set((state) => ({
			...state,
			...data,
		}));
	},
}));