import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Matcher from './Matcher';
import { cn } from '@/lib/utils';
import { StateObject } from '@/types';
import StepControl from './StepControl';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/state/store';
import { useCheckAnswerMutation } from '@/state/services/course';
import { setUser } from '@/state/slice/auth';

interface QuestionI {
  id: string;
  options: any;
  type: string;
  content: string;
  position: string;
  state: StateObject;
  difficulty: number;
}
const Question = ({ content, state, position, type, options, id, difficulty }: QuestionI) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, unitId, lessonId, totalSteps, stepNo } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [checkAnswerMutation, { isLoading: isSubmitting }] = useCheckAnswerMutation();

  async function checkAnswer() {
    try {
      const { data } = await checkAnswerMutation({ answer: selectedOption, testId: `${id}`, lessonId });
      setIsCorrect(data.isCorrect);
      if (data.isCorrect) {
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
          xp: user!.xp + difficulty * 10,
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
    <div>
      <div className="rounded-md border border-primary ">
        <Matcher content={content} state={state} position={position} type={type} />
      </div>
      <p className="font-semibold text-xl text-primary my-6">{type === 'fill' ? 'ከመሃል የጎደለው ቃል ምንድን ነው?' : 'በትክክል የተፃፈው ቃል የትኛው ነው?'}</p>
      <MultipleOptions
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        setSelectedOption={(option) => {
          setIsCorrect(null);
          setSelectedOption(option);
        }}
        options={Object.values(options)}
      />
      <StepControl
        onContinue={nextQuestion}
        continueDisabled={!isCorrect}
        isSubmitting={isSubmitting}
        isTest={true}
        checkAnswerDisabled={!!!selectedOption}
        checkAnswer={checkAnswer}
      />
    </div>
  );
};

export default Question;

export function MultipleOptions({
  options,
  selectedOption,
  setSelectedOption,
  isCorrect,
}: {
  options: { content: string; state: StateObject }[];
  isCorrect: boolean | null;
  selectedOption: string | undefined;
  setSelectedOption: (option: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((o, i) => (
        <Option key={i} index={i} option={o} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isCorrect={isCorrect} />
      ))}
    </div>
  );
}

function Option({
  index,
  option,
  selectedOption,
  setSelectedOption,
  isCorrect,
}: {
  index: number;
  option: { content: string; state: StateObject };
  selectedOption: string | undefined;
  setSelectedOption: (option: string) => void;
  isCorrect: boolean | null;
}) {
  const isSelected = selectedOption === index.toString();

  return (
    <div
      className={cn(
        'flex items-center rounded-md border hover:border-primary transition-all hover:cursor-pointer hover:bg-transparent h-20',
        isSelected && isCorrect && 'border-green-500 ',
        isSelected && !isCorrect && 'border-red-500  ',
        isSelected && isCorrect === null && 'border-primary',
      )}
      onClick={() => setSelectedOption(`${index}`)}
    >
      <Matcher content={option.content} state={option.state} />
    </div>
  );
}
