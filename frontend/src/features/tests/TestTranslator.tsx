import * as React from 'react';
import { Grid, TextField } from '@mui/material';
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

interface TestContextState {
  text: string;
  translation: string;
}


export class TestTranslator extends React.Component<unknown, TestContextState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      text: '',
      translation: '',
    };
  }

  onChangeContext = (name: string) => {
    this.setState({
      text: '',
      translation: '',
    });
  };

  onTranslate = (text: string) => {
    this.setState({
      translation: text,
    });
    translate(text).then((resp) => {
      this.setState({
        translation: resp,
      });
    });
  };

  render() {
    return (
      <div>
        <MyContext.Provider value={{text: this.state.text}}>
          <Grid>
            <TextField label="原文" sx={{ margin: 1 }} onChange={(e) => this.onTranslate(e.target.value)} />
            <TextField label={this.state.translation} sx={{ margin: 1 }} />
          </Grid>          
        </MyContext.Provider>
      </div>
    );
  }
}
