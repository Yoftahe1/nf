import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReAuth from '../baseQuery';

export interface leaderboardI {
  leaderboard: {
    first_name: string;
    last_name: string;
    profile_pic: string;
    created_at: string;
    xp: number;
  }[];
  position: number;
}
export interface activitiesI {
  date: string;
  level: number;
  count: number;
}


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/user/register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: '/user/changePassword',
          method: 'POST',
          body: data,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: () => {
        return {
          url: '/user/delete',
          method: 'DELETE',
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => {
        return {
          url: `user/update`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    getLeaderboard: builder.query<leaderboardI, null>({
      query: () => {
        return {
          url: `user/getLeaderboard`,
        };
      },
    }),
    getActivities: builder.query<activitiesI[], null>({
      query: () => {
        return {
          url: `user/getActivities`,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useDeleteUserMutation,
  useGetActivitiesQuery,
  useGetLeaderboardQuery,
  useRegisterUserMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi;
