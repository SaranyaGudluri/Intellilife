import sys
sys.stdout.reconfigure(encoding='utf-8')
import webbrowser
import customtkinter as ctk
import speech_recognition as sr
import random
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from ytmusicapi import YTMusic

# Initialize YouTube Music API & Sentiment Analyzer
ytmusic = YTMusic()
analyzer = SentimentIntensityAnalyzer()

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

# Supported Languages (without country flags)
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


# GUI Application
class MoodMusicPlayer(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Mood-Based Music Player")
        self.geometry("500x500")

        # Mood Selection
        ctk.CTkLabel(self, text="Select Your Mood:", font=("Arial", 16)).pack(pady=5)
        self.mood_var = ctk.StringVar(value="Happy")
        self.mood_menu = ctk.CTkOptionMenu(self, values=list(mood_to_genre.keys()), variable=self.mood_var)
        self.mood_menu.pack(pady=5)

        # Language Selection
        ctk.CTkLabel(self, text="Select Language:", font=("Arial", 16)).pack(pady=5)
        self.lang_var = ctk.StringVar(value="English 🇬🇧")
        self.lang_menu = ctk.CTkOptionMenu(self, values=list(language_codes.keys()), variable=self.lang_var)
        self.lang_menu.pack(pady=5)

        # Buttons
        self.play_song_button = ctk.CTkButton(self, text="🎵 Play Music", command=self.play_music)
        self.play_song_button.pack(pady=10)

        self.play_playlist_button = ctk.CTkButton(self, text="📻 Play Playlist", command=self.play_playlist)
        self.play_playlist_button.pack(pady=10)

        self.speech_button = ctk.CTkButton(self, text="🎤 Speak Song Name", command=self.speech_to_song)
        self.speech_button.pack(pady=10)

    def play_music(self):
        #Search for a random song on YouTube Music based on mood and language.
        selected_mood = self.mood_var.get()
        selected_language = self.lang_var.get()
        # Get the genre in the selected language
        genre = mood_to_genre[selected_mood][selected_language]  
        lang_name = language_codes[selected_language][1]  # Get language name (e.g., "Hindi", "Telugu")

        search_query = f"{genre} {lang_name} song"
        search_results = ytmusic.search(search_query, filter="songs", limit=10)

        if search_results:
            random_song = random.choice(search_results)
            video_id = random_song["videoId"]
            youtube_url = f"https://www.youtube.com/watch?v={video_id}"

            webbrowser.open(youtube_url)
            print(f"🎶 Playing {selected_mood} music in {lang_name} on YouTube")
        else:
            print(f"⚠️ No {lang_name} songs found for this mood.")

    def play_playlist(self):
        """Search for a random playlist on YouTube Music based on mood and language."""
        selected_mood = self.mood_var.get()
        selected_language = self.lang_var.get()
        genre = mood_to_genre[selected_mood][selected_language]

        lang_name = language_codes[selected_language][1]  # Get language name (e.g., "Hindi", "Telugu")

        search_query = f"{genre} {lang_name} playlist"
        search_results = ytmusic.search(search_query, filter="playlists", limit=5)  # Get more results

        if search_results:
            random_playlist = random.choice(search_results)  # Pick a random playlist
            playlist_id = random_playlist["browseId"]
            youtube_url = f"https://music.youtube.com/playlist?list={playlist_id}"

            webbrowser.open(youtube_url)  # Opens playlist in browser
            print(f"📻 Playing {selected_mood} playlist in {lang_name} on YouTube")
        else:
            print(f"⚠️ No {lang_name} playlists found for this mood.")

    def speech_to_song(self):
        recognizer = sr.Recognizer()
        with sr.Microphone() as source:
            print("🎤 Say the song name:")
            try:
                audio = recognizer.listen(source, timeout=5)
                song_name = recognizer.recognize_google(audio)
                print(f"🔍 Searching for: {song_name}")
                search_results = ytmusic.search(song_name, filter="songs", limit=1)
                
                if search_results:
                    video_id = search_results[0]["videoId"]
                    webbrowser.open(f"https://www.youtube.com/watch?v={video_id}")
                    print(f"🎵 Playing: {song_name}")
                else:
                    print("⚠️ Song not found.")
            except sr.UnknownValueError:
                print("🤷 Could not understand audio.")
            except sr.RequestError:
                print("⚠️ Error connecting to speech service.")


    
# Run App
if __name__ == "__main__":
    app = MoodMusicPlayer()
    app.mainloop()