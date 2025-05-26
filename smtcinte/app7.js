// app7.js - 动态歌词媒体会话集成
// Dynamic Lyrics Media Session Integration

/**
 * 动态歌词媒体会话管理器
 * Dynamic Lyrics Media Session Manager
 */
const DynamicLyricsMediaSessionManager = {
  // Vue应用实例引用
  vueApp: null,

  // 是否支持Media Session API
  isSupported: false,

  // 当前媒体元数据
  currentMetadata: null,

  // 原始歌曲信息
  originalTrackInfo: null,

  // 是否启用动态歌词显示
  dynamicLyricsEnabled: true,

  // 歌词更新间隔ID
  lyricsUpdateInterval: null,

  // 上次更新的歌词内容
  lastLyricContent: "",

  // 是否在PyWebView环境中
  isPyWebView: false,

  /**
   * 初始化动态歌词媒体会话管理器
   * Initialize Dynamic Lyrics Media Session Manager
   * @param {Object} vueApp Vue应用实例
   */
  init(vueApp) {
    this.vueApp = vueApp

    // 检查浏览器支持
    this.isSupported = "mediaSession" in navigator
    this.isPyWebView = window.pywebview !== undefined

    if (!this.isSupported && !this.isPyWebView) {
      console.warn("Media Session API is not supported and not in PyWebView environment")
      return false
    }

    console.log("Initializing Dynamic Lyrics Media Session Manager...")

    // 注册媒体控制事件处理器
    this.registerActionHandlers()

    // 监听Vue应用的状态变化
    this.setupVueWatchers()

    // 初始化媒体元数据
    this.updateMediaMetadata()

    // 启动歌词更新循环
    this.startLyricsUpdateLoop()

    console.log("Dynamic Lyrics Media Session Manager initialized successfully")
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
          const seekTime = details.seekOffset || 10
          this.vueApp.audio.currentTime = Math.max(0, this.vueApp.audio.currentTime - seekTime)
        }
      })

      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        console.log("Media Session: Seek forward action triggered", details)
        if (this.vueApp && this.vueApp.audio) {
          const seekTime = details.seekOffset || 10
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
      this.updateOriginalTrackInfo()
      this.updateMediaMetadata()
    })

    // 监听播放状态变化
    this.vueApp.$watch("isPlaying", (newState) => {
      this.updatePlaybackState(newState)
      if (newState) {
        this.startLyricsUpdateLoop()
      } else {
        this.stopLyricsUpdateLoop()
      }
    })

    // 监听歌词变化
    this.vueApp.$watch("lyrics", () => {
      console.log("Lyrics data changed, updating media session...")
    })

    // 监听活跃歌词索引变化
    this.vueApp.$watch("activeLyricIndex", () => {
      this.updateLyricsInMediaSession()
    })
  },

  /**
   * 更新原始歌曲信息
   * Update original track info
   */
  updateOriginalTrackInfo() {
    if (!this.vueApp) return

    const currentTrack = this.vueApp.currentTrack
    if (currentTrack && currentTrack.title) {
      this.originalTrackInfo = {
        title: currentTrack.title,
        artist: currentTrack.artist || "Unknown Artist",
        album: currentTrack.album || "Unknown Album",
        coverArt: currentTrack.coverArt,
      }
    } else {
      this.originalTrackInfo = null
    }
  },

  /**
   * 获取当前歌词内容
   * Get current lyric content
   * @returns {Object} 包含歌词文本和翻译的对象
   */
  getCurrentLyricContent() {
    // 添加调试信息
    console.log("getCurrentLyricContent - Debug info:", {
      hasVueApp: !!this.vueApp,
      hasLyrics: !!this.vueApp?.lyrics,
      lyricsLength: this.vueApp?.lyrics?.length || 0,
      activeLyricIndex: this.vueApp?.activeLyricIndex,
      currentTrack: this.vueApp?.currentTrack?.title,
    })

    // 检查是否有Vue应用
    if (!this.vueApp) {
      console.log("No Vue app available")
      return { lyricText: "", translation: "", hasLyrics: false }
    }

    // 检查是否有歌词数据 - 修改这里的逻辑
    // 只要歌词数组存在（即使为空），也认为是有歌词文件的
    if (!this.vueApp.lyrics) {
      console.log("No lyrics data available")
      return { lyricText: "", translation: "", hasLyrics: false }
    }

    // 如果歌词数组为空，说明有歌词文件但内容为空
    if (this.vueApp.lyrics.length === 0) {
      console.log("Lyrics array is empty but exists")
      return { lyricText: "", translation: "", hasLyrics: true }
    }

    const activeLyricIndex = this.vueApp.activeLyricIndex
    console.log("Active lyric index:", activeLyricIndex)

    // 检查索引是否有效
    if (activeLyricIndex < 0 || activeLyricIndex >= this.vueApp.lyrics.length) {
      console.log("Invalid lyric index, but has lyrics file")
      return { lyricText: "", translation: "", hasLyrics: true }
    }

    const activeLyric = this.vueApp.lyrics[activeLyricIndex]
    if (!activeLyric || !activeLyric.parts) {
      console.log("No active lyric or parts, but has lyrics file")
      return { lyricText: "", translation: "", hasLyrics: true }
    }

    // 拼接歌词文本
    const lyricText = activeLyric.parts.map((part) => part.text).join("")

    // 获取翻译
    const translation = this.vueApp.translations && activeLyric.time ? this.vueApp.translations[activeLyric.time] : ""

    console.log("Current lyric content:", {
      lyricText: lyricText.trim(),
      translation: translation.trim(),
      hasLyrics: true,
    })

    return {
      lyricText: lyricText.trim(),
      translation: translation.trim(),
      hasLyrics: true,
    }
  },

  /**
   * 启动歌词更新循环
   * Start lyrics update loop
   */
  startLyricsUpdateLoop() {
    // 清除现有的更新循环
    this.stopLyricsUpdateLoop()

    // 启动新的更新循环
    this.lyricsUpdateInterval = setInterval(() => {
      this.updateLyricsInMediaSession()
    }, 500) // 每500ms更新一次

    console.log("Lyrics update loop started")
  },

  /**
   * 停止歌词更新循环
   * Stop lyrics update loop
   */
  stopLyricsUpdateLoop() {
    if (this.lyricsUpdateInterval) {
      clearInterval(this.lyricsUpdateInterval)
      this.lyricsUpdateInterval = null
      console.log("Lyrics update loop stopped")
    }
  },

  /**
   * 更新媒体会话中的歌词
   * Update lyrics in media session
   */
  updateLyricsInMediaSession() {
    if (!this.dynamicLyricsEnabled || !this.originalTrackInfo) {
      console.log("Dynamic lyrics disabled or no track info")
      return
    }

    const lyricContent = this.getCurrentLyricContent()
    console.log("Updating media session with lyric content:", lyricContent)

    // 检查歌词内容是否有变化
    const currentLyricKey = `${lyricContent.lyricText}|${lyricContent.translation}|${lyricContent.hasLyrics}`
    if (currentLyricKey === this.lastLyricContent) {
      return // 没有变化，不需要更新
    }

    this.lastLyricContent = currentLyricKey

    // 构建媒体元数据
    let displayTitle, displayArtist

    console.log("Processing lyric content:", {
      hasLyrics: lyricContent.hasLyrics,
      lyricText: lyricContent.lyricText,
      translation: lyricContent.translation,
    })

    if (lyricContent.hasLyrics) {
      // 有歌词文件时：始终使用歌词显示格式
      console.log("Has lyrics file - using lyrics format")

      if (lyricContent.lyricText) {
        // 有当前歌词文本
        displayTitle = lyricContent.lyricText
        console.log("Using lyric text as title:", displayTitle)

        // 如果有翻译，添加到标题中
        if (lyricContent.translation) {
          displayTitle += ` (${lyricContent.translation})`
          console.log("Added translation to title:", displayTitle)
        }
      } else {
        // 没有当前歌词文本（如间奏部分），显示歌曲名
        displayTitle = this.originalTrackInfo.title
        console.log("No current lyric, using song title:", displayTitle)
      }

      // 艺术家始终显示"歌名 - 歌手"格式
      displayArtist = `${this.originalTrackInfo.title} - ${this.originalTrackInfo.artist}`
      console.log("Using lyrics format for artist:", displayArtist)
    } else {
      // 完全没有歌词文件时：使用原始信息
      console.log("No lyrics file - using original format")
      displayTitle = this.originalTrackInfo.title
      displayArtist = this.originalTrackInfo.artist
      console.log("Using original format:", { displayTitle, displayArtist })
    }

    console.log("Final display info:", { displayTitle, displayArtist })

    // 更新媒体元数据
    this.updateMediaMetadataWithCustomInfo(displayTitle, displayArtist)

    // 更新窗口标题
    this.updateWindowTitle(displayTitle, displayArtist)

    // 如果在PyWebView环境中，同步到Python
    this.syncToPython(displayTitle, displayArtist)
  },

  /**
   * 使用自定义信息更新媒体元数据
   * Update media metadata with custom info
   * @param {string} title 显示标题
   * @param {string} artist 显示艺术家
   */
  updateMediaMetadataWithCustomInfo(title, artist) {
    if (!this.isSupported || !this.originalTrackInfo) return

    try {
      // 创建封面艺术数组
      const artwork = []
      if (this.originalTrackInfo.coverArt && this.originalTrackInfo.coverArt !== "https://via.placeholder.com/300") {
        const sizes = ["96x96", "128x128", "192x192", "256x256", "384x384", "512x512"]
        sizes.forEach((size) => {
          artwork.push({
            src: this.originalTrackInfo.coverArt,
            sizes: size,
            type: "image/jpeg",
          })
        })
      }

      // 设置媒体元数据
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: this.originalTrackInfo.album,
        artwork: artwork,
      })

      this.currentMetadata = {
        title: title,
        artist: artist,
        album: this.originalTrackInfo.album,
        artwork: this.originalTrackInfo.coverArt,
      }

      console.log(`Media metadata updated - Title: "${title}", Artist: "${artist}"`)
    } catch (error) {
      console.error("Error updating media metadata:", error)
    }
  },

  /**
   * 更新常规媒体元数据（无歌词时使用）
   * Update regular media metadata (used when no lyrics)
   */
  updateMediaMetadata() {
    this.updateOriginalTrackInfo()

    if (!this.originalTrackInfo) {
      // 清除媒体元数据
      if (this.isSupported) {
        navigator.mediaSession.metadata = null
      }
      this.currentMetadata = null
      return
    }

    // 使用原始信息更新
    this.updateMediaMetadataWithCustomInfo(this.originalTrackInfo.title, this.originalTrackInfo.artist)
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
        duration = this.vueApp.midiPlayer.getSongTime(true) || 0
        position = this.vueApp.midiPlayer.getSongTime() || 0
        playbackRate = 1.0
      } else if (audio) {
        duration = audio.duration || 0
        position = audio.currentTime || 0
        playbackRate = audio.playbackRate || 1.0
      } else {
        return
      }

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
   * 更新窗口标题
   * Update window title
   * @param {string} title 显示标题
   * @param {string} artist 显示艺术家
   */
  updateWindowTitle(title, artist) {
    const playingIndicator = this.vueApp && this.vueApp.isPlaying ? "▶ " : "⏸ "

    // 限制标题长度以避免窗口标题过长
    const maxTitleLength = 50
    let displayTitle = title
    if (displayTitle.length > maxTitleLength) {
      displayTitle = displayTitle.substring(0, maxTitleLength) + "..."
    }

    document.title = `${playingIndicator}${displayTitle} | Yuujin Player`
  },

  /**
   * 同步到Python（PyWebView环境）
   * Sync to Python (PyWebView environment)
   * @param {string} title 显示标题
   * @param {string} artist 显示艺术家
   */
  async syncToPython(title, artist) {
    if (!this.isPyWebView || !window.pywebview || !window.pywebview.api) return

    try {
      const mediaInfo = {
        title: title,
        artist: artist,
        album: this.originalTrackInfo ? this.originalTrackInfo.album : "",
        artwork: this.originalTrackInfo ? this.originalTrackInfo.coverArt : "",
      }

      await window.pywebview.api.update_media_info(mediaInfo)
    } catch (error) {
      console.error("Error syncing to Python:", error)
    }
  },

  /**
   * 切换动态歌词显示
   * Toggle dynamic lyrics display
   * @param {boolean} enabled 是否启用
   */
  toggleDynamicLyrics(enabled) {
    this.dynamicLyricsEnabled = enabled

    if (enabled) {
      console.log("Dynamic lyrics display enabled")
      this.startLyricsUpdateLoop()
      this.updateLyricsInMediaSession()
    } else {
      console.log("Dynamic lyrics display disabled")
      this.stopLyricsUpdateLoop()
      this.updateMediaMetadata() // 恢复原始信息
    }

    // 保存设置到localStorage
    localStorage.setItem("yuujin-dynamic-lyrics-enabled", enabled.toString())

    // 显示通知
    if (window.showToast) {
      window.showToast(`Dynamic lyrics ${enabled ? "enabled" : "disabled"}`, "info", {
        duration: 2000,
        id: "dynamic-lyrics-toggle",
      })
    }
  },

  /**
   * 获取媒体会话信息
   * Get media session info
   */
  getMediaSessionInfo() {
    return {
      supported: this.isSupported,
      isPyWebView: this.isPyWebView,
      dynamicLyricsEnabled: this.dynamicLyricsEnabled,
      currentMetadata: this.currentMetadata,
      originalTrackInfo: this.originalTrackInfo,
      hasLyrics: this.getCurrentLyricContent().hasLyrics,
      currentLyric: this.getCurrentLyricContent().lyricText,
    }
  },

  /**
   * 清理资源
   * Cleanup resources
   */
  cleanup() {
    this.stopLyricsUpdateLoop()

    if (this.isSupported) {
      try {
        navigator.mediaSession.metadata = null
        navigator.mediaSession.playbackState = "none"
      } catch (error) {
        console.error("Error during cleanup:", error)
      }
    }

    console.log("Dynamic Lyrics Media Session Manager cleaned up")
  },
}

