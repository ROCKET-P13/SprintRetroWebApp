import { Button } from '@ui/Button';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const AddCommentBox = () => {
	const [newComment, setNewComment] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const composerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!composerRef.current || composerRef.current.contains(event.target as Node) || newComment.trim()) {
				return;
			}
			// if (composerRef.current && !composerRef.current.contains(event.target as Node) && !newComment.trim()) {
			setIsFocused(false);
			// }
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener(
				'mousedown',
				handleClickOutside
			);
		};
	}, [newComment]);

	const handleSubmit = () => {
		console.log('submitted comment');
		setNewComment('');
		setIsFocused(false);
	};

	const handleCancel = () => {
		console.log('cancelled comment');
		setNewComment('');
		setIsFocused(false);
	};

	return (
		<div className="border-t p-4">
			<div
				ref={composerRef}
				className="
						rounded-lg
						border
						bg-background
						p-3
					"
			>
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					onFocus={() => setIsFocused(true)}
					placeholder="Write your comment..."
					className={`
						w-full
						resize-none
						bg-transparent
						transition-[height]
						duration-200
						ease-out
						p-2
						overflow-hidden
						focus:outline-none
						focus:ring-0
						focus:border-transparent
						${isFocused ? 'h-28' : 'h-10'}
					`}
				/>
				{
					isFocused && (
						<div className="mt-3 flex justify-between gap-2">
							<Button
								variant="outline"
								onClick={handleCancel}
							>
								Cancel
							</Button>

							<Button
								onClick={handleSubmit}
								disabled={!newComment.trim()}
							>
								<Send className="mr-2 size-4" />
									Add
							</Button>
						</div>
					)
				}
			</div>
		</div>
	);
};