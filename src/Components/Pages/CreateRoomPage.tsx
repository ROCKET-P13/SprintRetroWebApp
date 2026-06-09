import { useNavigate } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';
import { useState } from 'react';

import { Routes } from '@/Common/Routes';
import { RetroTemplates } from '@/Common/Templates';
import { TemplateCard } from '@/Components/TemplateCard';

export const CreateRoomPage = () => {
	const navigate = useNavigate();
	const [selectedTemplateId, setSelectedTemplateId] = useState(RetroTemplates[0].id);

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
							/>
							<Input
								label='Your Name'
								placeholder='Lightning McQueen'
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
										onSelect={() => setSelectedTemplateId(template.id)}
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
						onClick={() => console.log('clicked join')}
					>
						Join
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};