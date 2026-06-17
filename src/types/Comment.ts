export interface Comment {
	id: string;
	createdBy: string;
	body: string;
	votes: Array<{
		id: string;
		participantName: string;
	}>
}