import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext
} from '@dnd-kit/sortable';
import { useParams } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Icon } from '@ui/Icon';
import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { AddColumnCard } from '@/Components/AddColumnCard';
import { RoomColumn } from '@/Components/RoomColumn';
import { useGetRoom } from '@/hooks/queries/useGetRoom';
import { addColumnStore } from '@/stores/addColumnStore';
import { roomStore } from '@/stores/roomStore';
import { Column } from '@/types/Column';
import { roomWebSocketClient } from '@/WebSocket/RoomWebSocketClient';

export const RoomPage = () => {
	const { roomId } = useParams({
		from: '/room/$roomId',
	});

	const {
		data: room,
		isLoading,
		error,
	} = useGetRoom({ roomId });

	const isAddingColumn = addColumnStore(
		(state) => state.isAddingColumn
	);

	const toggleIsAddingColumn = addColumnStore(
		(state) => state.toggleIsAddingColumn
	);

	const setRoom = roomStore(
		(state) => state.setRoom
	);

	const session = roomStore(
		(state) => state.session
	);

	const isRoomAdmin = useMemo(
		() => room?.createdBy === session.participantId,
		[room, session]
	);

	const [columns, setColumns] = useState<Column[]>([]);

	useEffect(() => {
		if (!room) {
			return;
		}

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setColumns(
			[...room.columns].sort(
				(a, b) => a.position - b.position
			)
		);
	}, [room]);

	useEffect(() => {
		if (!session.roomId || !session.participantId) {
			return;
		}

		roomWebSocketClient.join({
			roomId: session.roomId,
			participantId: session.participantId,
		});
	}, [
		session.roomId,
		session.participantId,
	]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const handleDragEnd = (
		event: DragEndEvent
	) => {
		const { active, over } = event;

		if (!over || active.id === over.id) {
			return;
		}

		setColumns((currentColumns) => {
			const oldIndex = currentColumns.findIndex(
				(column) => column.id === active.id
			);

			const newIndex = currentColumns.findIndex(
				(column) => column.id === over.id
			);

			const reorderedColumns = arrayMove(
				currentColumns,
				oldIndex,
				newIndex
			);

			// TODO:
			// Send updated positions to backend/websocket
			//
			// roomWebSocketClient.reorderColumns({
			// 	roomId,
			// 	columns: reorderedColumns.map((column, index) => ({
			// 		columnId: column.id,
			// 		position: index,
			// 	})),
			// });

			return reorderedColumns;
		});
	};

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="text-muted-foreground">
					Loading room...
				</div>
			</div>
		);
	}

	if (error || !room) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="text-muted-foreground">
					Unable to load room.
				</div>
			</div>
		);
	}

	setRoom(room);

	return (
		<div className="flex h-full flex-col bg-muted/30">
			<div className="border-b bg-background">
				<div className="flex flex-row justify-between gap-1 px-6 py-4">
					<div>
						<h1 className="text-xl font-semibold">
							{room.name}
						</h1>

						<p className="text-sm text-muted-foreground">
							Sprint Retrospective
						</p>
					</div>

					{
						isRoomAdmin && (
							<Button
								disabled={isAddingColumn}
								onClick={toggleIsAddingColumn}
							>
								<Icon as={Plus} />

								<p className="pl-1">
									Add Column
								</p>
							</Button>
						)
					}
				</div>
			</div>

			<DndContext
				sensors={sensors}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={columns.map(
						(column) => column.id
					)}
					strategy={rectSortingStrategy}
				>
					<div
						className="
							grid
							gap-6
							p-6
							auto-rows-fr
							overflow-x-hidden
						"
						style={{
							gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
						}}
					>
						{
							isRoomAdmin
							&& isAddingColumn && (
								<AddColumnCard />
							)
						}

						{
							columns.map((column) => (
								<RoomColumn
									key={column.id}
									id={column.id}
									title={column.title}
									comments={column.comments}
								/>
							))
						}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};