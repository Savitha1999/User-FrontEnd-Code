import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    phoneNumber: '',
    isVerified: false,
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
  },
});

export const { setPhoneNumber, setIsVerified } = userSlice.actions;
export default userSlice.reducer;
