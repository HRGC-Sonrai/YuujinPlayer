import webview
import tkinter as tk
from PIL import Image, ImageTk
import time
import threading
import os
import sys
import queue
import traceback
import json

# 全局变量
lyrics_window = None
current_lyrics = ""

class MediaSessionAPI:
    """媒体会话API类，用于与前端通信"""
    
    def __init__(self):
        self.current_track = {}
        self.is_playing = False
        
    def update_media_info(self, track_info):
        """更新媒体信息"""
        try:
            self.current_track = track_info
            print(f"Media info updated: {track_info.get('title', 'Unknown')} - {track_info.get('artist', 'Unknown')}")
            return {"status": "success"}
        except Exception as e:
            print(f"Error updating media info: {e}")
            return {"status": "error", "message": str(e)}
    
    def set_playback_state(self, is_playing):
        """设置播放状态"""
        try:
            self.is_playing = is_playing
            print(f"Playback state: {'Playing' if is_playing else 'Paused'}")
            return {"status": "success"}
        except Exception as e:
            print(f"Error setting playback state: {e}")
            return {"status": "error", "message": str(e)}
    
    def get_media_info(self):
        """获取当前媒体信息"""
        return {
            "track": self.current_track,
            "isPlaying": self.is_playing
        }

# 启动图（考虑 DPI 缩放）
def show_splash(duration=5):
    try:
        root = tk.Tk()
        root.overrideredirect(True)
        root.attributes('-topmost', True)

        dpi_scale = root.winfo_fpixels('1i') / 96.0

        # Get the path to the splash image
        if getattr(sys, 'frozen', False):
            app_dir = os.path.dirname(sys.executable)
        else:
            app_dir = os.path.dirname(os.path.abspath(__file__))
        
        splash_path = os.path.join(app_dir, './resources/splash.png')
        
        # Use default image if splash.png doesn't exist
        if not os.path.exists(splash_path):
            splash_path = os.path.join(app_dir, 'assets', 'splash.png')
            if not os.path.exists(splash_path):
                img = Image.new('RGB', (800, 600), color=(0, 0, 0))
                splash_image = ImageTk.PhotoImage(img)
                new_width, new_height = 800, 600
            else:
                img = Image.open(splash_path)
                img_width, img_height = img.size
                scale = 0.35 * dpi_scale
                new_width = int(img_width * scale)
                new_height = int(img_height * scale)
                img = img.resize((new_width, new_height), Image.Resampling.BICUBIC)
                splash_image = ImageTk.PhotoImage(img)
        else:
            img = Image.open(splash_path)
            img_width, img_height = img.size
            scale = 0.35 * dpi_scale
            new_width = int(img_width * scale)
            new_height = int(img_height * scale)
            img = img.resize((new_width, new_height), Image.Resampling.BICUBIC)
            splash_image = ImageTk.PhotoImage(img)

        screen_width = root.winfo_screenwidth()
        screen_height = root.winfo_screenheight()
        x = (screen_width - new_width) // 2
        y = (screen_height - new_height) // 2
        root.geometry(f'{new_width}x{new_height}+{x}+{y}')

        label = tk.Label(root, image=splash_image)
        label.pack()

        def close_splash():
            time.sleep(duration)
            root.destroy()

        threading.Thread(target=close_splash).start()
        root.mainloop()
    except Exception as e:
        print(f"Error showing splash screen: {e}")
        traceback.print_exc()

def show_desktop_lyrics(lyrics_text):
    """显示桌面歌词"""
    global lyrics_window, current_lyrics
    
    try:
        current_lyrics = lyrics_text
        
        if not lyrics_text.strip():
            # 隐藏歌词窗口
            if lyrics_window:
                lyrics_window.destroy()
                lyrics_window = None
            return {"status": "success", "action": "hidden"}
        
        if not lyrics_window:
            # 创建新的歌词窗口
            lyrics_window = tk.Tk()
            lyrics_window.overrideredirect(True)
            lyrics_window.attributes('-topmost', True)
            lyrics_window.attributes('-alpha', 0.8)
            lyrics_window.configure(bg='black')
            
            # 设置窗口位置（屏幕底部）
            screen_width = lyrics_window.winfo_screenwidth()
            screen_height = lyrics_window.winfo_screenheight()
            
            window_width = 800
            window_height = 100
            x = (screen_width - window_width) // 2
            y = screen_height - window_height - 100
            
            lyrics_window.geometry(f'{window_width}x{window_height}+{x}+{y}')
            
            # 创建歌词标签
            lyrics_label = tk.Label(
                lyrics_window,
                text=lyrics_text,
                font=('Microsoft YaHei UI', 16, 'bold'),
                fg='white',
                bg='black',
                wraplength=750,
                justify='center'
            )
            lyrics_label.pack(expand=True, fill='both')
            lyrics_window.lyrics_label = lyrics_label
        else:
            # 更新现有窗口的歌词
            lyrics_window.lyrics_label.config(text=lyrics_text)
        
        return {"status": "success", "action": "shown"}
        
    except Exception as e:
        print(f"Error showing desktop lyrics: {e}")
        return {"status": "error", "message": str(e)}

# 创建主窗口
def create_window():
    try:
        # 创建API实例
        api = MediaSessionAPI()
        
        # 配置webview设置以改善媒体会话支持
        webview_config = {
            'debug': True,
            'private_mode': False,  # 禁用隐私模式
        }
        
        window = webview.create_window(
            title="Yuujin Player",
            url="index.html",
            width=1280,
            height=720,
            resizable=True,
            fullscreen=False,
            # 添加媒体会话相关的配置
            js_api=api,  # 暴露API给前端
        )

        # 启动webview
        webview.start(**webview_config)
        
        # 清理歌词窗口
        global lyrics_window
        if lyrics_window:
            try:
                lyrics_window.destroy()
                time.sleep(0.5)
            except Exception as e:
                print(f"Error cleaning up lyrics window: {e}")
                
    except Exception as e:
        print(f"Error creating window: {e}")
        traceback.print_exc()

# 主程序入口
if __name__ == "__main__":
    try:
        show_splash(5)
        create_window()
    except Exception as e:
        print(f"Fatal error: {e}")
        traceback.print_exc()
        input("按回车键退击...")
