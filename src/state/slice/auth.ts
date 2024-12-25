import { createSlice } from '@reduxjs/toolkit';

export interface User {
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

interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, setToken, setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
