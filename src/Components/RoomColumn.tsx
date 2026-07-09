import { Icon } from '@ui/Icon';
import {
	GripVertical,
	MessageSquare,
	Trash
} from 'lucide-react';

import { AddCommentBox } from '@/Components/AddCommentBox';
import { CommentCard } from '@/Components/CommentCard';
import { deleteColumnStore } from '@/stores/deleteColumnStore';

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
	const setColumnToDelete = deleteColumnStore((state) => state.setColumnToDelete);
	const openDeleteColumnDialog = deleteColumnStore((state) => state.openDialog);
	return (
		<div
			className="
				flex
				flex-col
				self-start
				rounded-xl
				border
				bg-card
				shadow-sm
			"
		>
			<div className="border-b px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 justify-between w-full">
						<div className='flex flex-row gap-2 items-center'>
							<div
								{...dragHandleProps}
								className="
								cursor-grab
								active:cursor-grabbing
							"
							>
								<Icon
									as={GripVertical}
									className="text-muted-foreground"
								/>
							</div>

							<h2 className="font-medium">
								{title}
							</h2>

							<div
								className="
								rounded-full
								bg-muted
								px-2
								py-0.5
								text-xs
								text-muted-foreground
							"
							>
								{comments.length}
							</div>
						</div>

						<div>
							<button
								className='p-1 rounded-md hover:bg-muted hover:cursor-pointer'
								onClick={() => {
									openDeleteColumnDialog();
									setColumnToDelete({ id, title });
								}}
							>
								<Icon
									as={Trash}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				{
					comments.length === 0 ? (
						<div className="flex p-10 items-center justify-center">
							<div className="text-center">
								<MessageSquare
									className="mx-auto mb-2 size-6 text-muted-foreground"
								/>

								<p className="text-sm text-muted-foreground">
									No comments yet
								</p>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-3">
							{
								comments.map((comment) => (
									<CommentCard
										key={comment.id}
										id={comment.id}
										body={comment.body}
										votes={comment.votes}
										createdBy={comment.createdBy}
									/>
								))
							}
						</div>
					)
				}
			</div>

			<AddCommentBox columnId={id} />
		</div>
	);
};