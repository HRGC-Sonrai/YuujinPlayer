// app-p1.js - 实用增强功能（系统MIDI播放版本）
// Practical Enhanced Features (System MIDI Playback Version)

/**
 * 动态专辑图生成器
 */
const AlbumArtGenerator = {
  canvasCache: new Map(),

  generateAlbumArt(title, artist = "", options = {}) {
    const cacheKey = `${title}-${artist}`

    if (this.canvasCache.has(cacheKey)) {
      return this.canvasCache.get(cacheKey)
    }

    const { size = 300, backgroundColor, textColor = "#ffffff" } = options

    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")

    // 随机背景色
    const bgColor = backgroundColor || this.getRandomGradientColor()

    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, bgColor.start)
    gradient.addColorStop(1, bgColor.end)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // 绘制音乐图标
    this.drawMusicIcon(ctx, size)

    // 绘制文本
    ctx.fillStyle = textColor
    ctx.textAlign = "center"
    ctx.font = `bold ${size * 0.06}px "Microsoft YaHei", Arial, sans-serif`

    // 歌曲名
    const titleY = size * 0.78
    this.wrapText(ctx, title, size / 2, titleY, size * 0.9, size * 0.06 * 1.2)

    // 艺术家
    if (artist) {
      ctx.font = `${size * 0.045}px "Microsoft YaHei", Arial, sans-serif`
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      this.wrapText(ctx, artist, size / 2, titleY + size * 0.08, size * 0.9, size * 0.045 * 1.2)
    }

    const dataUrl = canvas.toDataURL("image/png")
    this.canvasCache.set(cacheKey, dataUrl)
    return dataUrl
  },

  drawMusicIcon(ctx, size) {
    const centerX = size / 2
    const centerY = size / 2 - size * 0.1
    const iconSize = size * 0.15

    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"

    // 简单的音符
    ctx.beginPath()
    ctx.arc(centerX - iconSize, centerY, iconSize * 0.3, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillRect(centerX - iconSize * 0.8, centerY - iconSize * 1.5, iconSize * 0.15, iconSize * 1.5)

    ctx.beginPath()
    ctx.arc(centerX + iconSize * 0.5, centerY + iconSize * 0.3, iconSize * 0.25, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillRect(centerX + iconSize * 0.65, centerY - iconSize * 1.2, iconSize * 0.12, iconSize * 1.5)
  },

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split("")
    let line = ""
    let testLine = ""
    let currentY = y

    for (let i = 0; i < words.length; i++) {
      testLine = line + words[i]
      const testWidth = ctx.measureText(testLine).width

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY)
        line = words[i]
        currentY += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, currentY)
  },

  getRandomGradientColor() {
    const colors = [
      { start: "#667eea", end: "#764ba2" },
      { start: "#f093fb", end: "#f5576c" },
      { start: "#4facfe", end: "#00f2fe" },
      { start: "#a8edea", end: "#fed6e3" },
      { start: "#ffecd2", end: "#fcb69f" },
      { start: "#ff8a80", end: "#ffab91" },
      { start: "#81c784", end: "#aed581" },
      { start: "#64b3f4", end: "#c2e9fb" },
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  },
}

/**
 * 系统MIDI播放器
 * System MIDI Player
 */
