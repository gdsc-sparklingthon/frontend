import { useState } from 'react';
import ThreeLines from '../../assets/threelines.svg';
import X from '../../assets/x.svg';
import Chart from '../../components/Chart';
import GradientCircle from '../../components/GradientCircle';
import Bar from '../../components/Bar';
import Profile from '../../components/Profile';

const ResultPage = () => {
  const [isProfile, setIsProfile] = useState(true);
  const [isPastExist, setIsPastExist] = useState(false);
  let name = '김승윤';

  const toggleModal = () => setIsProfile(!isProfile);

  return (
    <div
      className="flex flex-col p-4"
      style={{
        background: 'linear-gradient(to bottom, #fff6e5 -44.23%, #fff 78.68%)',
      }}
    >
      <div className="flex justify-end">
        <img
          src={isProfile ? ThreeLines : X}
          alt="menu"
          className="px-[0.3rem] pb-[0.3rem]"
          onClick={toggleModal}
        />
      </div>
      {isProfile ? (
        <div>
          <p className="text-2xl text-left text-black mb-4">
            <strong>{name}</strong> 아이의 검사결과입니다.
          </p>
          <Bar percentage={80} />
          <div
            className="px-[15px] py-[20px] my-[20px] flex flex-col items-stretch w-full rounded-[21px] bg-white"
            style={{ boxShadow: '2px 2px 5px 0 rgba(57,57,57,0.25)' }}
          >
            <p className="text-base text-left text-black mb-2">
              가장 최근 검사결과
            </p>
            <div className="flex-grow flex items-center justify-center">
              <GradientCircle gradientColors={['#416BFF', '#FFFFFF']} />
            </div>
            <p className="text-sm text-right text-[#8d8d8d] cursor-pointer">
              상세 결과 보기 &gt;
            </p>
          </div>
          <p className="text-base text-left text-black">주별 검사결과 요약</p>
          <Chart />
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default ResultPage;
