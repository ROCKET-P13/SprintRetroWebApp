import { create } from 'zustand';

interface AddColumnStore {
	title: string;
	isAddingColumn: boolean;
	setTitle: (data: string) => void;
	toggleIsAddingColumn: () => void;

}

export const addColumnStore = create<AddColumnStore>((set, get) => ({
	title: '',
	isAddingColumn: false,
	setTitle: (data) => {
		set(() => ({ title: data }));
	},
	toggleIsAddingColumn: () => {
		set(() => ({ isAddingColumn: !get().isAddingColumn }));
	},
}));