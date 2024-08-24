import { useContext, FormEvent } from 'react';
import { IsLoginContext } from '../contexts/IsLoginContext';

interface LoginProps {
  email: string;
  setEmail: (id: string) => void;
  code: string;
  setCode: (code: string) => void;
}

const Login = ({ email, setEmail, code, setCode }: LoginProps) => {
  const { setIsLogin } = useContext(IsLoginContext);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 기본 동작을 방지
    // TODO: 1) 서버에 로그인 요청을 보내고, 2) 응답을 받아서 성공하면 token을 받아서 localStorage에 저장합니다.
    // 위 단계를 utils에서 처리하는걸로 할까 아님 ...? + setIsParent 추가
    setIsLogin(true);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label className="text-sm text-left text-black" htmlFor="email">
            email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-[10px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <div>
          <label className="text-sm text-left text-black" htmlFor="code">
            code
          </label>
          <input
            type="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <button
          className="mt-[40px] w-[352px] h-16 bg-[#ffe090] text-sm text-center text-black"
          type="submit"
        >
          로그인 하기
        </button>
      </form>
    </div>
  );
};

export default Login;
