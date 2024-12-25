import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { useToast } from '@/hooks/use-toast';
import { MatcherItem } from '@/components/MatcherItem';
import AudioPlayer from '@/components/lesson/AudioPlayer';
import StepControl from '@/components/lesson/StepControl';
import { useCompleteLessonMutation } from '@/state/services/course';

interface LessonItemI {
  data: any;
}

const LessonItem = ({ data }: LessonItemI) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const { lessonId, unitId, courseId, totalSteps } = useParams();
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [completeLesson, { isLoading: isSubmitting }] = useCompleteLessonMutation();

  let wordCount = 0;
  const currentSecond = currentTime.toFixed(1);

  const executeOnEnd = () => {
    setContinueDisabled(false);
  };

  async function onSubmit() {
    try {
      if (!data!.is_completed) await completeLesson(`${lessonId}`);
      navigate(`/app/learn/course/${courseId}/unit/${unitId}/lesson/${lessonId}/totalSteps/${totalSteps}/step/1`);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <>
      <div className="p-2 rounded-md border border-input shadow-md">
        <div className="abyssinica-sil-regular relative w-full rounded-sm border-2 border-primary">
          <div className={`absolute z-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-20`}>
            <img src={logo} className="h-40" alt="" />
          </div>

          <div className={`z-10 p-5 rounded-sm`}>
            {data.lesson_body.content.split('\n').map((line: string, lIdx: number) => {
              const words = line.split(' ');

              return (
                <div key={lIdx} className="flex items-end mb-0 gap-2 overflow-hidden">
                  {words.map((word, wIdx) => {
                    const chars = word.split('');

                    return (
                      <div
                        key={wIdx}
                        className={`flex gap-0.5 items-end ${
                          data.lesson_body.timeState[wordCount++] < currentSecond ? 'text-primary animate-pulseYellow' : ''
                        }`}
                      >
                        {chars.map((char, cIdx) => {
                          return <MatcherItem key={cIdx} char={char} state={data.lesson_body.state!} idx={`${lIdx}:${wIdx}:${cIdx}:${char}`} />;
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AudioPlayer audio={data.lesson_audio} currentTime={currentTime} setCurrentTime={setCurrentTime} executeOnEnd={executeOnEnd} />
      <StepControl continueDisabled={!data.is_completed && continueDisabled} onContinue={onSubmit} isSubmitting={isSubmitting} />
    </>
  );
};

export default LessonItem;
