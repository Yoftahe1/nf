import { ArrowLeft, Loader2 } from 'lucide-react';

import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCompleteUnitMutation } from '@/state/services/course';

function UnitHeader({ unitNumber, unitTitle, unitId }: { unitNumber: number; unitTitle: string; unitId: string }) {
  const [completeLesson, { isLoading }] = useCompleteUnitMutation();
  const { toast } = useToast();

  async function complete() {
    try {
      await completeLesson({ unitId }).unwrap();
      toast({
        title: 'Request successful!',
        description: 'Request has been sent successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong',
        description: error.data.error || 'An unexpected error occurred. Please try again.',
      });
    }
  }
  return (
    <div className="bg-primary p-4 rounded-lg flex justify-between">
      <div>
        <div className="flex gap-4 items-center">
          <ArrowLeft className="h-5 w-5" />
          <p>Unit {unitNumber}</p>
        </div>

        <h3 className="font-bold text-xl">{unitTitle}</h3>
      </div>
      <Button onClick={complete} className="border border-input" disabled={isLoading}>
        {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
        Request test
      </Button>
    </div>
  );
}
export default UnitHeader;
