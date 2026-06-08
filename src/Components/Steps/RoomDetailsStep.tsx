import { useNavigate } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';

import { Routes } from '@/Common/Routes';
import { createRoomStore } from '@/stores/createRoomStore';

export const RoomDetailsStep = () => {
	const navigate = useNavigate();

	const { roomName, participantName, updateCreateRoomStore, nextStep } = createRoomStore((state) => state);
	return (
		<Card>
			<CardHeader className='mb-3 px-6'>
				<CardTitle className='text-center text-xl'>Room Details</CardTitle>
				<CardDescription className='text-center text-sm'>
						Create a retro board room and share the room details with your team
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-4'>
					<Input
						label='Room Name'
						placeholder='Sprint 42'
						value={roomName}
						onChange={(e) => {
							updateCreateRoomStore({ roomName: e.target.value });
						}}
					/>
					<Input
						label='Your Name'
						placeholder='Lightning McQueen'
						value={participantName}
						onChange={(e) => {
							updateCreateRoomStore({ participantName: e.target.value });
						}}
					/>
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<Button
					variant='outline'
					onClick={() => navigate({ to: Routes.HOME })}
				>
						Back
				</Button>
				<Button
					onClick={nextStep}
				>
						Next
				</Button>
			</CardFooter>
		</Card>
	);
};