import { useState } from 'react';
import ChildLogin from '../../components/ChildLoginComponent';

interface ChildLoginPageProps {
  setIsParent: (isParent: boolean | null) => void;
}

const ChildLoginPage = ({ setIsParent }: ChildLoginPageProps) => {
  const [childEmail, setChildEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  return (
    <div className="flex flex-col items-center">
      <div className="my-[40px] w-[157px] h-[157px] bg-[#d9d9d9]" />
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
