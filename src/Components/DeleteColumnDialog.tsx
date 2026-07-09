import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/Dialog';

import { deleteColumnStore } from '@/stores/deleteColumnStore';

export const DeleteColumnDialog = () => {
	const closeDialog = deleteColumnStore((state) => state.closeDialog);
	const clearDialog = deleteColumnStore((state) => state.clearDialog);
	const isOpen = deleteColumnStore((state) => state.isOpen);
	const columnToDelete = deleteColumnStore((state) => state.columnToDelete);

	const handleSubmit = () => {
		closeDialog();
		console.log({ columnToDelete });
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