import { Stepper } from '@ui/Stepper';

import { CreateRoomSteps } from '@/Common/CreateRoomSteps';
import { ConfigureColumnsStep } from '@/Components/Steps/ConfigureColumnsStep';
import { RoomDetailsStep } from '@/Components/Steps/RoomDetailsStep';
import { createRoomStore } from '@/stores/createRoomStore';

const StepOrder = Object.freeze([
	CreateRoomSteps.ROOM_DETAILS,
	CreateRoomSteps.COLUMNS,
]);

const StepLabels = {
	[CreateRoomSteps.ROOM_DETAILS]: 'Room Details',
	[CreateRoomSteps.COLUMNS]: 'Columns',
};

export const CreateRoomPage = () => {
	const step = createRoomStore((state) => state.step);
	const setStep = createRoomStore((state) => state.setStep);
	const currentStepIndex = StepOrder.indexOf(step);
	return (
		<div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-4 gap-4'>
			<Stepper
				currentStep={currentStepIndex}
				onStepChange={(index) => setStep(StepOrder[index])}
			>
				{StepOrder.map((stepKey) => (
					<Stepper.Step
						key={stepKey}
						title={StepLabels[stepKey]}
					/>
				))}
			</Stepper>

			<div>
				{step === CreateRoomSteps.ROOM_DETAILS && <RoomDetailsStep />}
				{step === CreateRoomSteps.COLUMNS && <ConfigureColumnsStep />}
			</div>
		</div>
	);
};