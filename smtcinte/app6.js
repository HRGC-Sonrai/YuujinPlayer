// app6.js - PyWebView媒体会话增强集成
// PyWebView Media Session Enhanced Integration

/**
 * PyWebView媒体会话管理器
 * PyWebView Media Session Manager
 */
const PyWebViewMediaSessionManager = {
  // Vue应用实例引用
  vueApp: null,

  // 是否在PyWebView环境中
  isPyWebView: false,

  // 是否支持原生Media Session API
  isNativeSupported: false,

  // 当前媒体元数据
  currentMetadata: null,

  // Python API是否可用
  isPythonAPIAvailable: false,

  /**
   * 初始化PyWebView媒体会话管理器
   * Initialize PyWebView Media Session Manager
   * @param {Object} vueApp Vue应用实例
   */
  async init(vueApp) {
    this.vueApp = vueApp

    // 检测运行环境
    this.detectEnvironment()

    console.log("Initializing PyWebView Media Session Manager...")
    console.log(`Environment: PyWebView=${this.isPyWebView}, Native API=${this.isNativeSupported}`)

    // 检查Python API可用性
    await this.checkPythonAPI()

    // 根据环境选择初始化策略
    if (this.isPyWebView && this.isPythonAPIAvailable) {
      // PyWebView环境，使用Python API
      this.initPyWebViewMediaSession()
    } else if (this.isNativeSupported) {
      // 浏览器环境，使用原生API
      this.initNativeMediaSession()
    } else {
      // 降级处理
      this.initFallbackMediaSession()
    }

    // 监听Vue应用的状态变化
    this.setupVueWatchers()

    // 初始化媒体元数据
    this.updateMediaMetadata()

    console.log("PyWebView Media Session Manager initialized successfully")
    return true
  },

  /**
   * 检测运行环境
   * Detect runtime environment
   */
  detectEnvironment() {
    // 检测是否在PyWebView中
    this.isPyWebView = window.pywebview !== undefined

    // 检测原生Media Session API支持
    this.isNativeSupported = "mediaSession" in navigator

    // 检测User Agent中的PyWebView标识
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes("pywebview") || userAgent.includes("webview")) {
      this.isPyWebView = true
    }
  },

  /**
   * 检查Python API可用性
   * Check Python API availability
   */
  async checkPythonAPI() {
    if (!this.isPyWebView) {
      this.isPythonAPIAvailable = false
      return
    }

    try {
      // 尝试调用Python API
      if (window.pywebview && window.pywebview.api) {
        // 测试API连接
        const result = await window.pywebview.api.get_media_info()
        this.isPythonAPIAvailable = true
        console.log("Python API is available")
      } else {
        this.isPythonAPIAvailable = false
        console.log("Python API is not available")
      }
    } catch (error) {
      console.log("Python API check failed:", error)
      this.isPythonAPIAvailable = false
    }
  },

  /**
   * 初始化PyWebView媒体会话
   * Initialize PyWebView media session
   */
  initPyWebViewMediaSession() {
    console.log("Initializing PyWebView-specific media session...")

    // 注册PyWebView特定的媒体控制
    this.registerPyWebViewHandlers()

    // 设置窗口标题更新
    this.setupWindowTitleUpdates()

    // 设置系统托盘通知（如果支持）
    this.setupSystemNotifications()
  },

  /**
   * 初始化原生媒体会话
   * Initialize native media session
   */
  initNativeMediaSession() {
    console.log("Initializing native media session...")

    // 使用原有的Media Session API逻辑
    this.registerNativeActionHandlers()
  },

  /**
   * 初始化降级媒体会话
   * Initialize fallback media session
   */
  initFallbackMediaSession() {
    console.log("Initializing fallback media session...")

    // 使用窗口标题和文档标题来显示媒体信息
    this.setupTitleBasedMediaSession()

    // 设置键盘快捷键
    this.setupKeyboardShortcuts()
  },

  /**
   * 注册PyWebView处理器
   * Register PyWebView handlers
   */
  registerPyWebViewHandlers() {
    // 这里可以添加PyWebView特定的媒体控制逻辑
    // 例如：系统媒体键处理、任务栏控制等

    // 监听系统媒体键（通过Python后端）
    this.setupSystemMediaKeyHandling()
  },

  /**
   * 注册原生动作处理器
   * Register native action handlers
   */
  registerNativeActionHandlers() {
    if (!this.isNativeSupported) return

    try {
      // 播放控制
      navigator.mediaSession.setActionHandler("play", () => {
        console.log("Native Media Session: Play action triggered")
        if (this.vueApp && !this.vueApp.isPlaying) {
          this.vueApp.togglePlay()
        }
      })

      navigator.mediaSession.setActionHandler("pause", () => {
        console.log("Native Media Session: Pause action triggered")
        if (this.vueApp && this.vueApp.isPlaying) {
          this.vueApp.togglePlay()
        }
      })

      // 曲目控制
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        console.log("Native Media Session: Previous track action triggered")
        if (this.vueApp) {
          this.vueApp.playPrevious()
        }
      })

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        console.log("Native Media Session: Next track action triggered")
        if (this.vueApp) {
          this.vueApp.playNext()
        }
      })

      console.log("Native media session action handlers registered")
    } catch (error) {
      console.error("Error registering native action handlers:", error)
    }
  },

  /**
   * 设置系统媒体键处理
   * Setup system media key handling
   */
  setupSystemMediaKeyHandling() {
    // 通过Python后端监听系统媒体键
    // 这需要在Python端实现相应的系统钩子

    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "MediaPlayPause":
          event.preventDefault()
          if (this.vueApp) {
            this.vueApp.togglePlay()
          }
          break
        case "MediaTrackNext":
          event.preventDefault()
          if (this.vueApp) {
            this.vueApp.playNext()
          }
          break
        case "MediaTrackPrevious":
          event.preventDefault()
          if (this.vueApp) {
            this.vueApp.playPrevious()
          }
          break
      }
    })
  },

  /**
   * 设置窗口标题更新
   * Setup window title updates
   */
  setupWindowTitleUpdates() {
    // 更新窗口标题以显示当前播放信息
    this.updateWindowTitle()
  },

  /**
   * 设置系统通知
   * Setup system notifications
   */
  setupSystemNotifications() {
    // 如果支持，显示系统通知
    if ("Notification" in window) {
      // 请求通知权限
      if (Notification.permission === "default") {
        Notification.requestPermission()
      }
    }
  },

  /**
   * 设置基于标题的媒体会话
   * Setup title-based media session
   */
  setupTitleBasedMediaSession() {
    // 使用文档标题显示媒体信息
    this.updateDocumentTitle()
  },

  /**
   * 设置键盘快捷键
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (event) => {
      // 只在没有其他输入焦点时响应
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return
      }

      switch (event.key.toLowerCase()) {
        case " ":
          event.preventDefault()
          if (this.vueApp) {
            this.vueApp.togglePlay()
          }
          break
      }
    })
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
      this.updateWindowTitle()
      this.updateDocumentTitle()
      this.sendMediaInfoToPython()
    })

    // 监听播放状态变化
    this.vueApp.$watch("isPlaying", (newState) => {
      this.updatePlaybackState(newState)
      this.updateWindowTitle()
      this.updateDocumentTitle()
      this.sendPlaybackStateToPython(newState)
    })
  },

  /**
   * 更新媒体元数据
   * Update media metadata
   */
  updateMediaMetadata() {
    if (!this.vueApp) return

    const currentTrack = this.vueApp.currentTrack

    if (!currentTrack || !currentTrack.title) {
      this.currentMetadata = null
      return
    }

    this.currentMetadata = {
      title: currentTrack.title || "Unknown Title",
      artist: currentTrack.artist || "Unknown Artist",
      album: currentTrack.album || "Unknown Album",
      artwork: currentTrack.coverArt || "",
    }

    // 根据环境更新媒体信息
    if (this.isNativeSupported) {
      this.updateNativeMediaMetadata()
    }

    console.log("Media metadata updated:", this.currentMetadata)
  },

  /**
   * 更新原生媒体元数据
   * Update native media metadata
   */
  updateNativeMediaMetadata() {
    if (!this.isNativeSupported || !this.currentMetadata) return

    try {
      const artwork = []
      if (this.currentMetadata.artwork && this.currentMetadata.artwork !== "https://via.placeholder.com/300") {
        artwork.push({
          src: this.currentMetadata.artwork,
          sizes: "512x512",
          type: "image/jpeg",
        })
      }

      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentMetadata.title,
        artist: this.currentMetadata.artist,
        album: this.currentMetadata.album,
        artwork: artwork,
      })
    } catch (error) {
      console.error("Error updating native media metadata:", error)
    }
  },

  /**
   * 更新播放状态
   * Update playback state
   * @param {boolean} isPlaying 是否正在播放
   */
  updatePlaybackState(isPlaying) {
    if (this.isNativeSupported) {
      try {
        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused"
      } catch (error) {
        console.error("Error updating playback state:", error)
      }
    }
  },

  /**
   * 更新窗口标题
   * Update window title
   */
  updateWindowTitle() {
    if (!this.currentMetadata) {
      document.title = "Yuujin Player"
      return
    }

    const playingIndicator = this.vueApp && this.vueApp.isPlaying ? "▶ " : "⏸ "
    document.title = `${playingIndicator}${this.currentMetadata.title} - ${this.currentMetadata.artist} | Yuujin Player`
  },

  /**
   * 更新文档标题
   * Update document title
   */
  updateDocumentTitle() {
    this.updateWindowTitle() // 目前与窗口标题相同
  },

  /**
   * 发送媒体信息到Python
   * Send media info to Python
   */
  async sendMediaInfoToPython() {
    if (!this.isPyWebView || !this.isPythonAPIAvailable || !this.currentMetadata) return

    try {
      await window.pywebview.api.update_media_info(this.currentMetadata)
    } catch (error) {
      console.error("Error sending media info to Python:", error)
    }
  },

  /**
   * 发送播放状态到Python
   * Send playback state to Python
   * @param {boolean} isPlaying 是否正在播放
   */
  async sendPlaybackStateToPython(isPlaying) {
    if (!this.isPyWebView || !this.isPythonAPIAvailable) return

    try {
      await window.pywebview.api.set_playback_state(isPlaying)
    } catch (error) {
      console.error("Error sending playback state to Python:", error)
    }
  },

  /**
   * 显示系统通知
   * Show system notification
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} icon 通知图标
   */
  showSystemNotification(title, body, icon) {
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(title, {
          body: body,
          icon: icon || this.currentMetadata?.artwork,
          silent: true,
        })
      } catch (error) {
        console.error("Error showing system notification:", error)
      }
    }
  },

  /**
   * 获取媒体会话信息
   * Get media session info
   */
  getMediaSessionInfo() {
    return {
      isPyWebView: this.isPyWebView,
      isNativeSupported: this.isNativeSupported,
      isPythonAPIAvailable: this.isPythonAPIAvailable,
      currentMetadata: this.currentMetadata,
      playbackState: this.vueApp ? this.vueApp.isPlaying : false,
    }
  },
}

