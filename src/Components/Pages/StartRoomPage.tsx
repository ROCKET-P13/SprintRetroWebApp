import { useNavigate } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';

import { Routes } from '@/Common/Routes';

export const StartRoomPage = () => {
	const navigate = useNavigate();
	return (
		<div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-4'>
			<Card>
				<CardHeader className='mb-3 px-6'>
					<CardTitle className='text-center text-2xl'>Sprint Retro</CardTitle>
					<CardDescription className='text-center text-sm'>
						Create a retro board room and share the room details with your team
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4'>
						<Input
							label='Display Name'
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
						onClick={() => console.log('clicked next')}
					>
						Next
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};