import { useNavigate } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';
import { useMemo } from 'react';

import { Routes } from '@/Common/Routes';
import { ClassicTemplate } from '@/Common/Templates/ClassicTemplate';
import { EmptyTemplate } from '@/Common/Templates/EmptyTemplate';
import { FourLsTemplate } from '@/Common/Templates/FourLsTemplate';
import { MadSadGladTemplate } from '@/Common/Templates/MadSadGladTemplate';
import { TemplateCard } from '@/Components/TemplateCard';
import { useCreateRoomMutation } from '@/hooks/mutations/useCreateRoomMutation';
import { createRoomStore } from '@/stores/createRoomStore';

const RetroTemplates = Object.freeze([
	EmptyTemplate,
	ClassicTemplate,
	FourLsTemplate,
	MadSadGladTemplate,
]);

export const CreateRoomPage = () => {
	const navigate = useNavigate();
	const selectTemplate = createRoomStore((state) => state.selectTemplate);
	const selectedTemplateId = createRoomStore((state) => state.templateId);
	const updateCreateRoomStore = createRoomStore((state) => state.updateCreateRoomStore);
	const roomName = createRoomStore((state) => state.roomName);
	const participantName = createRoomStore((state) => state.participantName);

	const isCreateButtonDisabled = useMemo(() => !roomName || !participantName, [roomName, participantName]);
	const createRoomMutation = useCreateRoomMutation();
	const roomColumns = createRoomStore((state) => state.columns);
	const handleSubmit = async () => {
		const room = await createRoomMutation.mutateAsync({
			name: roomName,
			participantName,
			columns: roomColumns,
		});

		navigate({ to: `${Routes.ROOM}/$roomId`, params: { roomId: room.id } });
	};
	return (
		<div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-4 gap-4'>
			<Card>
				<CardHeader className='mb-3 px-6'>
					<CardTitle className='text-center text-2xl'>Create Retro Board</CardTitle>
					<CardDescription className='text-center text-sm'>Create your retro board</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-4'>
							<Input
								label='Room Name'
								placeholder='e.g. sprint-42'
								value={roomName}
								onChange={(e) => updateCreateRoomStore({ roomName: e.target.value })}
							/>
							<Input
								label='Your Name'
								placeholder='Lightning McQueen'
								value={participantName}
								onChange={(e) => updateCreateRoomStore({ participantName: e.target.value })}
							/>
						</div>
						<div className='flex flex-col gap-4'>
							<p>Template</p>
							{
								RetroTemplates.map((template) => (
									<TemplateCard
										key={template.id}
										template={template}
										selected={template.id === selectedTemplateId}
										onSelect={() => selectTemplate(template)}
									/>
								))
							}
						</div>
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
						disabled={isCreateButtonDisabled}
						onClick={handleSubmit}
					>
						Create
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};