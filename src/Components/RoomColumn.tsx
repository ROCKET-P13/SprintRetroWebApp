import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@ui/Icon';
import {
	GripVertical,
	MessageSquare
} from 'lucide-react';

import { AddCommentBox } from '@/Components/AddCommentBox';
import { CommentCard } from '@/Components/CommentCard';

interface RoomColumnProps {
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
}

export const RoomColumn = ({
	id,
	title,
	comments = [],
}: RoomColumnProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({
		id,
	});

	const style = {
		transform:
			CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`
				flex
				h-125
				w-full
				flex-col
				rounded-xl
				border
				bg-card
				shadow-sm
			`}
		>
			<div className="border-b px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div
							{...attributes}
							{...listeners}
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
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				{
					comments.length === 0
						? (
							<div className="flex h-full items-center justify-center">
								<div className="text-center">
									<MessageSquare
										className="
											mx-auto
											mb-2
											size-8
											text-muted-foreground
										"
									/>

									<p className="text-sm text-muted-foreground">
										No comments yet
									</p>
								</div>
							</div>
						)
						: (
							<div className="flex flex-col gap-3">
								{
									comments.map(
										(comment) => (
											<CommentCard
												key={comment.id}
												id={comment.id}
												body={comment.body}
												votes={comment.votes}
												createdBy={comment.createdBy}
											/>
										)
									)
								}
							</div>
						)
				}
			</div>

			<AddCommentBox columnId={id} />
		</div>
	);
};