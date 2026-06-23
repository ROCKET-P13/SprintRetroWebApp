import { Comment } from '@/types/Comment';

export interface Column {
	id: string;
	title: string;
	position: number;
	comments: Comment[]
}