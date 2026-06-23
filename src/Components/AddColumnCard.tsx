import { Button } from '@ui/Button';
import { Input } from '@ui/Input';
import _ from 'lodash';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useAddColumnMutation } from '@/hooks/mutations/useAddColumnMutation';
import { roomStore } from '@/stores/roomStore';

export const AddColumnCard = () => {
	const [adding, setAdding] = useState(false);
	const [title, setTitle] = useState('');
	const session = roomStore((state) => state.session);
	const addColumnMutation = useAddColumnMutation({ roomId: session.roomId });

	const handleSubmit = async () => {
		if (!title) {
			return;
		}
		setTitle('');
		setAdding(false);

		await addColumnMutation.mutateAsync({ title: title });
	};

	if (!adding) {
		return (
			<button
				onClick={() => setAdding(true)}
				className="
					h-125
					w-full
					rounded-xl
					border-2
					border-dashed
					border-border
					bg-card
					text-muted-foreground
					transition-all
					hover:border-primary
					hover:text-primary
					hover:cursor-pointer
				"
			>
				<div className="flex flex-col items-center gap-3">
					<Plus className="size-8" />

					<span className="font-medium">
						Add Column
					</span>
				</div>
			</button>
		);
	}

	return (
		<div className="h-125 rounded-xl border bg-card p-4">
			<Input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Column title...'
			/>

			<div className="mt-4 flex gap-2">
				<Button
					variant="secondary"
					onClick={() => {
						setAdding(false);
						setTitle('');
					}}
				>
					Cancel
				</Button>
				<Button
					className="flex-1"
					disabled={_.isEmpty(title)}
					onClick={handleSubmit}
				>
					Create
				</Button>

			</div>
		</div>
	);
};