const SystemMIDIPlayer = {
  isPyWebView: false,
  isPlaying: false,
  currentTime: 0,
  duration: 180,
  currentFile: null,
  timeTrackingInterval: null,

  init() {
    this.isPyWebView = window.pywebview !== undefined
    console.log(`MIDI Player initialized - PyWebView: ${this.isPyWebView}`)
  },

  isMIDIFile(filename) {
    const ext = filename && filename.toLowerCase().split(".").pop()
    return ["mid", "midi", "kar"].includes(ext)
  },

  /**
   * 播放MIDI文件
   */
  async playMIDI(filePath) {
    this.currentFile = filePath
    console.log("Playing MIDI file:", filePath)

    if (this.isPyWebView) {
      // PyWebView环境：通过Python调用系统播放器
      return await this.playMIDIViaPython(filePath)
    } else {
      // 浏览器环境：尝试系统关联
      return this.playMIDIViaSystem(filePath)
    }
  },

  /**
   * 通过Python调用系统MIDI播放器
   */
  async playMIDIViaPython(filePath) {
    try {
      if (window.pywebview && window.pywebview.api) {
        // 调用Python后端的MIDI播放方法
        const result = await window.pywebview.api.play_midi_file(filePath)

        if (result.status === "success") {
          this.isPlaying = true
          this.currentTime = 0
          this.startTimeTracking()

          if (window.showToast) {
            window.showToast("MIDI文件已通过系统播放器打开", "music", { duration: 2000 })
          }

          console.log("MIDI playback started via Python")
          return true
        } else {
          throw new Error(result.message || "Failed to play MIDI")
        }
      } else {
        throw new Error("Python API not available")
      }
    } catch (error) {
      console.error("Failed to play MIDI via Python:", error)

      if (window.showToast) {
        window.showToast("无法播放MIDI文件，请检查系统MIDI播放器", "error", { duration: 3000 })
      }

      return false
    }
  },

  /**
   * 通过系统关联播放MIDI
   */
  playMIDIViaSystem(filePath) {
    try {
      // 方法1：尝试在新窗口中打开MIDI文件
      const midiWindow = window.open(filePath, "_blank")

      if (midiWindow) {
        this.isPlaying = true
        this.currentTime = 0
        this.startTimeTracking()

        if (window.showToast) {
          window.showToast("MIDI文件已在新窗口中打开", "music", { duration: 2000 })
        }

        console.log("MIDI file opened in new window")
        return true
      } else {
        // 方法2：创建隐藏的iframe
        this.playMIDIViaIframe(filePath)
        return true
      }
    } catch (error) {
      console.error("Failed to play MIDI via system:", error)

      if (window.showToast) {
        window.showToast("无法播放MIDI文件，浏览器可能不支持", "error", { duration: 3000 })
      }

      return false
    }
  },

  /**
   * 通过iframe播放MIDI
   */
  playMIDIViaIframe(filePath) {
    // 移除现有的MIDI iframe
    const existingIframe = document.getElementById("midi-player-iframe")
    if (existingIframe) {
      existingIframe.remove()
    }

    // 创建新的iframe
    const iframe = document.createElement("iframe")
    iframe.id = "midi-player-iframe"
    iframe.src = filePath
    iframe.style.display = "none"
    iframe.style.width = "1px"
    iframe.style.height = "1px"

    document.body.appendChild(iframe)

    this.isPlaying = true
    this.currentTime = 0
    this.startTimeTracking()

    if (window.showToast) {
      window.showToast("MIDI文件已加载到系统播放器", "music", { duration: 2000 })
    }

    console.log("MIDI file loaded via iframe")
  },

  /**
   * 暂停MIDI播放
   */
  async pause() {
    this.isPlaying = false
    this.stopTimeTracking()

    if (this.isPyWebView && window.pywebview && window.pywebview.api) {
      try {
        await window.pywebview.api.pause_midi_playback()
      } catch (error) {
        console.error("Failed to pause MIDI via Python:", error)
      }
    }

    console.log("MIDI playback paused")
  },

  /**
   * 停止MIDI播放
   */
  async stop() {
    this.isPlaying = false
    this.currentTime = 0
    this.stopTimeTracking()

    if (this.isPyWebView && window.pywebview && window.pywebview.api) {
      try {
        await window.pywebview.api.stop_midi_playback()
      } catch (error) {
        console.error("Failed to stop MIDI via Python:", error)
      }
    } else {
      // 移除iframe
      const iframe = document.getElementById("midi-player-iframe")
      if (iframe) {
        iframe.remove()
      }
    }

    console.log("MIDI playback stopped")
  },

  /**
   * 开始时间跟踪
   */
  startTimeTracking() {
    this.stopTimeTracking()

    this.timeTrackingInterval = setInterval(() => {
      if (this.isPlaying && this.currentTime < this.duration) {
        this.currentTime += 0.1

        // 触发时间更新事件
        const event = new CustomEvent("midi-time-update", {
          detail: { currentTime: this.currentTime, duration: this.duration },
        })
        document.dispatchEvent(event)
      } else if (this.currentTime >= this.duration) {
        // 播放结束
        this.stop()
        const event = new CustomEvent("midi-ended")
        document.dispatchEvent(event)
      }
    }, 100)
  },

  /**
   * 停止时间跟踪
   */
  stopTimeTracking() {
    if (this.timeTrackingInterval) {
      clearInterval(this.timeTrackingInterval)
      this.timeTrackingInterval = null
    }
  },

  /**
   * 获取播放状态
   */
  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      currentFile: this.currentFile,
      isPyWebView: this.isPyWebView,
    }
  },
}

