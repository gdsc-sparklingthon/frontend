import Bear from '../../assets/bear.png';
import MovingBear from '../../assets/movingbear.gif';
import VoiceRecord from '../../components/VoiceRecord';
import Bubble from '../../assets/bubble.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChildMainPage = () => {
  const [question, setQuestion] = useState(''); // State to store the question
  const [nextQuestionId, setNextQuestionId] = useState(''); // State to store the nextQuestionId
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirstTalk = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인해주세요.');
        navigate('/login'); // Navigate to login if there's no token
      }

      try {
        const response = await axios.get(
          'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/child/question',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // console.log('첫 대화:', response.data);
        const { question, nextQuestionId } = response.data;
        if (question) {
          setQuestion(question); // Update the question state
          setNextQuestionId(nextQuestionId); // Store the nextQuestionId for future use
          setLoading(false); // Set loading to false after fetching data
        } else {
          console.error('응답에 질문이 포함되어 있지 않습니다.');
        }
      } catch (error) {
        console.error('첫 대화 불러오기 실패:', error);
        setLoading(false); // Set loading to false even if there's an error
        // navigate('/login'); // Navigate to login if there's an error
      }
    };

    fetchFirstTalk();
  }, []);

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4"
      style={{
        background: 'linear-gradient(to bottom, #fff6e5 -44.23%, #fff 78.68%)',
      }}
    >
      <div className="relative mt-[50px] w-full h-[100px] items-center justify-center">
        <img
          src={Bubble}
          alt="bubble"
          className="absolute inset-0 w-full h-auto object-cover"
        />
        <p className="absolute inset-0 flex items-center justify-center text-center text-black max-w-[300px] break-words">
          {question}
        </p>
      </div>
      <img
        src={MovingBear}
        alt="bear"
        className="h-[400px] w-auto object-contain transform scale-150 z-0"
      />
      <VoiceRecord
        disabled={loading} // Pass the loading state to VoiceRecord
        nextQuestionId={nextQuestionId}
        setNextQuestionId={setNextQuestionId}
        setQuestion={setQuestion}
      />
    </div>
  );
};

export default ChildMainPage;
