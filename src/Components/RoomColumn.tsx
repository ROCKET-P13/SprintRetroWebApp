import { Button } from '@ui/Button';
import { MessageSquare, Plus } from 'lucide-react';

import { CommentCard } from '@/Components/CommentCard';

interface RoomColumnProps {
	title: string;
	comments?: Array<{
		id: string;
		body: string;
		voteCount: number;
		createdBy: string
	}>
}

export const RoomColumn = ({ title, comments = [] }: RoomColumnProps) => {
	return (
		<div
			className="
				flex
				h-125
				w-full
				flex-col
				rounded-xl
				border
				bg-card
				shadow-sm
			"
		>
			<div className="border-b px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
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
									comments.map((comment) => (
										<CommentCard
											key={comment.id}
											body={comment.body}
											voteCount={comment.voteCount}
											createdBy={comment.createdBy}
										/>
									))
								}
							</div>
						)
				}
			</div>
			<div className="border-t py-3 px-5">
				<Button variant='secondary' className='w-full bg-background'>
					<Plus className="size-4" />
					Add Comment
				</Button>
			</div>
		</div>
	);
};