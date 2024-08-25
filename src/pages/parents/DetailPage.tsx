import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ChildDetail {
  age: number;
  gender: string;
  id: number;
  name: string;
  resultList: string[];
}

// Default values for ChildDetail
const defaultChildDetail: ChildDetail = {
  age: 0,
  gender: '',
  id: 0,
  name: '',
  resultList: [],
};

interface DetailPageProps {
  childId: number;
}

const DetailPage = ({ childId }: DetailPageProps) => {
  const [childDetail, setChildDetail] =
    useState<ChildDetail>(defaultChildDetail); // State to store child details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChild = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인해주세요.');
        navigate('/login'); // Navigate to login if there's no token
      }

      try {
        const response = await axios.get(
          'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/parent/child/' +
            childId.toString(),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('자식 정보:', response.data);
        setChildDetail(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Detail 페이지 오류:', error);
      }
    };

    fetchChild();
  }, []);

  return (
    <div>
      <p className="mb-[20px] text-2xl font-semibold text-left text-black">
        상세 결과
      </p>
      <p>
        <strong>name:</strong> {childDetail.name}
      </p>
      <p>
        <strong>age:</strong> {childDetail.age}
      </p>
      <p>
        <strong>gender:</strong> {childDetail.gender}
      </p>
      <div className="border-t border-gray-300 my-10" />
      {childDetail.resultList.length === 0 ? (
        <p>아직 결과가 없습니다</p> // Display message when resultList is empty
      ) : (
        <ul>
          {childDetail.resultList.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DetailPage;
