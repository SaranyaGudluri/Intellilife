"use client";

import React, { useState } from 'react';
import axios from 'axios';

// Mood and Language Data
const moodToGenre = {
  "Happy": {
    "English": "pop",
    "Spanish": "pop español",
    "French": "pop français",
    "German": "deutscher pop",
    "Hindi": "हिंदी पॉप",
    "Telugu": "తెలుగు పాటలు",
    "Tamil": "தமிழ் பாடல்கள்",
    "Kannada": "ಕನ್ನಡ ಹಾಡುಗಳು",
    "Malayalam": "മലയാളം ഗാനങ്ങൾ"
  },
  "Sad": {
    "English": "acoustic",
    "Spanish": "acústico",
    "French": "acoustique",
    "German": "akustik",
    "Hindi": "दुखद गीत",
    "Telugu": "దుఖిత గీతాలు",
    "Tamil": "வருத்தமான பாடல்கள்",
    "Kannada": "ದುಃಖ ಗೀತೆಗಳು",
    "Malayalam": "സോന്ത് ഗാനങ്ങൾ"
  },
  "Relaxed": {
    "English": "jazz",
    "Spanish": "jazz relajado",
    "French": "jazz détendu",
    "German": "entspannter jazz",
    "Hindi": "आरामदायक संगीत",
    "Telugu": "శాంతి గీతాలు",
    "Tamil": "அரமிப்பு இசை",
    "Kannada": "ಶಾಂತಿ ಹಾಡುಗಳು",
    "Malayalam": "ശാന്തമായ സംഗീതം"
  },
  "Angry": {
    "English": "rock",
    "Spanish": "rock",
    "French": "rock",
    "German": "rock",
    "Hindi": "ग़ुस्से वाला गाना",
    "Telugu": "కోపం పాటలు",
    "Tamil": "கோபம் பாடல்கள்",
    "Kannada": "ಕೋಪ ಹಾಡುಗಳು",
    "Malayalam": "കോപത്തിനായുള്ള ഗാനങ്ങൾ"
  },
  "Energetic": {
    "English": "edm",
    "Spanish": "electrónica",
    "French": "électronique",
    "German": "elektronische musik",
    "Hindi": "ऊर्जावान गीत",
    "Telugu": "శక్తివంతమైన పాటలు",
    "Tamil": "ஆற்றல் வாய்ந்த பாடல்கள்",
    "Kannada": "ಶಕ್ತಿಯುತ ಹಾಡುಗಳು",
    "Malayalam": "ഉത്സാഹപൂർണമായ ഗാനങ്ങൾ"
  },
  "Romantic": {
    "English": "love songs",
    "Spanish": "canciones de amor",
    "French": "chansons d'amour",
    "German": "liebeslieder",
    "Hindi": "रोमांटिक गीत",
    "Telugu": "ప్రేమ పాటలు",
    "Tamil": "காதல் பாடல்கள்",
    "Kannada": "ಪ್ರೇಮ ಗೀತೆಗಳು",
    "Malayalam": "പ്രണയഗാനങ്ങൾ"
  },
  "Focused": {
    "English": "classical",
    "Spanish": "música clásica",
    "French": "musique classique",
    "German": "klassische musik",
    "Hindi": "शास्त्रीय संगीत",
    "Telugu": "శాస్త్రీయ సంగీతం",
    "Tamil": "சாஸ்திரிய இசை",
    "Kannada": "ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ",
    "Malayalam": "ശാസ്ത്രീയ സംഗീതം"
  },
  "Party": {
    "English": "dance",
    "Spanish": "música de fiesta",
    "French": "musique de fête",
    "German": "party-musik",
    "Hindi": "पार्टी संगीत",
    "Telugu": "పార్టీ పాటలు",
    "Tamil": "கூட்டம் பாடல்கள்",
    "Kannada": "ಪಾರ್ಟಿ ಹಾಡುಗಳು",
    "Malayalam": "പാർട്ടി സംഗീതം"
  },
  "Devotional": {
    "English": "devotional music",
    "Spanish": "música devocional",
    "French": "musique dévotionnelle",
    "German": "andachtsmusik",
    "Hindi": "भक्ति संगीत",
    "Telugu": "భక్తి గీతాలు",
    "Tamil": "பக்தி பாடல்கள்",
    "Kannada": "ಭಕ್ತಿಗೀತೆಗಳು",
    "Malayalam": "ഭക്തിഗാനങ്ങൾ"
  },
  "Calm": {
    "English": "ambient",
    "Spanish": "música ambiental",
    "French": "musique d'ambiance",
    "German": "umgebungsmusik",
    "Hindi": "शांतिपूर्ण संगीत",
    "Telugu": "ప్రశాంతమైన సంగీతం",
    "Tamil": "அமைதியான இசை",
    "Kannada": "ಶಾಂತ ಸಂಗೀತ",
    "Malayalam": "ശാന്തമായ സംഗീതം"
  }
};

const languages = [
  "English", "Spanish", "French", "German", 
  "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"
];

export default function MusicPlayer() {
  const [mood, setMood] = useState("Happy");
  const [language, setLanguage] = useState("English");
  const [speechResult, setSpeechResult] = useState("");

  const handlePlayMusic = async () => {
    try {
      const response = await axios.post('http://localhost:5000/play_music', { 
        mood, 
        language 
      });
      
      if (response.data.status === 'success') {
        console.log(`Playing ${mood} music in ${language}`);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error playing music", error);
    }
  };

  const handlePlayPlaylist = async () => {
    try {
      const response = await axios.post('http://localhost:5000/play_playlist', { 
        mood, 
        language 
      });
      
      if (response.data.status === 'success') {
        console.log(`Playing ${mood} playlist in ${language}`);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error playing playlist", error);
    }
  };

  const handleSpeechToSong = async () => {
    try {
      const response = await axios.post('http://localhost:5000/speech_to_song', {
        song_name: speechResult
      });
      
      if (response.data.status === 'success') {
        console.log(`Playing song: ${response.data.song_name}`);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error with speech to song", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#3bb6bf] flex flex-col items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Mood Music Player
        </h1>

        {/* Mood Selection */}
        <div className="mb-4">
          <label className="block text-white mb-2">Select Your Mood</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/30 text-black"
          >
            {Object.keys(moodToGenre).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <label className="block text-white mb-2">Select Language</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/30 text-black"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Speech Input for Song Name */}
        <div className="mb-6">
          <label className="block text-white mb-2">Speak Song Name</label>
          <div className="flex">
            <input 
              type="text" 
              value={speechResult}
              onChange={(e) => setSpeechResult(e.target.value)}
              placeholder="Song name will appear here"
              className="w-full p-2 rounded-lg bg-white/30 text-black mr-2"
            />
            <button 
              onClick={handleSpeechToSong}
              className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-lg"
            >
              🎤
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            onClick={handlePlayMusic}
            className="w-full bg-white/30 hover:bg-white/50 text-white py-3 rounded-lg transition duration-300"
          >
            🎵 Play Music
          </button>
          <button 
            onClick={handlePlayPlaylist}
            className="w-full bg-white/30 hover:bg-white/50 text-white py-3 rounded-lg transition duration-300"
          >
            📻 Play Playlist
          </button>
        </div>
      </div>
    </div>
  );
}