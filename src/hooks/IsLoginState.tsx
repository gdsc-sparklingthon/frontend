import { useContext } from 'react';
import { IsLoginContext } from '../contexts/IsLoginContext';

// custom hook
export function useIsLoginState() {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error('Cannot find IsLoginProvider');
  }
  return context.isLogin;
}

export function useIsParentState() {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error('Cannot find IsLoginProvider');
  }
  return context.isParent;
}
