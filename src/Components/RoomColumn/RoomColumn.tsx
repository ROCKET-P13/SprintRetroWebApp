import { AddCommentBox } from '@/Components/RoomColumn/AddCommentBox';
import { ColumnHeader } from '@/Components/RoomColumn/ColumnHeader';
import { CommentList } from '@/Components/RoomColumn/CommentList';

export interface RoomColumnProps {
	id: string;
	title: string;
	comments?: Array<{
		id: string;
		body: string;
		createdBy: string;
		votes: Array<{
			id: string;
			participantName: string;
		}>;
	}>;

	dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const RoomColumn = ({
	id,
	title,
	comments = [],
	dragHandleProps,
}: RoomColumnProps) => {
	return (
		<div
			className="
				flex
				flex-col
				self-start
				rounded-xl
				border
				bg-card
			"
		>
			<ColumnHeader
				id={id}
				title={title}
				commentCount={comments.length}
				dragHandleProps={dragHandleProps}
			/>
			<CommentList comments={comments} />
			<AddCommentBox columnId={id} />
		</div>
	);
};