/**
 * M4R 格式支持
 */
const M4RSupport = {
  isM4RFile(filename) {
    return filename && filename.toLowerCase().endsWith(".m4r")
  },

  handleM4RPlayback(audioElement, src) {
    if (this.isM4RFile(src)) {
      console.log("Playing M4R file as MP4 audio")
      audioElement.src = src
      audioElement.load()
      return true
    }
    return false
  },
}

/**
 * 主要集成管理器
 */
const EnhancedPlayerManager = {
  vueApp: null,
  isMIDIMode: false,

  init(vueApp) {
    this.vueApp = vueApp
    console.log("Enhanced Player Manager initialized")

    // 初始化系统MIDI播放器
    SystemMIDIPlayer.init()

    // 监听MIDI事件
    this.setupMIDIListeners()

    // 扩展Vue应用
    this.extendVueApp()

    // 自动检查现有曲目的专辑图
    this.checkCurrentTrackAlbumArt()
  },

  setupMIDIListeners() {
    document.addEventListener("midi-time-update", (e) => {
      if (this.vueApp && this.isMIDIMode) {
        this.vueApp.currentTime = e.detail.currentTime
        this.vueApp.duration = e.detail.duration
      }
    })

    document.addEventListener("midi-ended", () => {
      if (this.vueApp && this.isMIDIMode) {
        this.vueApp.isPlaying = false
        // 播放下一首
        setTimeout(() => this.vueApp.playNext && this.vueApp.playNext(), 500)
      }
    })
  },

  extendVueApp() {
    const originalLoadTrack = this.vueApp.loadTrack || (() => {})
    const originalTogglePlay = this.vueApp.togglePlay || (() => {})

    // 扩展loadTrack
    this.vueApp.loadTrack = (track) => {
      console.log("Loading track:", track.title)

      // 检查是否是MIDI文件
      if (SystemMIDIPlayer.isMIDIFile(track.file || track.title)) {
        this.isMIDIMode = true
        this.loadMIDITrack(track)
      } else {
        this.isMIDIMode = false

        // 处理M4R文件
        if (M4RSupport.isM4RFile(track.file || track.title)) {
          console.log("Detected M4R file")
        }

        originalLoadTrack.call(this.vueApp, track)
      }

      // 生成专辑图
      this.generateAlbumArtIfNeeded(track)
    }

    // 扩展togglePlay
    this.vueApp.togglePlay = () => {
      if (this.isMIDIMode) {
        this.toggleMIDIPlay()
      } else {
        originalTogglePlay.call(this.vueApp)
      }
    }

    // 监听播放列表变化
    if (this.vueApp.$watch) {
      this.vueApp.$watch(
        "playlist",
        (newPlaylist) => {
          console.log("Playlist changed, checking for missing album arts...")
          this.batchGenerateAlbumArt(newPlaylist)
        },
        { deep: true },
      )

      this.vueApp.$watch(
        "tracks",
        (newTracks) => {
          console.log("Tracks changed, checking for missing album arts...")
          this.batchGenerateAlbumArt(newTracks)
        },
        { deep: true },
      )
    }

    // 添加手动批量生成方法
    this.vueApp.generateMissingAlbumArts = () => {
      this.batchGenerateAlbumArt(this.vueApp.playlist || this.vueApp.tracks || [])
    }
  },

  async loadMIDITrack(track) {
    console.log("Loading MIDI track:", track.title)

    this.vueApp.isPlaying = false
    this.vueApp.currentTime = 0
    this.vueApp.duration = SystemMIDIPlayer.duration

    // 设置当前文件路径
    SystemMIDIPlayer.currentFile = track.file || track.url || track.src

    if (window.showToast) {
      window.showToast(`MIDI文件已准备: ${track.title}`, "music", { duration: 2000 })
    }
  },

  async toggleMIDIPlay() {
    if (SystemMIDIPlayer.isPlaying) {
      await SystemMIDIPlayer.pause()
      this.vueApp.isPlaying = false
    } else {
      const success = await SystemMIDIPlayer.playMIDI(SystemMIDIPlayer.currentFile)
      if (success) {
        this.vueApp.isPlaying = true
      }
    }
  },

  // 批量生成专辑图的方法
  batchGenerateAlbumArt(tracks) {
    if (!tracks || !Array.isArray(tracks)) return

    let generatedCount = 0

    tracks.forEach((track, index) => {
      if (this.needsAlbumArt(track)) {
        setTimeout(() => {
          this.generateAlbumArtIfNeeded(track)
          generatedCount++
        }, index * 100)
      }
    })

    if (generatedCount > 0) {
      setTimeout(
        () => {
          if (window.showToast) {
            window.showToast(`为 ${generatedCount} 首歌曲生成了专辑图`, "success", { duration: 3000 })
          }
        },
        tracks.length * 100 + 500,
      )
    }
  },

  needsAlbumArt(track) {
    return (
      !track.coverArt ||
      track.coverArt === "https://via.placeholder.com/300" ||
      track.coverArt.includes("placeholder") ||
      track.coverArt === "" ||
      track.coverArt === null
    )
  },

  checkCurrentTrackAlbumArt() {
    setTimeout(() => {
      if (this.vueApp && this.vueApp.currentTrack) {
        this.generateAlbumArtIfNeeded(this.vueApp.currentTrack)
      }

      const tracks = this.vueApp.playlist || this.vueApp.tracks || []
      if (tracks.length > 0) {
        console.log(`Checking ${tracks.length} tracks for missing album arts...`)
        this.batchGenerateAlbumArt(tracks)
      }
    }, 1000)
  },

  generateAlbumArtIfNeeded(track) {
    if (this.needsAlbumArt(track)) {
      console.log("Generating album art for:", track.title)

      const albumArt = AlbumArtGenerator.generateAlbumArt(track.title || "Unknown", track.artist || "Unknown Artist")

      track.coverArt = albumArt

      if (this.vueApp.$forceUpdate) {
        this.vueApp.$forceUpdate()
      }
    }
  },
}

