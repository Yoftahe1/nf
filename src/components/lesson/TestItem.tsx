import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { cn } from '@/lib/utils';
import StepControl from './StepControl';
import { useToast } from '@/hooks/use-toast';
import TestLessonContent from './TestLessonContent';
import { useCheckAnswerMutation } from '@/state/services/course';
import { setUser } from '@/state/slice/auth';
import { RootState } from '@/state/store';

interface TestItem {
  data: any;
}

const TestItem = ({ data }: TestItem) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { courseId, unitId, lessonId, totalSteps, stepNo } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [checkAnswerMutation, { isLoading: isSubmitting }] = useCheckAnswerMutation();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  async function checkAnswer() {
    try {
      const result = await checkAnswerMutation({ answer: selectedOption, testId: `${data!.id}`, lessonId });
      setIsCorrect(result.data.isCorrect);
      if (result.data.isCorrect) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const formattedToday = today.toISOString().split('T')[0];
        const formattedYesterday = yesterday.toISOString().split('T')[0];
        const currenStreak =
          user!.last_answered === formattedYesterday ? user!.current_streak + 1 : user!.last_answered === formattedToday ? user!.current_streak : 1;

        const userDate = {
          created_at: user!.created_at,
          email: user!.email,
          first_name: user!.first_name,
          last_name: user!.last_name,
          date_of_birth: user!.date_of_birth,
          phone_number: user!.phone_number,
          profile_pic: user!.profile_pic,
          address: user!.address,
          xp: user!.xp + data.difficulty * 10,
          current_streak: currenStreak,
          highest_streak: currenStreak > user!.highest_streak ? currenStreak : user!.highest_streak,
          last_answered: formattedToday,
        };
        dispatch(setUser({ user: userDate }));
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }
  async function nextQuestion() {
    setIsCorrect(null);
    setSelectedOption(undefined);

    navigate(`/app/learn/course/${courseId}/unit/${unitId}/lesson/${lessonId}/totalSteps/${totalSteps}/step/${Number(stepNo) + 1}`);
  }

  return (
    <>
      {data && (
        <>
          <div className="p-2 rounded-md border border-input shadow-md">
            <TestLessonContent question={data.question} hiddenWord={'___'} />

            <p className="font-semibold text-xl text-primary my-6">ከመሃል የጎደለው ቃል ምንድን ነው?</p>

            <MultipleOptions
              selectedOption={selectedOption}
              isCorrect={isCorrect}
              setSelectedOption={(option) => {
                setIsCorrect(null);
                setSelectedOption(option);
              }}
              options={Object.values(data.choice)}
            />
          </div>
          <StepControl
            onContinue={nextQuestion}
            continueDisabled={!isCorrect}
            isSubmitting={isSubmitting}
            isTest={true}
            checkAnswerDisabled={!!!selectedOption}
            checkAnswer={checkAnswer}
          />
        </>
      )}
    </>
  );
};

export default TestItem;

export function MultipleOptions({
  options,
  selectedOption,
  setSelectedOption,
  isCorrect,
}: {
  options: string[];
  isCorrect: boolean | null;
  selectedOption: string | undefined;
  setSelectedOption: (option: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((o, i) => (
        <Option key={i} option={o} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isCorrect={isCorrect} />
      ))}
    </div>
  );
}

function Option({
  option,
  selectedOption,
  setSelectedOption,
  isCorrect,
}: {
  option: string;
  selectedOption: string | undefined;
  setSelectedOption: (option: string) => void;
  isCorrect: boolean | null;
}) {
  const isSelected = selectedOption === option;

  return (
    <div
      className={cn(
        'flex items-center p-2  rounded-md border hover:border-primary hover:text-primary transition-all hover:cursor-pointer hover:bg-transparent h-12',
        isSelected && isCorrect && 'border-green-500 text-green-500',
        isSelected && !isCorrect && 'border-red-500  text-red-500',
        isSelected && isCorrect === null && 'border-primary text-primary',
      )}
      onClick={() => setSelectedOption(option)}
    >
      <p>{option}</p>
    </div>
  );
}
