import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface TestState {
  selectId?: string;
}

const initialState: TestState = {};

export const testSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setTestId: (state: TestState, action: { payload: string }) => {
      state.selectId = action.payload;
    },
  },
});

export const { setTestId } = testSlice.actions;
export const selectTestId = (state: RootState) => state.test.selectId;

const testReducer = testSlice.reducer;
export default testReducer;
