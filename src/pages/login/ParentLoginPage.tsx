import { useState } from 'react';
import ParentLogin from '../../components/ParentLoginComponent';
import { useNavigate } from 'react-router-dom';

const ParentLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="flex flex-col items-center">
      <div className="my-[40px] w-[157px] h-[157px] bg-[#d9d9d9]" />
      <ParentLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <div className="mt-[30px] flex gap-[8px]">
        <p
          className="cursor-pointer text-sm text-center text-black"
          onClick={() => navigate('/register')}
        >
          회원가입
        </p>
        <p className="text-sm text-center text-black">|</p>
        <p className="text-sm text-center text-black">비밀번호 찾기</p>
      </div>
    </div>
  );
};

export default ParentLoginPage;
