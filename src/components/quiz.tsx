import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToast } from '@/hooks/use-toast';
import StepControl from './lesson/StepControl';
import {  useCheckAnswerMutation } from '@/state/services/course';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { setUser } from '@/state/slice/auth';
import { RootState } from '@/state/store';
import { MultipleOptions } from './lesson/Question';
import Matcher from './lesson/Matcher';
import { StateObject } from '@/types';

interface QuizI {
  id: string;
  options: any;
  type: string;
  content: string;
  position: string;
  state: StateObject;
  difficulty: number;
  lessonId:string
}

export default function Quiz({ content, state, position, type, options, id, difficulty,lessonId }: QuizI) {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [checkAnswerMutation, { isLoading: isSubmitting }] = useCheckAnswerMutation();

  async function checkAnswer() {
    try {
      const { data } = await checkAnswerMutation({ answer: selectedOption, testId: `${id}`, lessonId: `${lessonId}` });
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

  async function onContinue() {
    setIsCorrect(null);
    setSelectedOption(undefined);
    setIsOpen(false);
  }
  return (
    <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Quiz</DialogTitle>
        </DialogHeader>
        <Matcher content={content} state={state} position={position} type={type} />

        <DialogDescription className="font-semibold text-xl text-primary my-3">{type === 'fill' ? 'ከመሃል የጎደለው ቃል ምንድን ነው?' : 'በትክክል የተፃፈው ቃል የትኛው ነው?'}</DialogDescription>
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
          onContinue={onContinue}
          continueDisabled={!isCorrect}
          isSubmitting={isSubmitting}
          isTest={true}
          checkAnswerDisabled={!!!selectedOption}
          checkAnswer={checkAnswer}
        />
      </DialogContent>
    </Dialog>
  );
}
