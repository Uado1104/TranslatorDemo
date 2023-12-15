/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectedTo, setTo } from './testSlice';
// import googleTranslateApi from 'google-translate-cn-api';

export async function translate(text: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const answer = '带翻译';
    // const answer = googleTranslateApi(text);
    resolve(answer);
  });
}

interface ContextState {
  text: string;
}

const MyContext = React.createContext<Partial<ContextState>>({});

type language = 'en' | 'ja' | 'ko';
const languageMap: Record<language, string> = {
  en: '英文',
  ja: '日文',
  ko: '韩文',
};


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function renderOriginalText(): JSX.Element {
  return (
    <div>
      <Tabs aria-label="basic tabs example">
         <Tab label={'google翻译'} {...a11yProps(0)} />
         <Tab label={'Gpt'} {...a11yProps(1)} />
      </Tabs>
      <TextField label="原文" sx={{ margin: 1}} InputProps={{ sx: { height: 100 } }}onChange={(e) => {} }/>
     </div>
  );
}

function renderTranslation() {
  const translateTool = useAppSelector((rootState) => rootState.test.translateTool);
  const dispath = useAppDispatch();
  return (
    <div>
     <Tabs aria-label="basic tabs example" value={translateTool?.to} onChange={(e, value)=>{dispath(setTo(value))}}>
          <Tab label={languageMap.en} {...a11yProps(0)} />
          <Tab label={languageMap.ja} {...a11yProps(1)} />
          <Tab label={languageMap.ko} {...a11yProps(2)} />
      </Tabs>
      <TextField label="译文" disabled={true} sx={{ margin: 1 }} value={'trans'} InputProps={{ sx: { height: 100 } }}/>  
      </div>
  )
}

export function TestTranslator() {
  return (
    <div>
      <Grid container spacing={30}>
          <Grid container item xs={3} sm={2}>
            {renderOriginalText()}
          </Grid>
          <Grid container item xs={3} sm={2}>
            {renderTranslation()}
          </Grid>
        </Grid>       
    </div>
  );
}
