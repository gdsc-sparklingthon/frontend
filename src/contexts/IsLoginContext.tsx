import React, { createContext, useState, useMemo, ReactNode } from 'react';

// localStorage에서 사용자 ID와 토큰을 가져옵니다.
// const userId = localStorage.getItem('id'); -> 사용하지 않음
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('userRole'); // parent | child

// 로그인 여부를 판단하여 초기값을 설정합니다.
interface IsLoginContextType {
  isLogin: boolean;
  isParent: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsParent: React.Dispatch<React.SetStateAction<boolean>>;
}

// 초기값은 로그인이 되었는지 여부에 따라 설정됩니다.
const defaultValue: IsLoginContextType = {
  // isLogin: userId !== null && token !== null,
  isLogin: token !== null,
  isParent: userRole === 'parent',
  setIsLogin: () => {},
  setIsParent: () => {},
};

export const IsLoginContext = createContext<IsLoginContextType>(defaultValue);

export function IsLoginProvider({ children }: { children: ReactNode }) {
  // const [isLogin, setIsLogin] = useState<boolean>(
  //   userId !== null && token !== null,
  // );
  const [isLogin, setIsLogin] = useState<boolean>(token !== null);
  const [isParent, setIsParent] = useState<boolean>(userRole === 'child');

  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됩니다.
  const value = useMemo(
    () => ({ isLogin, isParent, setIsLogin, setIsParent }),
    [isLogin, isParent],
  );

  return (
    <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
  );
}
