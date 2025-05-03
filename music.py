import sys
sys.stdout.reconfigure(encoding='utf-8')
import webbrowser
import random
import re
import speech_recognition as sr
from flask import Flask, request, jsonify
from flask_cors import CORS
from ytmusicapi import YTMusic

# Initialize YouTube Music API
ytmusic = YTMusic()

# Predefined Moods & Genre Keywords Translated into Various Languages
mood_to_genre = {
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
}

# Supported Language Codes
language_codes = {
    "English": ("en", "English"),
    "Spanish": ("es", "Spanish"),
    "French": ("fr", "French"),
    "German": ("de", "German"),
    "Hindi": ("hi", "Hindi"),
    "Telugu": ("te", "Telugu"),
    "Tamil": ("ta", "Tamil"),
    "Kannada": ("kn", "Kannada"),
    "Malayalam": ("ml", "Malayalam")
}

# Flask Application Setup
app = Flask(__name__)
CORS(app)

@app.route('/play_music', methods=['POST'])
def play_music():
    """Search for a random song on YouTube Music based on mood and language."""
    data = request.json
    mood = data.get('mood', 'Happy')
    language = data.get('language', 'English')

    try:
        # Get the genre in the selected language
        genre = mood_to_genre[mood][language]
        lang_name = language_codes[language][1]  # Get language name

        search_query = f"{genre} {lang_name} song"
        search_results = ytmusic.search(search_query, filter="songs", limit=10)

        if search_results:
            random_song = random.choice(search_results)
            video_id = random_song["videoId"]
            youtube_url = f"https://www.youtube.com/watch?v={video_id}"

            webbrowser.open(youtube_url)

            return jsonify({
                "status": "success", 
                "message": f"Playing {mood} music in {language}",
                "song_title": random_song.get('title', 'Unknown'),
                "url": youtube_url
            })
        else:
            return jsonify({
                "status": "error", 
                "message": f"No {language} songs found for this mood."
            })

    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": str(e)
        })

@app.route('/play_playlist', methods=['POST'])
def play_playlist():
    """Search for a random playlist on YouTube Music based on mood and language."""
    data = request.json
    mood = data.get('mood', 'Happy')
    language = data.get('language', 'English')

    try:
        # Get the genre in the selected language
        genre = mood_to_genre[mood][language]
        lang_name = language_codes[language][1]  # Get language name

        # Multiple search query strategies
        search_queries = [
            f"{genre} {lang_name} playlist",
            f"{mood.lower()} {lang_name} playlist",
            f"{genre} playlist",
            f"{lang_name} playlist",
            "playlist"
        ]

        for query in search_queries:
            search_results = ytmusic.search(query, filter="playlists", limit=5)
            
            if search_results:
                random_playlist = random.choice(search_results)
                playlist_id = random_playlist["browseId"]
                # youtube_url = f"https://music.youtube.com/playlist?list={playlist_id}"
                youtube_url = f"https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"

                webbrowser.open(youtube_url)

                return jsonify({
                    "status": "success", 
                    "message": f"Playing {mood} playlist in {language}",
                    "playlist_name": random_playlist.get('title', 'Unknown'),
                    "url": youtube_url
                })

        # If no playlists found after all attempts
        return jsonify({
            "status": "error", 
            "message": f"No {language} playlists found for this mood."
        })

    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": str(e)
        })

@app.route('/speech_to_song', methods=['POST'])
def speech_to_song():
    """Search and play a song based on speech input or provided song name."""
    try:
        # Check if song name is passed directly from frontend
        data = request.json
        song_name = data.get('song_name', '')
        
        if not song_name:
            # Use speech recognition if no song name provided
            recognizer = sr.Recognizer()
            with sr.Microphone() as source:
                print("🎤 Say the song name:")
                audio = recognizer.listen(source, timeout=5)
                song_name = recognizer.recognize_google(audio)
        
        # Search for the song on YouTube Music
        search_results = ytmusic.search(song_name, filter="songs", limit=1)
        
        if search_results:
            video_id = search_results[0]["videoId"]
            youtube_url = f"https://www.youtube.com/watch?v={video_id}"
            
            # Open in browser
            webbrowser.open(youtube_url)

            return jsonify({
                "status": "success", 
                "message": "Song found and playing",
                "song_name": song_name,
                "url": youtube_url
            })
        else:
            return jsonify({
                "status": "error", 
                "message": "Song not found"
            })

    except sr.UnknownValueError:
        return jsonify({
            "status": "error", 
            "message": "Could not understand audio"
        })
    except sr.RequestError:
        return jsonify({
            "status": "error", 
            "message": "Error connecting to speech service"
        })
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": str(e)
        })

# Run the Flask App
if __name__ == '__main__':
    app.run(debug=True, port=5000)