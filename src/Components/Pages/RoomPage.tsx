import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
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
import _ from 'lodash';
import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { AddColumnCard } from '@/Components/AddColumnCard';
import { DeleteColumnDialog } from '@/Components/DeleteColumnDialog';
import { RoomColumn } from '@/Components/RoomColumn/RoomColumn';
import { SortableRoomColumn } from '@/Components/SortableRoomColumn';
import { useUpdateColumnPositionsMutation } from '@/hooks/mutations/useUpdateColumnPositionsMutation';
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
		data,
		isLoading,
		error,
	} = useGetRoom({ roomId });

	const setRoom = roomStore((state) => state.setRoom);
	useEffect(() => {
		if (!data) {
			return;
		}

		setRoom(data);
	}, [data, setRoom]);

	const room = roomStore((state) => state.room);
	const setRoomColumns = roomStore((state) => state.setRoomColumns);
	const session = roomStore((state) => state.session);

	const isAddingColumn = addColumnStore((state) => state.isAddingColumn);
	const toggleIsAddingColumn = addColumnStore((state) => state.toggleIsAddingColumn);

	const isRoomAdmin = useMemo(() => room.createdBy === session.participantId, [room, session]);
	const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	const updateColumnPositionsMutation = useUpdateColumnPositionsMutation({ roomId });
	const columns = room.columns;

	useEffect(() => {
		if (!session.roomId || !session.participantId) {
			return;
		}

		roomWebSocketClient.join({
			roomId: session.roomId,
			participantId: session.participantId,
		});
	}, [session.roomId, session.participantId]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

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

	const handleDragStart = (event: DragStartEvent) => {
		const column = _.find(columns, (column) => column.id === event.active.id);
		if (!column) {
			return;
		}

		setActiveColumn(column);
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		setActiveColumn(null);

		if (!over || active.id === over.id) {
			return;
		}

		const oldIndex = columns.findIndex((column) => column.id === active.id);
		const newIndex = columns.findIndex((column) => column.id === over.id);

		const reordered = arrayMove(columns, oldIndex, newIndex);
		setRoomColumns(reordered);

		await updateColumnPositionsMutation.mutateAsync({
			columns: _.reduce(reordered, (result: Array<{ id: string; position: number; }>, column, index) => {
				if (column.position === index + 1) {
					return result;
				}

				result.push({
					id: column.id,
					position: index + 1,
				});

				return result;
			}, []),
		});
	};

	return (
		<div className="flex h-full flex-col bg-muted/30 overflow-x-hidden">
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
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={() => setActiveColumn(null)}
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
							grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
							transition-all
							duration-300
						"
					>
						{
							isRoomAdmin
							&& isAddingColumn && (
								<AddColumnCard />
							)
						}

						{
							_.map(columns, (column) => (
								<SortableRoomColumn
									key={column.id}
									id={column.id}
									title={column.title}
									comments={column.comments}
								/>
							))
						}
					</div>
				</SortableContext>

				<DragOverlay>
					{
						activeColumn && (
							<RoomColumn
								id={activeColumn.id}
								title={activeColumn.title}
								comments={activeColumn.comments}
							/>
						)
					}
				</DragOverlay>
			</DndContext>

			{
				isRoomAdmin && (
					<DeleteColumnDialog />
				)
			}
		</div>
	);
};