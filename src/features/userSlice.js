import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '', name: '', email: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }) => payload,
    logout: () => initialState
  }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;