import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/Dialog';

import { useRemoveColumnMutation } from '@/hooks/mutations/useRemoveColumnMutation';
import { removeColumnStore } from '@/stores/removeColumnStore';
import { roomStore } from '@/stores/roomStore';

export const DeleteColumnDialog = () => {
	const closeDialog = removeColumnStore((state) => state.closeDialog);
	const clearDialog = removeColumnStore((state) => state.clearDialog);
	const isOpen = removeColumnStore((state) => state.isOpen);
	const columnToDelete = removeColumnStore((state) => state.columnToDelete);
	const session = roomStore((state) => state.session);

	const removeColumnMutation = useRemoveColumnMutation({ roomId: session.roomId });

	const handleSubmit = async () => {
		closeDialog();
		await removeColumnMutation.mutateAsync({ columnId: columnToDelete.id });
		// console.log({ columnToDelete });
	};

	return (
		<Dialog
			open={isOpen}
			onClose={closeDialog}
			onExited={clearDialog}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Column?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					This will permanently delete {`"${columnToDelete.title}"`} and all of its comments
				</DialogDescription>
				<DialogFooter className='flex flex-row justify-between mt-4'>
					<Button
						variant='outline'
						onClick={closeDialog}
					>
					Cancel
					</Button>
					<Button
						variant='destructive'
						onClick={handleSubmit}
					>
					Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};