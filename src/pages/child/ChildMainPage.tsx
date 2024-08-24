import Bear from '../../assets/bear.png';
import VoiceRecord from '../../components/VoiceRecord';

// TODO: polling -> for response

const ChildMainPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div
        className="mt-[50px] mx-[10px] py-[10px] w-full h-[100px] text-center text-black border border-[#C5C5C5] rounded-lg flex items-center justify-center"
        style={{ border: '1px solid #C5C5C5' }} // border를 추가
      >
        <p className="text-[17px] text-center text-black">솰라솰라솰라</p>
      </div>
      <img
        src={Bear}
        alt="bear"
        className="h-[500px]"
        style={{ transform: 'scale(0.5)' }}
      />
      <VoiceRecord />
    </div>
  );
};

export default ChildMainPage;
