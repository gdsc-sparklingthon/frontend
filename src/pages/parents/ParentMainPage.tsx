import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResultPage from './ResultPage';

// 바로 GET 요청을 보내서 자식들의 정보 받아오기
// 부모의 이름 정보만 필요하다
// 1. 자식이 없다면 -> 자식 추가 페이지
// 2. 자식이 있다면 -> 자식 정보 페이지

interface Child {
  id: number;
  name: string;
  email: string;
  code: string;
  age: number;
  gender: string;
}

const ParentMainPage = () => {
  const navigate = useNavigate();
  const [isSet, setIsSet] = useState(false);
  const [children, setChildren] = useState<Child[]>([]); // State to store child list
  const [content, setContent] = useState<JSX.Element | null>(null); // 렌더링할 콘텐츠를 저장할 상태

  // get 요청으로 부모 이름 & 자식 정보 받아오기
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
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('자식 목록:', response.data);
        setChildren(response.data.childList); // Assuming response.data contains the child list
        setIsSet(true);
      } catch (error) {
        console.error('자식 목록 불러오기 실패:', error);
      }
    };

    fetchChildren();
  }, []);

  useEffect(() => {
    if (isSet) {
      if (children.length <= 0) {
        navigate('/create');
      } else {
        setContent(
          <ResultPage children={children} setChildren={setChildren} />,
        );
      }
    } else {
      setContent(<div>Loading ...</div>);
    }
  }, [isSet, children, navigate]);

  return <div>{content}</div>;
};

export default ParentMainPage;
