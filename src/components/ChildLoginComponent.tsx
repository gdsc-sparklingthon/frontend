import { useContext, FormEvent } from 'react';
import { IsLoginContext } from '../contexts/IsLoginContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  email: string;
  setEmail: (id: string) => void;
  code: string;
  setCode: (code: string) => void;
}

const Login = ({ email, setEmail, code, setCode }: LoginProps) => {
  const { setIsLogin, setIsParent } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 기본 동작을 방지

    try {
      const response = await axios.post(
        'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/auth/login',
        {
          isParent: false,
          email,
          code,
        },
      );

      // 응답에서 토큰을 받아 localStorage에 저장
      const { accessToken } = response.data;
      if (accessToken) {
        console.log('토큰:', accessToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userRole', 'child');
      } else {
        console.error('accessToken이 응답에 포함되어 있지 않습니다.');
      }

      // 로그인 상태를 업데이트
      setIsLogin(true);
      setIsParent(false);

      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
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
