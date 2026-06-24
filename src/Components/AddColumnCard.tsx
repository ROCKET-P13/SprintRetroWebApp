import { Button } from '@ui/Button';
import { Input } from '@ui/Input';
import _ from 'lodash';

import { useAddColumnMutation } from '@/hooks/mutations/useAddColumnMutation';
import { addColumnStore } from '@/stores/addColumnStore';
import { roomStore } from '@/stores/roomStore';

export const AddColumnCard = () => {
	const session = roomStore((state) => state.session);
	const title = addColumnStore((state) => state.title);
	const setTitle = addColumnStore((state) => state.setTitle);
	const addColumnMutation = useAddColumnMutation({ roomId: session.roomId });
	const isAddingColumn = addColumnStore((state) => state.isAddingColumn);

	const toggleIsAddingColumn = addColumnStore((state) => state.toggleIsAddingColumn);

	if (!isAddingColumn) {
		return;
	}

	const handleSubmit = async () => {
		if (!title) {
			return;
		}
		setTitle('');

		await addColumnMutation.mutateAsync({ title: title });
	};

	return (
		<div className="h-125 rounded-xl border bg-card p-4 flex flex-col">
			<div>
				<h2 className='font-semibold mb-4 tracking-light'>Add Column</h2>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Column title...'
				/>
			</div>

			<div className="mt-4 flex flex-row gap-2">
				<Button
					variant="secondary"
					onClick={() => {
						toggleIsAddingColumn();
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