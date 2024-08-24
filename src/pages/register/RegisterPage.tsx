import { useState } from 'react';
import axios from 'axios';
import Arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/auth/user',
        {
          name,
          email: regEmail,
          password: regPassword,
        },
      );

      if (response.status === 201) {
        // Assuming 201 status code means successful registration
        alert('회원가입이 성공적으로 완료되었습니다!');
        // Redirect to login page or another appropriate action
        navigate('/login');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div className="flex h-[20px] mt-[1rem] mb-[2rem]">
        <img
          src={Arrow}
          alt="arrow"
          className="w-[24px] h-[20px] cursor-pointer"
          onClick={() => window.history.back()}
        />
        <p className="mx-[1rem] text-base text-left text-black">회원가입</p>
      </div>
      <form onSubmit={handleRegister}>
        <div>
          <label className="text-sm text-left text-black" htmlFor="name">
            이름
          </label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-[20px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <div>
          <label className="text-sm text-left text-black" htmlFor="email">
            email
          </label>
          <input
            type="email"
            id="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="mb-[20px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <div>
          <label className="text-sm text-left text-black" htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="mb-[20px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <button
          className="mt-[40px] w-[352px] h-16 bg-[#ffe090] text-sm text-center text-black"
          type="submit"
        >
          회원가입 하기
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
