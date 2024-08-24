import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useIsLoginState, useIsParentState } from '../hooks/IsLoginState';
import ChildMainPage from './child/ChildMainPage';
import ParentMainPage from './parents/ParentMainPage';

// 메인 페이지 컴포넌트
const MainPage = () => {
  const isLogin = useIsLoginState();
  const isParent = useIsParentState();
  const navigate = useNavigate();

  // 로그인 상태에 따라 페이지 이동
  useEffect(() => {
    if (!isLogin) {
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [isLogin, navigate]);

  return isParent ? <ParentMainPage /> : <ChildMainPage />;
};

export default MainPage;
