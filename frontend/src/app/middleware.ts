// import { setHttpError } from '../features/app/appSlice';
// import { logout } from '../features/login/loginSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiErrorHandlingMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type.endsWith('rejected')) {
    const payloadMessage = action?.payload?.message;
    const errorMessage = payloadMessage || action.error.message;

    if (errorMessage === 'Request failed with status code 401') {
      // 401未认证
    } else if (errorMessage === 'Request failed with status code 403') {
      // 403未授权
      // const appStore = store as AppStore;
      // appStore.dispatch(setHttpError(403));
    }
  }

  return next(action);
};
