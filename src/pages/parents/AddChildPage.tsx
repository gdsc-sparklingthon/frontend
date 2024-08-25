import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddChildPage = () => {
  const [childName, setChildName] = useState('');
  const [childBirth, setChildBirth] = useState('');
  const [childGender, setChildGender] = useState('');
  const navigate = useNavigate();

  const handleCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('토큰이 없습니다. 다시 로그인해주세요.');
      navigate('/login'); // Navigate to login if there's no token
    }

    try {
      const response = await axios.post(
        'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/parent/child',
        {
          name: childName,
          age: childBirth,
          gender: childGender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        },
      );

      const { code } = response.data;
      if (code) {
        alert('아이 코드 생성 완료: ' + code);
        navigate('/'); // TODO: 실제로는 메인 화면으로 (연동 이후에)
      } else {
        console.error('응답에 코드가 포함되어 있지 않습니다.');
      }
    } catch (error) {
      console.error('아이 등록 실패:', error);
      alert('아이 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="mt-[4rem]">
      <p className="mb-[30px] text-2xl text-left text-black">
        <strong>아이</strong>
        <span className="text-2xl text-left text-black">를 등록해주세요</span>
      </p>
      <form onSubmit={handleCreation}>
        <div>
          <label className="text-sm text-left text-black">아이 이름</label>
          <input
            type="name"
            id="name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="mb-[10px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <div>
          <label className="text-sm text-left text-black">아이 나이</label>
          <input
            type="birth"
            id="birth"
            value={childBirth}
            onChange={(e) => setChildBirth(e.target.value)}
            className="mb-[10px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <div>
          <label className="text-sm text-left text-black">아이 성별</label>
          <input
            type="gender"
            id="gender"
            value={childGender}
            onChange={(e) => setChildGender(e.target.value)}
            className="mb-[10px] w-[352px] h-12 bg-white border border-[#c1c1c1]"
            required
          />
        </div>
        <button
          className="mt-[4rem] w-[352px] h-16 bg-[#ffe090] text-sm text-center text-black"
          type="submit"
        >
          생성하기
        </button>
      </form>
    </div>
  );
};

export default AddChildPage;
