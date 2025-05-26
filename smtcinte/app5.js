// app5.js - 浏览器媒体会话控制集成
// Browser Media Session Control Integration for Yuujin Player

/**
 * 媒体会话管理器
 * Media Session Manager
 */
const MediaSessionManager = {
  // Vue应用实例引用
  vueApp: null,

  // 是否支持Media Session API
  isSupported: false,

  // 当前媒体元数据
  currentMetadata: null,

  // 支持的媒体控制动作
  supportedActions: ["play", "pause", "previoustrack", "nexttrack", "seekbackward", "seekforward", "seekto"],

  /**
   * 初始化媒体会话管理器
   * Initialize Media Session Manager
   * @param {Object} vueApp Vue应用实例
   */
  init(vueApp) {
    this.vueApp = vueApp

    // 检查浏览器支持
    this.isSupported = "mediaSession" in navigator

    if (!this.isSupported) {
      console.warn("Media Session API is not supported in this browser")
      return false
    }

    console.log("Initializing Media Session Manager...")

    // 注册媒体控制事件处理器
    this.registerActionHandlers()

    // 监听Vue应用的状态变化
    this.setupVueWatchers()

    // 初始化媒体元数据
    this.updateMediaMetadata()

    console.log("Media Session Manager initialized successfully")
    return true
  },

  /**
   * 注册媒体控制动作处理器
   * Register media control action handlers
   */
  registerActionHandlers() {
    if (!this.isSupported) return

    try {
      // 播放控制
      navigator.mediaSession.setActionHandler("play", () => {
        console.log("Media Session: Play action triggered")
        if (this.vueApp && !this.vueApp.isPlaying) {
          this.vueApp.togglePlay()
        }
      })

      navigator.mediaSession.setActionHandler("pause", () => {
        console.log("Media Session: Pause action triggered")
        if (this.vueApp && this.vueApp.isPlaying) {
          this.vueApp.togglePlay()
        }
      })

      // 曲目控制
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        console.log("Media Session: Previous track action triggered")
        if (this.vueApp) {
          this.vueApp.playPrevious()
        }
      })

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        console.log("Media Session: Next track action triggered")
        if (this.vueApp) {
          this.vueApp.playNext()
        }
      })

      // 快进/快退控制
      navigator.mediaSession.setActionHandler("seekbackward", (details) => {
        console.log("Media Session: Seek backward action triggered", details)
        if (this.vueApp && this.vueApp.audio) {
          const seekTime = details.seekOffset || 10 // 默认后退10秒
          this.vueApp.audio.currentTime = Math.max(0, this.vueApp.audio.currentTime - seekTime)
        }
      })

      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        console.log("Media Session: Seek forward action triggered", details)
        if (this.vueApp && this.vueApp.audio) {
          const seekTime = details.seekOffset || 10 // 默认前进10秒
          this.vueApp.audio.currentTime = Math.min(
            this.vueApp.audio.duration || 0,
            this.vueApp.audio.currentTime + seekTime,
          )
        }
      })

      // 精确定位控制
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        console.log("Media Session: Seek to action triggered", details)
        if (this.vueApp && this.vueApp.audio && details.seekTime !== undefined) {
          this.vueApp.audio.currentTime = details.seekTime
        }
      })

      console.log("Media Session action handlers registered successfully")
    } catch (error) {
      console.error("Error registering media session action handlers:", error)
    }
  },

  /**
   * 设置Vue应用状态监听器
   * Setup Vue app state watchers
   */
  setupVueWatchers() {
    if (!this.vueApp) return

    // 监听当前曲目变化
    this.vueApp.$watch("currentTrackIndex", () => {
      this.updateMediaMetadata()
    })

    // 监听播放状态变化
    this.vueApp.$watch("isPlaying", (newState) => {
      this.updatePlaybackState(newState)
    })

    // 监听播放进度变化
    this.vueApp.$watch("currentTime", () => {
      this.updatePositionState()
    })

    // 监听音量变化
    this.vueApp.$watch("volume", (newVolume) => {
      this.updateVolumeState(newVolume)
    })
  },

  /**
   * 更新媒体元数据
   * Update media metadata
   */
  updateMediaMetadata() {
    if (!this.isSupported || !this.vueApp) return

    try {
      const currentTrack = this.vueApp.currentTrack

      if (!currentTrack || !currentTrack.title) {
        // 清除媒体元数据
        navigator.mediaSession.metadata = null
        this.currentMetadata = null
        return
      }

      // 创建媒体元数据
      const metadata = {
        title: currentTrack.title || "Unknown Title",
        artist: currentTrack.artist || "Unknown Artist",
        album: currentTrack.album || "Unknown Album",
        artwork: [],
      }

      // 添加封面艺术
      if (currentTrack.coverArt && currentTrack.coverArt !== "https://via.placeholder.com/300") {
        metadata.artwork = [
          {
            src: currentTrack.coverArt,
            sizes: "96x96",
            type: "image/jpeg",
          },
          {
            src: currentTrack.coverArt,
            sizes: "128x128",
            type: "image/jpeg",
          },
          {
            src: currentTrack.coverArt,
            sizes: "192x192",
            type: "image/jpeg",
          },
          {
            src: currentTrack.coverArt,
            sizes: "256x256",
            type: "image/jpeg",
          },
          {
            src: currentTrack.coverArt,
            sizes: "384x384",
            type: "image/jpeg",
          },
          {
            src: currentTrack.coverArt,
            sizes: "512x512",
            type: "image/jpeg",
          },
        ]
      }

      // 设置媒体元数据
      navigator.mediaSession.metadata = new MediaMetadata(metadata)
      this.currentMetadata = metadata

      console.log("Media metadata updated:", metadata)

      // 显示通知（如果可用）
      if (window.showToast) {
        window.showToast(`Now playing: ${metadata.title} - ${metadata.artist}`, "music", {
          duration: 3000,
          id: "media-session-update",
        })
      }
    } catch (error) {
      console.error("Error updating media metadata:", error)
    }
  },

  /**
   * 更新播放状态
   * Update playback state
   * @param {boolean} isPlaying 是否正在播放
   */
  updatePlaybackState(isPlaying) {
    if (!this.isSupported) return

    try {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused"
      console.log(`Media Session playback state updated: ${isPlaying ? "playing" : "paused"}`)
    } catch (error) {
      console.error("Error updating playback state:", error)
    }
  },

  /**
   * 更新播放位置状态
   * Update position state
   */
  updatePositionState() {
    if (!this.isSupported || !this.vueApp) return

    try {
      const audio = this.vueApp.audio
      const isMidi = this.vueApp.isMidiTrack

      let duration, position, playbackRate

      if (isMidi && this.vueApp.midiPlayer) {
        // MIDI播放器的位置信息
        duration = this.vueApp.midiPlayer.getSongTime(true) || 0
        position = this.vueApp.midiPlayer.getSongTime() || 0
        playbackRate = 1.0 // MIDI播放器通常是固定播放速率
      } else if (audio) {
        // 音频播放器的位置信息
        duration = audio.duration || 0
        position = audio.currentTime || 0
        playbackRate = audio.playbackRate || 1.0
      } else {
        return
      }

      // 只有当有有效的持续时间时才更新位置状态
      if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
        navigator.mediaSession.setPositionState({
          duration: duration,
          playbackRate: playbackRate,
          position: Math.min(position, duration),
        })
      }
    } catch (error) {
      console.error("Error updating position state:", error)
    }
  },

  /**
   * 更新音量状态（自定义扩展）
   * Update volume state (custom extension)
   * @param {number} volume 音量值 (0-100)
   */
  updateVolumeState(volume) {
    // Media Session API 本身不支持音量控制
    // 但我们可以在这里添加自定义逻辑
    console.log(`Volume updated: ${volume}%`)

    // 可以触发自定义事件供其他组件使用
    const event = new CustomEvent("yuujin-volume-changed", {
      detail: { volume: volume },
    })
    document.dispatchEvent(event)
  },

  /**
   * 获取媒体会话信息
   * Get media session info
   * @returns {Object} 媒体会话信息
   */
  getMediaSessionInfo() {
    if (!this.isSupported) {
      return { supported: false }
    }

    return {
      supported: true,
      playbackState: navigator.mediaSession.playbackState,
      metadata: this.currentMetadata,
      supportedActions: this.supportedActions,
    }
  },

  /**
   * 清除媒体会话
   * Clear media session
   */
  clearMediaSession() {
    if (!this.isSupported) return

    try {
      navigator.mediaSession.metadata = null
      navigator.mediaSession.playbackState = "none"
      this.currentMetadata = null
      console.log("Media session cleared")
    } catch (error) {
      console.error("Error clearing media session:", error)
    }
  },

  /**
   * 设置自定义动作处理器
   * Set custom action handler
   * @param {string} action 动作名称
   * @param {Function} handler 处理函数
   */
  setCustomActionHandler(action, handler) {
    if (!this.isSupported) return false

    try {
      navigator.mediaSession.setActionHandler(action, handler)
      console.log(`Custom action handler set for: ${action}`)
      return true
    } catch (error) {
      console.error(`Error setting custom action handler for ${action}:`, error)
      return false
    }
  },

  /**
   * 移除动作处理器
   * Remove action handler
   * @param {string} action 动作名称
   */
  removeActionHandler(action) {
    if (!this.isSupported) return

    try {
      navigator.mediaSession.setActionHandler(action, null)
      console.log(`Action handler removed for: ${action}`)
    } catch (error) {
      console.error(`Error removing action handler for ${action}:`, error)
    }
  },
}

