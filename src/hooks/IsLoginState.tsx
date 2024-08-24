import { useContext } from 'react';
import { IsLoginContext } from '../contexts/IsLoginContext';

// custom hook
export function useIsLoginState() {
  const { isLogin } = useContext(IsLoginContext);
  return isLogin;
}

export function useIsParentState() {
  const { isParent } = useContext(IsLoginContext);
  return isParent;
}
