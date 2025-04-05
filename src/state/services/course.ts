import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReAuth from '../baseQuery';

interface Course {
  id: string;
  course_no: number;
  course_title: string;
  course_img: string;
  created_at: string;
}

export interface UnitsI {
  unit_id: string;
  unit_no: number;
  unit_title: string;
  lessons: ExtendedLessonI[];
}

export interface Lesson {
  id: string;
  file_no: number;
  file_name: string;
  lesson_body: any;
  created_at: string;
  is_completed: boolean;
  unit_id: string;
  total_step: number;
}

export interface ExtendedLessonI extends Lesson {
  step: number;
  isLocked: boolean;
}

export interface Test {
  id: string;
  question: string;
  choice: any;
  lesson_id: string;
  difficulty: number;
}

export interface Tests {
  lesson_id: string;
  lesson_title: string;
  tests: {
    test_id: string;
    is_answered: boolean;
  }[];
}

export interface CoursesI {
  courses: Course[];
  total: number;
  totalPages: number;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getCourses: builder.query<CoursesI, { page: number }>({
      query: ({ page }) => {
        return {
          url: `course/getAll?page=${page}`,
        };
      },
    }),
    getUnits: builder.query<UnitsI[], string>({
      query: (courseId) => {
        return {
          url: `unit/user/course/${courseId}`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    completeUnit: builder.mutation({
      query: ({ unitId }) => {
        return {
          url: `/unit/complete/${unitId}`,
          method: 'POST',
        };
      },
    }),
    getLesson: builder.query<any, { lessonId: string; stepNo: string }>({
      query: ({ lessonId, stepNo }) => {
        return {
          url: `file/user/lesson/${lessonId}/step/${stepNo}`,
        };
      },
    }),
    completeLesson: builder.mutation({
      query: (lessonId) => {
        return {
          url: `/file/complete/${lessonId}`,
          method: 'POST',
        };
      },
    }),
    getQuiz: builder.query<any, null>({
      query: () => {
        return {
          url: `question/quiz`,
        };
      },
    }),
    checkAnswer: builder.mutation({
      query: ({ answer, testId, lessonId }) => {
        return {
          url: `/question/${testId}/checkAnswer`,
          body: { answer, lessonId },
          method: 'POST',
        };
      },
    }),
  }),
});

export const {
  useGetQuizQuery,
  useGetUnitsQuery,
  useGetLessonQuery,
  useGetCoursesQuery,
  useCheckAnswerMutation,
  useCompleteUnitMutation,
  useCompleteLessonMutation,
} = courseApi;
