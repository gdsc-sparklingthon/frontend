import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import NotRecording from '../assets/notrecording.png';
import Recording from '../assets/recording.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface VoiceRecordProps {
  disabled?: boolean;
  nextQuestionId: string;
  setNextQuestionId: (nextQuestionId: string) => void;
  setQuestion: (question: string) => void;
}

const VoiceRecord = ({
  disabled,
  nextQuestionId,
  setNextQuestionId,
  setQuestion,
}: VoiceRecordProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isFirst, setIsFirst] = useState(true); // State to track if it's the first request
  const navigate = useNavigate();

  const handleToggleListening = () => {
    // if (listening) {
    //   SpeechRecognition.stopListening();
    // } else {
    //   SpeechRecognition.startListening({ language: 'ko' });
    // }
    if (!listening && !disabled) {
      SpeechRecognition.startListening({ language: 'ko' });
    }
  };

  useEffect(() => {
    const handleEnd = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인해주세요.');
        navigate('/login'); // Navigate to login if there's no token
        return;
      }

      try {
        console.log('Transcript successfully sent to the server.');
        const response = await axios.post(
          'http://cp-env.eba-q4sfsf24.ap-northeast-2.elasticbeanstalk.com/child/' +
            nextQuestionId +
            '/answer',
          {
            isFirst,
            answer: transcript,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Next Response:', response.data);
        const { question, questionId } = response.data;
        if (question) {
          setQuestion(question);
          setNextQuestionId(questionId);
          resetTranscript();
        } else {
          console.error('응답에 질문이 포함되어 있지 않습니다.');
        }

        if (isFirst) {
          setIsFirst(false);
        }
      } catch (error) {
        console.error('Error sending transcript to the server:', error);
      }
    };

    if (!listening && transcript) {
      handleEnd(); // Call handleEnd when not listening
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="z-10">
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      <button onClick={handleToggleListening}>
        <img
          src={listening ? Recording : NotRecording}
          alt={listening ? 'recording' : 'not recording'}
          className="w-[84px] h-[84px]"
        />
      </button>
      {/* <button onClick={handleStopListening}>Stop</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
    </div>
  );
};

export default VoiceRecord;
