import { Loader2 } from 'lucide-react';

import { Button } from '../ui/button';

export default function StepControl({
  isTest,
  continueDisabled,
  checkAnswerDisabled,
  isSubmitting,
  onContinue,
  checkAnswer,
}: {
  isTest?: boolean;
  continueDisabled: boolean;
  isSubmitting: boolean;
  checkAnswerDisabled?: boolean;
  onContinue: () => void;
  checkAnswer?: () => {};
}) {
  return (
    <div className="flex items-center justify-end gap-8 p-6">
      {isTest && (
        <>
          {continueDisabled && (
            <Button disabled={checkAnswerDisabled || isSubmitting} onClick={checkAnswer}>
              {isSubmitting && <Loader2 className="animate-spin w-4 mr-2" />}
              Check Answer
            </Button>
          )}
          {!continueDisabled && <Button onClick={onContinue}>Continue</Button>}
        </>
      )}
      {!isTest && (
        <Button disabled={continueDisabled || isSubmitting} onClick={onContinue}>
          {isSubmitting && <Loader2 className="animate-spin w-4 mr-2" />}
          Continue
        </Button>
      )}
    </div>
  );
}
