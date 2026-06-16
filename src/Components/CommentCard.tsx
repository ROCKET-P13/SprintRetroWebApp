import { Button } from '@ui/Button';

interface CommentCardProps {
	id: string;
	body: string;
	voteCount: number;
	createdBy: string;
}

export const CommentCard = ({ id, body, voteCount, createdBy }: CommentCardProps) => {
	return (
		<div className="group rounded-lg border bg-secondary p-3">
			<p className="text-sm leading-relaxed">
				{body}
			</p>

			<div className="mt-4 flex items-center justify-between">
				<span className="text-xs text-muted-foreground">
					{createdBy}
				</span>
				<Button
					variant='outline'
					size='sm'
					onClick={() => console.log(`voted on comment: ${id}`)}
				>
					▲ {voteCount}
				</Button>
			</div>
		</div>
	);
};