import { useNavigate } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';

import { Routes } from '@/Common/Routes';

export const CreateRoomPage = () => {
	const navigate = useNavigate();
	return (
		<div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-4 gap-4'>
			<Card>
				<CardHeader className='mb-3 px-6'>
					<CardTitle className='text-center text-2xl'>Sprint Retro</CardTitle>
					<CardDescription className='text-center text-sm'>Join a room to participate in your team&apos;s retro.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4'>
						<Input
							label='Room ID'
							placeholder='e.g. sprint-42'
						/>
						<Input
							label='Name'
							placeholder='Lightning McQueen'
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
						onClick={() => console.log('clicked join')}
					>
						Join
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};