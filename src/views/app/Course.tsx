import { useEffect } from 'react';
import { Frown } from 'lucide-react';
import { useParams } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { useToast } from '@/hooks/use-toast';
import UnitItem from '@/components/course/UnitItem';
import UnitHeader from '@/components/course/UnitHeader';
import { useGetUnitsQuery } from '@/state/services/course';

export default function Course() {
  const { toast } = useToast();
  const { id: courseId } = useParams();
  const { data, isError, isLoading, isSuccess } = useGetUnitsQuery(`${courseId}`);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Fetching units failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }, [isError, toast]);

  return (
    <div className="h-full">
      {isSuccess &&
        data &&
        data.map(({ unit_id, unit_no, unit_title, lessons }) => (
          <div key={unit_id}>
            <UnitHeader unitNumber={unit_no} unitTitle={unit_title} unitId={unit_id} />

            <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {lessons &&
                lessons.map(({ id, lesson_title, step, total_step, isLocked }) => (
                  <UnitItem
                    key={id}
                    isLocked={isLocked}
                    lessonTitle={lesson_title}
                    unitId={id}
                    lessonId={id}
                    step={step || 0}
                    totalSteps={total_step}
                  />
                ))}
            </div>
            {(!lessons || lessons.length === 0) && <p className="text-center">No lessons found</p>}
          </div>
        ))}
      {isSuccess && !data && (
        <div className="h-full flex flex-col justify-center items-center gap-6 ">
          <Frown size={150} color="#fbbf24" />
          <h4 className="text-2xl">No lessons found for the course.</h4>
          <p className="text-md text-muted-foreground">Try another course.</p>
        </div>
      )}
      {isError && (
        <div className="h-full flex flex-col justify-center items-center gap-6 ">
          <Frown size={150} color="#fbbf24" />
          <h4 className="text-2xl">The resource requested could not be found.</h4>
          <p className="text-md text-muted-foreground">Try another resource.</p>
        </div>
      )}
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <img src={logo} className="w-[300px] animate-pulse-custom" />
        </div>
      )}
    </div>
  );
}


