import { Button } from '@ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/Card';

import { createRoomStore } from '@/stores/createRoomStore';

export const ConfigureColumnsStep = () => {
	const { previousStep } = createRoomStore((state) => state);
	return (
		<Card>
			<CardHeader className='mb-3 px-6'>
				<CardTitle className='text-center text-xl'>Configure Columns</CardTitle>
				<CardDescription className='text-center text-sm'>
						Configure retro columns
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-4'>
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<Button
					variant='outline'
					onClick={previousStep}
				>
						Back
				</Button>
				<Button
					onClick={() => console.log('next')}
				>
						Next
				</Button>
			</CardFooter>
		</Card>
	);
};