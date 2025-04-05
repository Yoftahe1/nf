import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Matcher from './Matcher';
import AudioPlayer from './AudioPlayer';
import StepControl from './StepControl';
import { useToast } from '@/hooks/use-toast';
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

  const currentSecond = parseFloat(currentTime.toFixed(1));

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
      <div className="rounded-md border border-primary">
        <Matcher content={data.content} state={data.state} currentSecond={currentSecond} timestamp={data.timestamp} type='lesson'/>
      </div>
      <AudioPlayer audio={data.file_audio} currentTime={currentTime} setCurrentTime={setCurrentTime} executeOnEnd={executeOnEnd} />
      <StepControl continueDisabled={!data.is_completed && continueDisabled} onContinue={onSubmit} isSubmitting={isSubmitting} />
    </>
  );
};

export default LessonItem;