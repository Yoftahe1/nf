import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

function UnitItem({
  lessonTitle,
  unitId,
  lessonId,
  step,
  isLocked,
  totalSteps,
}: {
  lessonTitle: string;
  unitId: string;
  lessonId: string;
  isLocked: boolean;
  step: number;
  totalSteps: number;
}) {
  const navigate = useNavigate();
  function handleNavigation() {
    if (!isLocked) navigate(`unit/${unitId}/lesson/${lessonId}/totalSteps/${totalSteps}/step/${step === totalSteps ? 0 : step}`);
  }
  return (
    <div
      className={cn(
        'relative flex items-center justify-center border border-primary/40 rounded-sm h-24 hover:bg-background/50 hover:cursor-pointer hover:border-primary transition-all',
        totalSteps === step && 'border-green-500',
        isLocked && 'opacity-20 hover:bg-background/50 hover:cursor-default hover:border-primary/40',
      )}
      onClick={handleNavigation}
    >
      {lessonTitle}
      <p className="absolute bottom-1 right-2 text-muted-foreground text-xs">
        {step}/{totalSteps}
      </p>
    </div>
  );
}

export default UnitItem;
