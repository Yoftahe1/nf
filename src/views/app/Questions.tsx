import { useEffect } from 'react';
import { Frown } from 'lucide-react';

import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';
import { toast } from '@/hooks/use-toast';
import { useGetTestsQuery } from '@/state/services/course';

const Questions = () => {
  const { data, isLoading, isSuccess, isError } = useGetTestsQuery(null);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Fetch courses failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }, [isError, toast]);

  return (
    <div className="flex flex-col gap-8 h-full">
      {isSuccess &&
        data.map((lesson, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-lg">{lesson.lesson_title}</p>
              <p className="text-xs text-gray-500">5/10</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
              {lesson.tests.map((question, index) => (
                <Question key={index} questionNo={index} isCompleted={question.is_answered} />
              ))}
            </div>
          </div>
        ))}
      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <img src={logo} className="w-[300px] animate-pulse-custom" />
        </div>
      )}
      {(isError || (isSuccess && data.length === 0)) && (
        <div className="h-full flex flex-col justify-center items-center gap-6 ">
          <Frown size={150} color="#fbbf24" />
          <h4 className="text-2xl">The resource requested could not be found.</h4>
          <p className="text-md text-muted-foreground">Try another resource.</p>
        </div>
      )}
    </div>
  );
};

interface QuestionI {
  isCompleted: boolean;
  questionNo: number;
}
function Question({ isCompleted, questionNo }: QuestionI) {
  return (
    <div
      className={cn(
        'border border-input p-4 rounded-3xl hover:bg-background/50 hover:cursor-pointer hover:border-primary transition-all',
        isCompleted && 'border-green-500 text-green-500',
      )}
    >
      Question {questionNo + 1}
    </div>
  );
}

export default Questions;
