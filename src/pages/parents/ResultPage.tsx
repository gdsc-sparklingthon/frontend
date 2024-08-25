import { useEffect, useState } from 'react';
import ThreeLines from '../../assets/threelines.svg';
import X from '../../assets/x.svg';
import Chart from '../../components/Chart';
import GradientCircle from '../../components/GradientCircle';
import Bar from '../../components/Bar';
import Profile from '../../components/Profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailPage from './DetailPage';

interface Child {
  id: number;
  name: string;
  email: string;
  code: string;
  age: number;
  gender: string;
}

interface ChildDetail {
  surveyId: number;
  results: [
    {
      totalPoint: string;
      createdAt: Date;
      doneAt: Date;
      status: string;
      progress: number;
    },
  ];
}

const defaultChildDetail: ChildDetail = {
  surveyId: 0,
  results: [
    {
      totalPoint: '',
      createdAt: new Date(), // Or use a default date value like new Date(0)
      doneAt: new Date(), // Or use a default date value like new Date(0)
      status: '',
      progress: 0,
    },
  ],
};

interface ResultPageProps {
  children: Child[];
  setChildren: (children: Child[]) => void;
}

const ResultPage = ({ children, setChildren }: ResultPageProps) => {
  const [targetId, setTargetId] = useState<number>(-1);
  const [targetName, setTargetName] = useState<string>('');
  const [targetResult, setTargetResult] =
    useState<ChildDetail>(defaultChildDetail);
  const [disable, setDisable] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [seeDetailRight, setSeeDetailRight] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    if (seeDetailRight) {
      setSeeDetailRight(false);
    } else {
      setIsProfile(!isProfile);
    }
  };

  useEffect(() => {
    const fetchChildren = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인해주세요.');
        navigate('/login'); // Navigate to login if there's no token
        return;
      }

      try {
        const response = await axios.get(
          `http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/parent/survey/${targetId}`,
          // `http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/parent/child/${targetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('분석결과:', response.data);
        setTargetResult(response.data); // Assuming response.data contains the child list
        setIsProfile(false);
      } catch (error) {
        setDisable(true);
        console.error('분석 결과 불러오기 실패:', error);
      }
    };

    if (targetId !== -1) {
      fetchChildren();
    } else {
      if (children.length > 0) {
        setTargetId(children[0].id);
        setTargetName(children[0].name);
      }
    }
  }, [targetId, children, navigate]);

  useEffect(() => {
    if (targetResult && targetResult.results) {
      if (targetResult.results.length <= 0) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [targetResult]);

  return (
    <div
      className="flex flex-col p-4"
      style={{
        background: 'linear-gradient(to bottom, #fff6e5 -44.23%, #fff 78.68%)',
      }}
    >
      <div className="flex justify-end">
        <img
          src={isProfile || seeDetailRight ? X : ThreeLines}
          alt="menu"
          className="px-[0.3rem] pb-[0.3rem]"
          onClick={toggleModal}
        />
      </div>
      {isProfile ? (
        <Profile
          children={children}
          targetId={targetId}
          setTargetId={setTargetId}
        />
      ) : seeDetailRight ? (
        <div className="mt-[50px]">
          <DetailPage childId={targetId} />
        </div>
      ) : (
        <div>
          <p className="text-2xl text-left text-black mb-4">
            {targetName} 아이의 검사결과입니다.
          </p>
          <Bar
            disable={disable}
            percentage={disable ? 50 : targetResult.results[0].progress}
          />
          <div
            className="px-[15px] py-[20px] my-[20px] flex flex-col items-stretch w-full rounded-[21px] bg-white"
            style={{ boxShadow: '2px 2px 5px 0 rgba(57,57,57,0.25)' }}
          >
            <p className="text-base text-left text-black mb-2">
              가장 최근 검사결과
            </p>
            <div className="flex-grow flex items-center justify-center">
              {disable ? (
                <p className="flex flex-col justify-center w-[250px] h-[250px] text-base text-center text-black">
                  <span className="text-base text-center text-black">
                    검사를 완료하지 않았습니다
                  </span>
                  <span className="text-base text-center text-black">
                    기다려주세요!
                  </span>
                </p>
              ) : (
                <GradientCircle gradientColors={['#416BFF', '#FFFFFF']} />
              )}
            </div>
            <p
              className="text-sm text-right text-[#8d8d8d] cursor-pointer"
              onClick={() => {
                if (!disable) {
                  setSeeDetailRight(true);
                }
              }}
            >
              상세 결과 보기 &gt;
            </p>
          </div>
          <p className="text-base text-left text-black">주별 검사결과 요약</p>
          <Chart
            series={
              disable
                ? []
                : [
                    { name: 'Series 1', data: [10, 20, 30, 40, 50] },
                    // You can add more series if needed
                  ]
            }
          />
        </div>
      )}
    </div>
  );
};

export default ResultPage;
