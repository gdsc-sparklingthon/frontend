import { useState } from 'react';
import ThreeLines from '../../assets/threelines.svg';
import Chart from '../../components/Chart';
import GradientCircle from '../../components/GradientCircle';
import Bar from '../../components/Bar';

const ResultPage = () => {
  const [isPastExist, setIsPastExist] = useState(false);

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-end">
        <img src={ThreeLines} alt="menu" className="px-[0.4rem] py-[0.4rem]" />
      </div>
      <p className="mt-[10px] text-2xl text-left text-black mb-4">
        김승윤 아이의 검사결과입니다.
      </p>
      <Bar />
      <div className="my-[20px]" style={{ border: '0.5px solid #C5C5C5' }} />
      <div className="flex flex-col items-stretch w-full">
        <p className="text-base text-left text-black mb-2">최근 검사결과</p>
        <div className="flex-grow flex items-center justify-center">
          <GradientCircle gradientColors={['#416BFF', '#FFFFFF']} />
        </div>
      </div>
      <div className="my-[20px]" style={{ border: '0.5px solid #C5C5C5' }} />
      <p className="text-base text-left text-black">주별 검사결과 요약</p>
      <Chart />
    </div>
  );
};

export default ResultPage;
