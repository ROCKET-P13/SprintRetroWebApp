export interface RetroTemplate {
	id: string;
	name: string;
	columns: Array<{
		title: string;
		position: number;
	}>
}