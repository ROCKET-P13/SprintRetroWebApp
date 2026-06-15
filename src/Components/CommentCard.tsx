// import { ArrowUp } from 'lucide-react';

interface CommentCardProps {
	body: string;
	voteCount: number;
	createdBy: string;
}

export const CommentCard = ({ body, voteCount, createdBy }: CommentCardProps) => {
	return (
		<div
			className="
				group
				rounded-lg
				border
				bg-background
				p-3
				transition-all
				duration-200
				hover:border-primary/20
				hover:shadow-md
			"
		>
			<p className="text-sm leading-relaxed">
				{body}
			</p>

			<div className="mt-4 flex items-center justify-between">
				<span className="text-xs text-muted-foreground">
					{createdBy}
				</span>

				<button
					className="
						flex
						items-center
						gap-1
						rounded-md
						border
						px-2
						py-1
						text-xs
						font-medium
						transition-colors
						hover:bg-accent
					"
				>
					▲ {voteCount}
				</button>
			</div>
		</div>
	);
};