import { create } from 'zustand';

import { TemplateIds } from '@/Common/Templates/TemplateIds';
import { RetroTemplate } from '@/types/RetroTemplate';

interface CreateRoomStore {
	roomName: string;
	participantName: string;
	templateId: string;
	columns: Array<{
		title: string;
		position?: number;
	}>
	selectTemplate: (template: RetroTemplate) => void;
	updateCreateRoomStore: (data: Partial<CreateRoomStore>) => void;
}

export const createRoomStore = create<CreateRoomStore>((set) => ({
	roomName: '',
	participantName: '',
	templateId: TemplateIds.EMPTY,
	columns: [],
	selectTemplate: (template) => {
		set((state) => ({
			...state,
			templateId: template.id,
			columns: template.columns,
		}));
	},
	updateCreateRoomStore: (data) => {
		set((state) => ({
			...state,
			...data,
		}));
	},

}));