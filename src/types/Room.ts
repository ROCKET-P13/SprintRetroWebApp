import { Column } from '@/types/Column';
import { Participant } from '@/types/Participant';

export interface Room {
	id: string;
	name: string;
	createdBy: string;
	columns: Column[]
	participants: Participant[]
}