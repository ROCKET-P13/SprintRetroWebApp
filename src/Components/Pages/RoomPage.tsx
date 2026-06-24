import { useParams } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Icon } from '@ui/Icon';
import { Plus } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { AddColumnCard } from '@/Components/AddColumnCard';
import { RoomColumn } from '@/Components/RoomColumn';
import { useGetRoom } from '@/hooks/queries/useGetRoom';
import { addColumnStore } from '@/stores/addColumnStore';
import { roomStore } from '@/stores/roomStore';
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
	const isAddingColumn = addColumnStore((state) => state.isAddingColumn);
	const toggleIsAddingColumn = addColumnStore((state) => state.toggleIsAddingColumn);
	const setRoom = roomStore((state) => state.setRoom);
	const session = roomStore((state) => state.session);
	const isRoomAdmin = useMemo(() => room?.createdBy === session.participantId, [room, session]);

	useEffect(() => {
		if (!session.roomId || !session.participantId) {
			return;
		}

		roomWebSocketClient.join({
			roomId: session.roomId,
			participantId: session.participantId,
		});
	}, [session.roomId, session.participantId]);

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

	const columns = room.columns.sort((a, b) => a.position - b.position);

	return (
		<div className="flex h-full flex-col bg-muted/30">
			<div className="border-b bg-background">
				<div className="px-6 py-4 flex flex-row gap-1 justify-between">
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
							<Button disabled={isAddingColumn} onClick={toggleIsAddingColumn}>
								<Icon as={Plus}/>
								<p className='pl-1'>Add Column</p>
							</Button>
						)
					}
				</div>
			</div>

			<div className="
				grid
				grid-cols-1
				gap-6
				p-6
				md:grid-cols-2
				lg:grid-cols-4
			">
				{
					isRoomAdmin && isAddingColumn && (
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
		</div>
	);
};