/**
 * 初始化动态歌词媒体会话功能
 * Initialize dynamic lyrics media session functionality
 */
function initializeDynamicLyricsMediaSession() {
  // 等待Vue应用加载完成
  const checkVueLoaded = setInterval(() => {
    const app = document.querySelector("#app").__vue__
    if (app) {
      clearInterval(checkVueLoaded)

      console.log("Initializing Dynamic Lyrics Media Session integration...")

      // 从localStorage读取设置
      const savedSetting = localStorage.getItem("yuujin-dynamic-lyrics-enabled")
      if (savedSetting !== null) {
        DynamicLyricsMediaSessionManager.dynamicLyricsEnabled = savedSetting === "true"
      }

      // 初始化动态歌词媒体会话管理器
      const initialized = DynamicLyricsMediaSessionManager.init(app)

      if (initialized) {
        // 将功能暴露到全局作用域
        window.DynamicLyricsMediaSessionManager = DynamicLyricsMediaSessionManager
        window.getDynamicMediaSessionInfo = () => DynamicLyricsMediaSessionManager.getMediaSessionInfo()
        window.toggleDynamicLyrics = (enabled) => DynamicLyricsMediaSessionManager.toggleDynamicLyrics(enabled)

        console.log("Dynamic Lyrics Media Session integration initialized successfully")
        console.log("Available functions: getDynamicMediaSessionInfo(), toggleDynamicLyrics()")

        // 显示初始化完成通知
        setTimeout(() => {
          if (window.showToast) {
            window.showToast("Dynamic lyrics media session enabled", "music", {
              duration: 2000,
              id: "dynamic-lyrics-init",
            })
          }
        }, 1000)

        // 监听页面卸载事件进行清理
        window.addEventListener("beforeunload", () => {
          DynamicLyricsMediaSessionManager.cleanup()
        })
      }
    }
  }, 100)

  // 防止无限等待
  setTimeout(() => {
    clearInterval(checkVueLoaded)
    console.warn("Vue app not found within timeout, Dynamic Lyrics Media Session not initialized")
  }, 10000)
}

// 监听DOM加载完成事件
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDynamicLyricsMediaSession)
} else {
  initializeDynamicLyricsMediaSession()
}

// 导出模块（如果使用模块系统）
if (typeof module !== "undefined" && module.exports) {
  module.exports = DynamicLyricsMediaSessionManager
}
