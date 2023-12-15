import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TLanguage, ITranslate } from '../../common/translate.dto';

interface ITestState {
  selectId?: string;
  translateTool: ITranslate;
}

const initialState: ITestState = {
  translateTool: {
    date: '2021-10-01',
    tool: 'google',
    originalText: '请输入',
    translatedText: '',
    to: 'en',
  },
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestId: (state: ITestState, action: { payload: string }) => {
      state.selectId = action.payload;
    },
    setCurrentTranslateTool: (state: ITestState, action: { payload: ITranslate }) => {
      state.translateTool = action.payload;
    },
    setOrinalText: (state: ITestState, action: { payload: string }) => {
      state.translateTool.originalText = action.payload;
    },
    setTranslatedText: (state: ITestState, action: { payload: string }) => {
      state.translateTool.translatedText = action.payload;
    },
    setTo: (state: ITestState, action: { payload: TLanguage }) => {
      state.translateTool.to = action.payload;
    },
  },
});

export const { setTestId, setCurrentTranslateTool, setOrinalText, setTranslatedText, setTo } = testSlice.actions;
export const selectTestId = (state: RootState) => state.test.selectId;
export const selectedCurrentTranslateTool = (state: RootState) => state.test.translateTool;
export const selectedOrinalText = (state: RootState) => state.test.translateTool.originalText;
export const selectedTranslatedText = (state: RootState) => state.test.translateTool.translatedText;
export const selectedTo = (state: RootState) => state.test.translateTool.to;

const testReducer = testSlice.reducer;
export default testReducer;
