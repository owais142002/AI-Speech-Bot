// src/components/Bot.js
import React, { useEffect, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import './Bot.css'; // Import custom CSS for animations

const Bot = ({ responseText, onFinished }) => {
  const [words, setWords] = useState([]);
  
  useEffect(() => {
    if (responseText) {
      const wordArray = responseText.split(' ');
      const utterance = new SpeechSynthesisUtterance(responseText);

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setWords((prevWords) => {
            const newWords = [...prevWords, wordArray.shift()];
            return newWords.slice(-8);
          });
        }
      };

      utterance.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
        if (onFinished) {
          onFinished();
        }
      };

      utterance.onerror = (event) => console.log('SpeechSynthesisUtterance.onerror', event);

      window.speechSynthesis.speak(utterance);
    }
  }, [responseText, onFinished]);

  return (
    <div className="text-center mt-4">
      {responseText && (
        <div className="speaker-container">
          <button className='p-6 rounded-full text-yellow-100 bg-teal-500'>
            <FaVolumeUp size={100} />
          </button>
          <div className="words-container">
            {words.map((word, index) => (
              <span  key={index} className="word text-yellow-100 mt-2 text-2xl font-thin subpixel-antialiased text-yellow-100 mt-16">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;
