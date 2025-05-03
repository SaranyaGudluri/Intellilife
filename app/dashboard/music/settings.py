import tkinter as tk
from tkinter import messagebox

def save_settings():
    messagebox.showinfo("Settings", "Settings saved successfully!")

root = tk.Tk()
root.title("Settings")
root.geometry("300x200")

tk.Label(root, text="Settings Menu", font=("Arial", 14)).pack(pady=10)
tk.Button(root, text="Save Settings", command=save_settings).pack(pady=5)

root.mainloop()