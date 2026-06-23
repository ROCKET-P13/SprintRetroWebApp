import { Vote } from '@/types/Vote';

export interface Comment {
	id: string;
	body: string;
	voteCount?: number;
	createdBy: string;
	votes: Vote[]
}