/**
 * 媒体会话增强功能
 * Media Session Enhancement Features
 */
const MediaSessionEnhancements = {
  /**
   * 添加键盘媒体键支持
   * Add keyboard media keys support
   */
  addKeyboardMediaKeysSupport() {
    document.addEventListener("keydown", (event) => {
      // 检查是否按下了媒体键
      switch (event.code) {
        case "MediaPlayPause":
          event.preventDefault()
          if (MediaSessionManager.vueApp) {
            MediaSessionManager.vueApp.togglePlay()
          }
          break
        case "MediaTrackNext":
          event.preventDefault()
          if (MediaSessionManager.vueApp) {
            MediaSessionManager.vueApp.playNext()
          }
          break
        case "MediaTrackPrevious":
          event.preventDefault()
          if (MediaSessionManager.vueApp) {
            MediaSessionManager.vueApp.playPrevious()
          }
          break
        case "MediaStop":
          event.preventDefault()
          if (MediaSessionManager.vueApp && MediaSessionManager.vueApp.isPlaying) {
            MediaSessionManager.vueApp.togglePlay()
          }
          break
      }
    })

    console.log("Keyboard media keys support added")
  },

  /**
   * 添加通知支持
   * Add notification support
   */
  addNotificationSupport() {
    // 监听曲目变化事件
    document.addEventListener("yuujin-language-changed", () => {
      // 语言变化时重新更新媒体元数据以使用新语言
      setTimeout(() => {
        MediaSessionManager.updateMediaMetadata()
      }, 100)
    })
  },

  /**
   * 添加后台播放支持提示
   * Add background playback support hint
   */
  addBackgroundPlaybackHint() {
    // 检测页面可见性变化
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && MediaSessionManager.vueApp && MediaSessionManager.vueApp.isPlaying) {
        console.log("Page hidden, media session should continue playback in background")

        // 显示后台播放提示（如果支持通知）
        if (window.showToast && !document.hidden) {
          window.showToast("Music will continue playing in background", "info", {
            duration: 2000,
            id: "background-playback",
          })
        }
      }
    })
  },
}

