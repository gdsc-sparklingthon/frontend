import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailPage from '../pages/parents/DetailPage';

interface Child {
  id: number;
  name: string;
  email: string;
  code: string;
  age: number;
  gender: string;
}

interface ProfileProps {
  children: Child[];
  targetId: number;
  setTargetId: (targetId: number) => void;
}

const Profile = ({ children, targetId, setTargetId }: ProfileProps) => {
  const [seeDetail, setSeeDetail] = useState(false); // State to handle detail page
  const navigate = useNavigate();

  const handleAddChild = () => {
    navigate('/create');
  };

  useEffect(() => {}, []);

  return (
    <div>
      {seeDetail ? (
        <div className="mt-[50px]">
          <DetailPage childId={targetId} />
        </div>
      ) : (
        <div className="mt-[50px]">
          {children.map((child) => (
            <div
              key={child.id} // Add unique key prop
              className="m-[3px] px-[20px] w-[317px] h-[52px] bg-[#f2f2f2] flex items-center text-black cursor-pointer"
              //   onClick={() => setTargetId(child.id)} // id를 전달
            >
              {child.name}
            </div>
          ))}
          <button
            className="m-[3px] w-[317px] h-[52px] bg-[#f2f2f2] flex items-center justify-center text-2xl"
            onClick={handleAddChild}
          >
            +
          </button>
          <div className="border-t border-gray-300 m-2 my-10" />
          <p
            className="w-full text-base text-center text-black cursor-pointer"
            onClick={() => setSeeDetail(true)}
          >
            아이 상세정보 보기
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
