import customtkinter as ctk
from PIL import Image
import os
from flask_cors import CORS

#app = Flask(__name__)
#CORS(app)  # Enable CORS for all routes


# Create Main Home Page Window
class HomePage(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Mood-Based Music Player")
        self.geometry("600x400")

        bg_image = Image.open("background.webp")  # Ensure this file exists
        self.bg_photo = ctk.CTkImage(light_image=bg_image, size=(600, 400))

        self.bg_label = ctk.CTkLabel(self, image=self.bg_photo, text="")
        self.bg_label.place(relwidth=1, relheight=1)

        # Title
        ctk.CTkLabel(self, text="Mood-Based Music Player 🎵", font=("Arial", 24, "bold")).pack(pady=20)

        # Buttons
        ctk.CTkButton(self, text="🎶 Start Music Player", command=self.open_music_player, font=("Arial", 16)).pack(pady=10)
        ctk.CTkButton(self, text="⚙️ Settings", command=self.open_settings, font=("Arial", 16)).pack(pady=10)
        ctk.CTkButton(self, text="❌ Exit", command=self.quit, font=("Arial", 16), fg_color="red").pack(pady=20)

    def open_music_player(self):
        os.system("python music_player.py")  # Opens the music player script

    def open_settings(self):
        os.system("python settings.py")  # Opens the settings page (To be created later)

# Run Home Page
if __name__ == "__main__":
    app = HomePage()
    app.mainloop()