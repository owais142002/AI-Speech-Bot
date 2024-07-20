import React, { useState } from 'react';
import Header from './components/Header';
import VoiceButton from './components/VoiceButton';
import Bot from './components/Bot';
import Loader from './components/Loader'; // Import the Loader component

const App = () => {
  const [responseText, setResponseText] = useState('');
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleTranscript = async (transcript) => {
    setLoading(true); // Show loading indicator when request starts
    if (transcript === "I was not able to hear you") {
      setResponseText(transcript);
      setIsBotSpeaking(true);
      setLoading(false); // Hide loading indicator
    } else {
      try {
        const response = await fetch('http://localhost:5000/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: transcript }),
        });
        const answer = await response.json();
        console.log(answer);
        setResponseText(answer['answer']); // Adjust according to your API response
        setIsBotSpeaking(true);
      } catch (error) {
        console.error("Error sending request:", error);
        setResponseText("There was an error processing your request.");
        setIsBotSpeaking(true);
      } finally {
        setLoading(false); // Hide loading indicator when request is done
      }
    }
  };

  const handleBotFinished = () => {
    setIsBotSpeaking(false);
    setResponseText(''); // Clear response text to show VoiceButton again
  };

  return (
    <div className="App">
      <div className="bg-gradient-to-r from-green-400 via-lime-500 to-teal-600 h-screen flex-col flex items-center ">
        <div className="w-9/12 text-center">
          <Header />
        </div>
        {loading ? (
          <Loader />
        ) : !isBotSpeaking ? (
          <VoiceButton onTranscript={handleTranscript} />
        ) : (
          <Bot responseText={responseText} onFinished={handleBotFinished} />
        )}
      </div>
    </div>
  );
};

export default App;
