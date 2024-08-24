import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import List from './List';

interface Child {
  id: number;
  name: string;
  email: string;
  code: string;
  age: number;
  gender: string;
}

// TODO: highlight 될 child id 받아오기

const Profile = () => {
  const [loading, setLoading] = useState(true); // State to handle loading
  const [children, setChildren] = useState<Child[]>([]); // State to store child list
  const navigate = useNavigate();

  const handleAddChild = () => {
    navigate('/create');
  };

  useEffect(() => {
    const fetchChildren = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인해주세요.');
        navigate('/login'); // Navigate to login if there's no token
      }

      try {
        const response = await axios.get(
          'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/parent/child',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }, // 324723
          },
        );
        console.log('자식 목록:', response.data);
        setChildren(response.data.childList); // Assuming response.data contains the child list
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('자식 목록 불러오기 실패:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchChildren();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {children.map((child) => (
            <List key={child.id} name={child.name} /> // Render List component with a unique key
          ))}
          <button
            className="m-[3px] w-[317px] h-[52px] bg-[#f2f2f2] flex items-center justify-center text-2xl"
            onClick={handleAddChild}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
