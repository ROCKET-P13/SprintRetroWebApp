import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
	RoomColumn,
	RoomColumnProps
} from './RoomColumn';

export const SortableRoomColumn = (
	props: RoomColumnProps
) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: props.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={
				isDragging
					? 'opacity-0'
					: undefined
			}
		>
			<RoomColumn
				{...props}
				dragHandleProps={{
					...attributes,
					...listeners,
				}}
			/>
		</div>
	);
};