/**
 * 初始化
 */
function initEnhancedPlayer() {
  const checkVue = setInterval(() => {
    const app = document.querySelector("#app").__vue__
    if (app) {
      clearInterval(checkVue)

      EnhancedPlayerManager.init(app)

      // 暴露到全局
      window.AlbumArtGenerator = AlbumArtGenerator
      window.SystemMIDIPlayer = SystemMIDIPlayer
      window.generateAlbumArt = (title, artist) => AlbumArtGenerator.generateAlbumArt(title, artist)
      window.testSystemMIDI = (filePath) => SystemMIDIPlayer.playMIDI(filePath)

      // 批量生成命令
      window.generateAllMissingAlbumArts = () => {
        const app = document.querySelector("#app").__vue__
        if (app && app.generateMissingAlbumArts) {
          app.generateMissingAlbumArts()
        }
      }

      window.regenerateAllAlbumArts = () => {
        const app = document.querySelector("#app").__vue__
        if (app) {
          const tracks = app.playlist || app.tracks || []
          tracks.forEach((track, index) => {
            setTimeout(() => {
              track.coverArt = ""
              EnhancedPlayerManager.generateAlbumArtIfNeeded(track)
            }, index * 150)
          })

          if (window.showToast) {
            window.showToast(`正在为 ${tracks.length} 首歌曲重新生成专辑图...`, "info", { duration: 3000 })
          }
        }
      }

      console.log("Enhanced Player P1 loaded successfully!")
      console.log("Commands:")
      console.log("- generateAlbumArt('title', 'artist')")
      console.log("- testSystemMIDI('path/to/file.mid')")
      console.log("- generateAllMissingAlbumArts()")
      console.log("- regenerateAllAlbumArts()")

      if (window.showToast) {
        window.showToast("增强功能已加载: 系统MIDI播放 + 专辑图生成 + M4R", "success", { duration: 2000 })
      }
    }
  }, 100)

  setTimeout(() => clearInterval(checkVue), 10000)
}

// 启动
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEnhancedPlayer)
} else {
  initEnhancedPlayer()
}
