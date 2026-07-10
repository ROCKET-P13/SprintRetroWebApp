import { MessageSquare } from 'lucide-react';

import { CommentCard } from '@/Components/CommentCard';
import { Comment } from '@/types/Comment';

interface CommentListProps {
	comments: Comment[]
}

export const CommentList = ({ comments }: CommentListProps) => {
	return (
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
	);
};