import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';
import './VoiceButton.css'; // Import custom CSS for animations

const VoiceButton = ({ onTranscript }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [showListening, setShowListening] = useState(false);
  const pauseTimer = useRef(null);

  useEffect(() => {
    let id;
    if (listening) {
      setShowListening(true);
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }
      pauseTimer.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        if (transcript.trim() === "") {
          console.log("I was not able to hear you");
          onTranscript("I was not able to hear you");
        } else {
          console.log(transcript);
          onTranscript(transcript);
        }
        setShowListening(false);
      }, 2000);
    } else {
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }
      setShowListening(false);
    }

    return () => {
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
      }
    };
  }, [listening, transcript, onTranscript]);

  const handleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      if (transcript.trim() === "") {
        console.log("I was not able to hear you");
        onTranscript("I was not able to hear you");
      } else {
        console.log(transcript);
        onTranscript(transcript);
      }
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="text-center mt-4">
      <div className={`microphone-container ${listening ? 'listening' : ''}`}>
        <button
          onClick={handleListening}
          className={`p-6 rounded-full text-yellow-100 ${listening ? 'bg-gray-500' : 'bg-teal-500'}`}
          disabled={listening}
        >
          <FaMicrophone size={100} />
        </button>
      </div>
      {showListening && <div className="text-yellow-100 mt-2 text-2xl font-thin subpixel-antialiased mt-16" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Listening...</div>}
    </div>
  );
};

export default VoiceButton;
