import { Icon } from '@ui/Icon';
import { GripVertical, Trash } from 'lucide-react';
import { useMemo } from 'react';

import { ColumnTitle } from '@/Components/RoomColumn/ColumnTitle';
import { removeColumnStore } from '@/stores/removeColumnStore';
import { roomStore } from '@/stores/roomStore';

interface ColumnHeaderProps {
	id: string;
	title: string;
	commentCount: number;
	dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const ColumnHeader = ({ id, title, commentCount, dragHandleProps }: ColumnHeaderProps) => {
	const setColumnToDelete = removeColumnStore((state) => state.setColumnToDelete);
	const openDeleteColumnDialog = removeColumnStore((state) => state.openDialog);
	const room = roomStore((state) => state.room);
	const session = roomStore((state) => state.session);
	const isRoomAdmin = useMemo(() => room.createdBy === session.participantId, [room, session]);

	return (
		<div className="border-b px-4 py-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 justify-between w-full">
					<div className='flex flex-row gap-2 items-center'>
						<div
							{...dragHandleProps}
							className="
								cursor-grab
								active:cursor-grabbing
							"
						>
							<Icon
								as={GripVertical}
								className="text-muted-foreground"
							/>
						</div>

						{
							isRoomAdmin
								? <ColumnTitle columnId={id} title={title} />
								: <p>{title}</p>
						}

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
							{commentCount}
						</div>
					</div>

					<div>
						<button
							className='p-1 rounded-md hover:bg-muted hover:cursor-pointer'
							onClick={() => {
								openDeleteColumnDialog();
								setColumnToDelete({ id, title });
							}}
						>
							<Icon
								as={Trash}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};