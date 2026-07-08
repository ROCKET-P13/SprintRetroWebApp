import { Button } from '@ui/Button';
import { Icon } from '@ui/Icon';
import _ from 'lodash';
import { Heart } from 'lucide-react';
import { useMemo } from 'react';

import { useAddVoteMutation } from '@/hooks/mutations/useAddVoteMutation';
import { useRemoveVoteMutation } from '@/hooks/mutations/useRemoveVoteMutation';
import { roomStore } from '@/stores/roomStore';

interface CommentCardProps {
	id: string;
	body: string;
	votes: Array<{
		id: string;
		participantName: string;
	}>
	createdBy: string;
}

export const CommentCard = ({ id, body, votes = [], createdBy }: CommentCardProps) => {
	const session = roomStore((state) => state.session);
	const participantHasAlreadyVoted = useMemo(
		() => _.some(votes, (vote) => vote.participantName == session.participantName),
		[votes, session]
	);

	const addVoteMutation = useAddVoteMutation({
		roomId: session.roomId,
		participantId: session.participantId,
	});

	const removeVoteMutation = useRemoveVoteMutation({ roomId: session.roomId });

	const handleAddVote = async () => {
		await addVoteMutation.mutateAsync({
			commentId: id,
			participantName: session.participantName,
		});
	};

	const handleRemoveVote = async () => {
		const voteId = _.chain(votes).find((vote) => vote.participantName == session.participantName).get('id').value();
		console.log({ voteId });
		await removeVoteMutation.mutateAsync({
			commentId: id,
			voteId: _.chain(votes).find((vote) => vote.participantName == session.participantName).get('id').value(),
		});
	};

	return (
		<div className="group rounded-lg border bg-accent p-3">
			<p className="text-sm leading-relaxed wrap-break-word">
				{body}
			</p>

			<div className="mt-4 flex items-center justify-between">
				<span className="text-xs text-muted-foreground">
					{createdBy}
				</span>
				<Button
					variant='outline'
					size='sm'
					onClick={participantHasAlreadyVoted ? handleRemoveVote : handleAddVote}
					// disabled={participantHasAlreadyVoted}
					className={participantHasAlreadyVoted ? 'bg-primary text-white hover:bg-primary' : ''}
				>
					<Icon
						as={Heart}
						className='mr-1'
						fill={participantHasAlreadyVoted ? 'currentColor' : 'none'}
					/>
					{votes.length}
				</Button>
			</div>
		</div>
	);
};