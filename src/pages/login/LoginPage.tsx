import { useState } from 'react';
import ChildLoginPage from './ChildLoginPage';
import ParentLoginPage from './ParentLoginPage';

const LoginPage = () => {
  const [isParent, setIsParent] = useState<boolean | null>(null);

  const handleLogin = (clickedIsParent: boolean) => {
    setIsParent(clickedIsParent);
  };

  return isParent === null ? (
    <div>
      <p className="pt-[116px] text-2xl text-center text-black">
        아이와 부모를 선택해주세요
      </p>
      <p className="pt-[10px] pb-[40px] text-sm text-center text-black">
        *반드시 부모의 계정을 먼저 가입하셔야 합니다
      </p>
      <div className="flex">
        <div className="w-[168px] h-[179px]">
          <p className="text-sm text-center text-black my-[10px]">아이</p>
          <button
            className="w-[168px] h-[179px] bg-white border border-[#c1c1c1]"
            onClick={() => handleLogin(false)}
          />
        </div>
        <div className="w-[20px]"></div>
        <div>
          <p className="text-sm text-center text-black my-[10px]">부모</p>
          <button
            className="w-[168px] h-[179px] bg-white border border-[#c1c1c1]"
            onClick={() => handleLogin(true)}
          />
        </div>
      </div>
    </div>
  ) : isParent ? (
    <ParentLoginPage />
  ) : (
    <ChildLoginPage setIsParent={setIsParent} />
  );
};

export default LoginPage;
