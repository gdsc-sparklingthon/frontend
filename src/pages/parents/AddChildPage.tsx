import { useState } from 'react';

const AddChildPage = () => {
  const [childName, setChildName] = useState('');
  const [childBirth, setChildBirth] = useState('');

  const handleCreation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 1) 서버 post 요청 2) 응답 받아서 성공하면 부모 메인 페이지로 이동
  };

  return (
    <div className="mt-[4rem]">
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
