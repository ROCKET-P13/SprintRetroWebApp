import { create } from 'zustand';

interface ColumnToDelete {
	id: string;
	title: string;
}

interface DeleteColumnStore {
	isOpen: boolean;
	columnToDelete: ColumnToDelete;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	setColumnToDelete: (event: ColumnToDelete) => void;
}

export const deleteColumnStore = create<DeleteColumnStore>((set) => ({
	isOpen: false,
	columnToDelete: {
		id: '',
		title: '',
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			columnToDelete: {
				id: '',
				title: '',
			},
		});
	},
	setColumnToDelete: (event) => {
		set({
			columnToDelete: event,
		});
	},
}));