import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import { Test } from './features/tests/Test';
import { PromptProvider } from './components/PromptContext';
import { persistor, store } from './app/store';
import theme from './theme';

function ViewModeTest() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ flex: 1, display: 'flex', width: 1, height: 0 }}>
          <Routes>
            <Route path="/" Component={Test} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

function Loggedin() {
  return <ViewModeTest />;
}

function Main() {
  return <Loggedin />;
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const dispatch = useAppDispatch();
  // const boardFetched = useAppSelector(selectBoardIsFetched);
  // useEffect(() => {
  //   if (isLoggedIn && !boardFetched) {
  //     dispatch(fetchBoards());
  //     dispatch(fetchUsers());
  //     dispatch(fetchRoadmaps());
  //   }
  // }, [dispatch, isLoggedIn, boardFetched]);
  // return !isLoggedIn ? <NoLogin /> : <Loggedin />;
}

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={5}>
            <ConfirmProvider
              defaultOptions={{
                confirmationText: '确认',
                cancellationText: '取消',
              }}
            >
              <PromptProvider>
                <Main />
              </PromptProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
