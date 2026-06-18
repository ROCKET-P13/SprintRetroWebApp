import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import { RoomColumn } from '@/Components/RoomColumn';
import { useGetRoom } from '@/hooks/queries/useGetRoom';
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

	const setRoom = roomStore((state) => state.setRoom);
	const session = roomStore((state) => state.session);

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

	const columns = [...(room.columns ?? [])].sort(
		(a, b) => a.position - b.position
	);

	return (
		<div className="flex h-full flex-col bg-muted/30">
			<header className="border-b bg-background">
				<div className="px-6 py-4">
					<h1 className="text-xl font-semibold">
						{room.name}
					</h1>

					<p className="mt-1 text-sm text-muted-foreground">
						Sprint Retrospective
					</p>
				</div>
			</header>

			<div className="
				grid
				grid-cols-1
				gap-6
				p-6
				md:grid-cols-2
				lg:grid-cols-4
			">
				{columns.map((column) => (
					<RoomColumn
						key={column.id}
						id={column.id}
						title={column.title}
						comments={column.comments}
					/>
				))}
			</div>

		</div>
	);
};