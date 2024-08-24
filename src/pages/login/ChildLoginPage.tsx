import { useState } from 'react';
import ChildLogin from '../../components/ChildLoginComponent';
import BearProfile from '../../assets/bearprofile.png';

interface ChildLoginPageProps {
  setIsParent: (isParent: boolean | null) => void;
}

const ChildLoginPage = ({ setIsParent }: ChildLoginPageProps) => {
  const [childEmail, setChildEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  return (
    <div className="flex flex-col items-center">
      <img
        src={BearProfile}
        alt="bear"
        className="mt-[40px] w-[157px] h-[157px]"
      />
      <p className="mb-[20px] text-2xl text-center text-black">Bear Care</p>
      <ChildLogin
        email={childEmail}
        setEmail={setChildEmail}
        code={code}
        setCode={setCode}
      />
      <p
        className="pt-[2rem] w-[302px] text-sm text-center text-black cursor-pointer"
        onClick={() => setIsParent(null)}
      >
        코드가 없으신가요? 부모 계정에 먼저 설치해주세요!
      </p>
    </div>
  );
};

export default ChildLoginPage;
