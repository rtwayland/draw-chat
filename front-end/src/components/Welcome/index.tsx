import { useState } from 'react';
import Join from './Join';
import Start from './Start';

type Step = 'join' | 'create' | null;

const Welcome = () => {
	const [step, setStep] = useState<Step>(null);

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-4">
			<div className="text-lg">Welcome to Story Chat!</div>
			{!step && (
				<div className="flex items-center gap-4">
					<button
						className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
						onClick={() => setStep('join')}
					>
						Join Friends
					</button>
					<div>Or</div>
					<button
						className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
						onClick={() => setStep('create')}
					>
						Start a Story
					</button>
				</div>
			)}
			{step === 'join' && <Join back={() => setStep(null)} />}
			{step === 'create' && <Start back={() => setStep(null)} />}
		</div>
	);
};

export default Welcome;