/**
 * 初始化PyWebView媒体会话功能
 * Initialize PyWebView media session functionality
 */
function initializePyWebViewMediaSession() {
  // 等待Vue应用加载完成
  const checkVueLoaded = setInterval(() => {
    const app = document.querySelector("#app").__vue__
    if (app) {
      clearInterval(checkVueLoaded)

      console.log("Initializing PyWebView Media Session integration...")

      // 初始化PyWebView媒体会话管理器
      PyWebViewMediaSessionManager.init(app)

      // 将功能暴露到全局作用域
      window.PyWebViewMediaSessionManager = PyWebViewMediaSessionManager
      window.getPyWebViewMediaSessionInfo = () => PyWebViewMediaSessionManager.getMediaSessionInfo()

      console.log("PyWebView Media Session integration initialized successfully")

      // 显示初始化完成通知
      setTimeout(() => {
        if (window.showToast) {
          window.showToast("PyWebView media controls integration enabled", "info", {
            duration: 2000,
            id: "pywebview-media-session-init",
          })
        }
      }, 1000)
    }
  }, 100)

  // 防止无限等待
  setTimeout(() => {
    clearInterval(checkVueLoaded)
    console.warn("Vue app not found within timeout, PyWebView Media Session not initialized")
  }, 10000)
}

// 监听DOM加载完成事件
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePyWebViewMediaSession)
} else {
  initializePyWebViewMediaSession()
}

// 导出模块（如果使用模块系统）
if (typeof module !== "undefined" && module.exports) {
  module.exports = PyWebViewMediaSessionManager
}
