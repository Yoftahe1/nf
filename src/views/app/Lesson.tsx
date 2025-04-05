import { useEffect } from 'react';
import { Frown, Smile } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import LessonItem from '@/components/lesson/LessonItem';
import StepCounter from '@/components/lesson/StepCounter';
import { useGetLessonQuery } from '@/state/services/course';
import TextQuestion from '@/components/lesson/TextQuestion';
import AudioQuestion from '@/components/lesson/AudioQuestion';
import Question from '@/components/lesson/Question';
import { date } from 'zod';

const Lesson = () => {
  const { toast } = useToast();
  const { courseId, lessonId, stepNo, totalSteps } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetLessonQuery({ lessonId: `${lessonId}`, stepNo: `${stepNo}` });

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Fetch lesson failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }, [isError, toast]);

  return (
    <div className="h-full flex flex-col gap-8">
      {isSuccess && (
        <>
          {!data.isEnd && (
            <>
              <StepCounter step={Number(stepNo)} totalSteps={Number(totalSteps)} />
              {/* {data.isTest && data.type === 'audioQuestion' && <AudioQuestion data={data}/>} */}
              {/* {data.isTest && (data.type === 'fill'||data.type === 'spelling') && <TextQuestion data={data} />} */}
              {data.isTest && (data.type === 'fill' || data.type === 'spelling') && (
                <Question id={data.id} difficulty={data.difficulty} content={data.content} state={data.state} position={data.position} type={data.type} options={data.options}/>
              )}
              {!data.isTest && <LessonItem data={data} />}
            </>
          )}
          {data.isEnd && (
            <div className="flex flex-col items-center justify-center gap-6 h-full">
              <Smile size={150} color="green" />
              <h4 className="text-2xl">Congratulations on completing the lesson.</h4>
              <p className="text-md text-muted-foreground">Why stop now? Keep learning.</p>
              <Button
                onClick={() => {
                  navigate(`/app/learn/course/${courseId}`);
                }}
              >
                Go to lessons
              </Button>
            </div>
          )}
        </>
      )}
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <img src={logo} className="w-[300px] animate-pulse-custom" />
        </div>
      )}
      {isError && (
        <div className="h-full flex flex-col justify-center items-center gap-6 ">
          <Frown size={150} color="#fbbf24" />
          <h4 className="text-2xl">The resource requested could not be found.</h4>
          <p className="text-md text-muted-foreground">Try another resource.</p>
        </div>
      )}
    </div>
  );
};

export default Lesson;