/**
 * 初始化媒体会话功能
 * Initialize media session functionality
 */
function initializeMediaSession() {
  // 等待Vue应用加载完成
  const checkVueLoaded = setInterval(() => {
    const app = document.querySelector("#app").__vue__
    if (app) {
      clearInterval(checkVueLoaded)

      console.log("Initializing Media Session integration...")

      // 初始化媒体会话管理器
      const initialized = MediaSessionManager.init(app)

      if (initialized) {
        // 添加增强功能
        MediaSessionEnhancements.addKeyboardMediaKeysSupport()
        MediaSessionEnhancements.addNotificationSupport()
        MediaSessionEnhancements.addBackgroundPlaybackHint()

        // 将功能暴露到全局作用域
        window.MediaSessionManager = MediaSessionManager
        window.getMediaSessionInfo = () => MediaSessionManager.getMediaSessionInfo()
        window.clearMediaSession = () => MediaSessionManager.clearMediaSession()

        console.log("Media Session integration initialized successfully")
        console.log("Available functions: getMediaSessionInfo(), clearMediaSession()")

        // 显示初始化完成通知
        setTimeout(() => {
          if (window.showToast) {
            window.showToast("Media controls integration enabled", "info", {
              duration: 2000,
              id: "media-session-init",
            })
          }
        }, 1000)
      }
    }
  }, 100)

  // 防止无限等待
  setTimeout(() => {
    clearInterval(checkVueLoaded)
    console.warn("Vue app not found within timeout, Media Session not initialized")
  }, 10000)
}

// 监听DOM加载完成事件
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMediaSession)
} else {
  initializeMediaSession()
}

// 导出模块（如果使用模块系统）
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MediaSessionManager, MediaSessionEnhancements }
}
