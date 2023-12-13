import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState, createContext, useContext, useCallback, ReactNode } from 'react';

type Prompt = (message: string, defaultValue?: string) => Promise<string>;
type PromptProps = {
  message: string;
  defaultValue?: string;
};

const PromptContext = createContext<Prompt | undefined>(undefined);

export function PromptProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [resolveReject, setResolveReject] = useState<
    [((value: string) => void) | undefined, ((e: Error) => void) | undefined]
  >([undefined, undefined]);
  const [promptProps, setPromptProps] = useState<PromptProps>({ message: '' });
  const [value, setValue] = useState('');

  const prompt = useCallback((message: string, defaultValue = ''): Promise<string> => {
    setIsOpen(true);
    setPromptProps({ message, defaultValue });

    return new Promise<string>((resolve, reject) => {
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(
    (value: string) => {
      const [resolve] = resolveReject;
      setIsOpen(false);
      resolve!(value);
    },
    [resolveReject],
  );

  const handleCancel = useCallback(() => {
    const [, reject] = resolveReject;
    setIsOpen(false);
    reject!(new Error('Cancelled by user'));
  }, [resolveReject]);

  return (
    <PromptContext.Provider value={prompt}>
      {children}
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="prompt-dialog-title">
        <DialogTitle id="prompt-dialog-title">提示</DialogTitle>
        <DialogContent>
          <DialogContentText>{promptProps.message}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            id="name"
            type="text"
            fullWidth
            defaultValue={promptProps.defaultValue}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            取消
          </Button>
          <Button onClick={() => handleClose(value)} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </PromptContext.Provider>
  );
}

export const usePrompt = () => {
  const prompt = useContext(PromptContext);
  if (!prompt) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }
  return prompt;
};
