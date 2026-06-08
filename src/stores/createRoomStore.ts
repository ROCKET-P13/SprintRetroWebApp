import _ from 'lodash';
import { create } from 'zustand';

import { CreateRoomSteps } from '@/Common/CreateRoomSteps';

type StepType = typeof CreateRoomSteps[keyof typeof CreateRoomSteps];
interface CreateRoomStore {
	step: StepType;
	roomName: string;
	participantName: string;
	columns: Array<{
		title: string;
		position?: number;
	}>
	setStep: (step: StepType) => void;
	nextStep: () => void;
	previousStep: () => void;
	updateCreateRoomStore: (data: Partial<CreateRoomStore>) => void;
}

export const createRoomStore = create<CreateRoomStore>((set, get) => ({
	step: CreateRoomSteps.ROOM_DETAILS,
	roomName: '',
	participantName: '',
	columns: [],
	setStep: (step) => {
		set({ step: step });
	},
	nextStep: () => {
		const steps = _.values(CreateRoomSteps);
		const currentStep = get().step;
		const nextStepIndex = _.findIndex(steps, (step) => step === currentStep) + 1;

		if (steps[nextStepIndex]) {
			set({ step: steps[nextStepIndex] });
		}
	},
	previousStep: () => {
		const steps = _.values(CreateRoomSteps);
		const currentStep = get().step;
		const previousStepIndex = _.findIndex(steps, (step) => step === currentStep) - 1;
		if (steps[previousStepIndex]) {
			set({ step: steps[previousStepIndex] });
		}
	},
	updateCreateRoomStore: (data) => {
		set((state) => ({
			...state,
			...data,
		}));
	},
}));