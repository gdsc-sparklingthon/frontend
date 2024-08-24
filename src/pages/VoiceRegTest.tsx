import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // Wrapper function for startListening
  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  };

  // Wrapper function for stopListening
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={handleStopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
