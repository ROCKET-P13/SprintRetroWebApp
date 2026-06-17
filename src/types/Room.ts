export interface Room {
	id: string;
	name: string;
	columns: Array<{
		id: string;
		title: string;
		position: number;
		comments: Array<{
			id: string;
			body: string;
			voteCount?: number;
			createdBy: string;
			votes: Array<{
				id: string;
				participantName: string;
			}>
		}>
	}>;
	participants: Array<{
		id: string;
		name: string;
	}>
}