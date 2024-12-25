import { X } from 'lucide-react';

export default function StepCounter({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="text-gray-700 flex gap-4 items-center">
      <X />

      <div className="h-4 w-full bg-gray-700 rounded-full">
        <div className="h-full bg-primary rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>

      <p >
        {step}/{totalSteps}
      </p>
    </div>
  );
}
