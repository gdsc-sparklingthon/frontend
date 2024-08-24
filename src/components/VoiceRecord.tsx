import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import NotRecording from '../assets/notrecording.png';
import Recording from '../assets/recording.png';
import { useEffect } from 'react';

const VoiceRecord = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleToggleListening = () => {
    // if (listening) {
    //   SpeechRecognition.stopListening();
    // } else {
    //   SpeechRecognition.startListening({ language: 'ko' });
    // }
    if (!listening) {
      SpeechRecognition.startListening({ language: 'ko' });
    }
  };

  useEffect(() => {
    const handleEnd = async () => {
      try {
        // await axios.post('https://example.com/api/endpoint', { transcript });
        console.log('Transcript successfully sent to the server.');
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
    <div>
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
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceRecord;
