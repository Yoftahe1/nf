import Cookies from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  phone_number: string;
  profile_pic: string | null;
  address: string | null;
  xp: number;
  current_streak: number;
  highest_streak: number;
  last_answered: string;
}

const initialState: { data: null | UserState } = { data: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserState>) => {
      state.data = action.payload;
    },
    signOut: (state) => {
      state.data = null;
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('user');
    },
    updateStreakAndLastAnswered: (state) => {
      if (state.data) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const formattedToday = today.toISOString().split('T')[0];
        const formattedYesterday = yesterday.toISOString().split('T')[0];

        if (state.data.last_answered === formattedToday || state.data.last_answered === formattedYesterday) {
          state.data.current_streak = state.data.current_streak + 1;
          state.data.last_answered = formattedToday;
        } else {
          state.data.current_streak = 0;
          state.data.last_answered = formattedToday;
        }
      }
    },
  },
});

export const { signIn, signOut,updateStreakAndLastAnswered } = userSlice.actions;
export default userSlice.reducer;
