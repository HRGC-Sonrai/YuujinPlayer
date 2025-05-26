// app3.js - 增强版键盘快捷键和通知系统
// 为 Yuujin Player 添加键盘快捷键支持，带有丰富样式、通知合并功能和多语言支持

// 通知管理器 - 处理通知的显示、合并和队列
const NotificationManager = {
    // 存储活跃的通知
    activeNotifications: {},
  
    // 通知队列
    queue: [],
  
    // 是否正在处理队列
    isProcessing: false,
  
    // 本地化文本
    i18n: {
      en: {
        volume: "Volume",
        muted: "Muted",
        unmuted: "Unmuted",
        playing: "Playing",
        paused: "Paused",
        nextTrack: "Next Track",
        previousTrack: "Previous Track",
        showingLyrics: "Showing Lyrics",
        nowPlaying: "Now Playing",
        library: "Library",
        settings: "Settings",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        toggledFullscreen: "Toggled Fullscreen",
        keyboardShortcutsHelp: "Keyboard Shortcuts Help",
        keyboardShortcuts: "Keyboard Shortcuts",
        error: "Error",
        pressEscToClose: "Press ESC to close",
        pressQuestionMarkForShortcuts: "Press ? to view keyboard shortcuts",
        playback: "Playback",
        navigation: "Navigation",
        other: "Other",
      },
      zh: {
        volume: "音量",
        muted: "已静音",
        unmuted: "已取消静音",
        playing: "正在播放",
        paused: "已暂停",
        nextTrack: "下一曲",
        previousTrack: "上一曲",
        showingLyrics: "显示歌词",
        nowPlaying: "正在播放",
        library: "音乐库",
        settings: "设置",
        darkMode: "深色模式",
        lightMode: "浅色模式",
        toggledFullscreen: "切换全屏",
        keyboardShortcutsHelp: "键盘快捷键帮助",
        keyboardShortcuts: "键盘快捷键",
        error: "错误",
        pressEscToClose: "按 ESC 键关闭",
        pressQuestionMarkForShortcuts: "按 ? 键查看快捷键",
        playback: "播放控制",
        navigation: "导航",
        other: "其他",
      },
      ja: {
        volume: "音量",
        muted: "ミュート",
        unmuted: "ミュート解除",
        playing: "再生中",
        paused: "一時停止",
        nextTrack: "次のトラック",
        previousTrack: "前のトラック",
        showingLyrics: "歌詞を表示",
        nowPlaying: "再生中",
        library: "ライブラリ",
        settings: "設定",
        darkMode: "ダークモード",
        lightMode: "ライトモード",
        toggledFullscreen: "全画面切替",
        keyboardShortcutsHelp: "キーボードショートカット",
        keyboardShortcuts: "キーボードショートカット",
        error: "エラー",
        pressEscToClose: "ESCキーで閉じる",
        pressQuestionMarkForShortcuts: "?キーでショートカット一覧を表示",
        playback: "再生コントロール",
        navigation: "ナビゲーション",
        other: "その他",
      },
      jakanjionly: {
        volume: "音量",
        muted: "消音",
        unmuted: "消音解除",
        playing: "再生中",
        paused: "停止中",
        nextTrack: "次曲",
        previousTrack: "前曲",
        showingLyrics: "歌詞表示",
        nowPlaying: "再生中",
        library: "音楽庫",
        settings: "設定",
        darkMode: "暗色模式",
        lightMode: "明色模式",
        toggledFullscreen: "全画面切替",
        keyboardShortcutsHelp: "鍵盤捷徑",
        keyboardShortcuts: "鍵盤捷徑",
        error: "錯誤",
        pressEscToClose: "ESC鍵で閉じる",
        pressQuestionMarkForShortcuts: "?鍵で捷徑一覧表示",
        playback: "再生制御",
        navigation: "画面移動",
        other: "他機能",
      },
      zh_TW: {
        volume: "音量",
        muted: "已靜音",
        unmuted: "已取消靜音",
        playing: "正在播放",
        paused: "已暫停",
        nextTrack: "下一首",
        previousTrack: "上一首",
        showingLyrics: "顯示歌詞",
        nowPlaying: "正在播放",
        library: "音樂庫",
        settings: "設定",
        darkMode: "深色模式",
        lightMode: "淺色模式",
        toggledFullscreen: "切換全螢幕",
        keyboardShortcutsHelp: "鍵盤快捷鍵說明",
        keyboardShortcuts: "鍵盤快捷鍵",
        error: "錯誤",
        pressEscToClose: "按 ESC 鍵關閉",
        pressQuestionMarkForShortcuts: "按 ? 鍵查看快捷鍵",
        playback: "播放控制",
        navigation: "導航",
        other: "其他",
      },
      ko_KP: {
        volume: "볼륨",
        muted: "음소거됨",
        unmuted: "음소거 해제됨",
        playing: "재생 중",
        paused: "일시 중지됨",
        nextTrack: "다음 트랙",
        previousTrack: "이전 트랙",
        showingLyrics: "가사 표시",
        nowPlaying: "지금 재생 중",
        library: "라이브러리",
        settings: "설정",
        darkMode: "다크 모드",
        lightMode: "라이트 모드",
        toggledFullscreen: "전체 화면 전환",
        keyboardShortcutsHelp: "키보드 단축키 도움말",
        keyboardShortcuts: "키보드 단축키",
        error: "오류",
        pressEscToClose: "ESC 키를 눌러 닫기",
        pressQuestionMarkForShortcuts: "? 키를 눌러 단축키 보기",
        playback: "재생 제어",
        navigation: "탐색",
        other: "기타",
      },
    },
  
    // 获取本地化文本
    t(key, fallback) {
      try {
        const vueApp = document.querySelector("#app").__vue__
        const locale = vueApp.$i18n.locale || "en"
  
        // 首先尝试使用 Vue 的 i18n
        if (vueApp.$t && typeof vueApp.$t === "function") {
          const translated = vueApp.$t(key, fallback)
          if (translated !== key) {
            return translated
          }
        }
  
        // 如果 Vue i18n 没有这个键，使用我们自己的翻译
        if (this.i18n[locale] && this.i18n[locale][key]) {
          return this.i18n[locale][key]
        }
  
        // 如果当前语言没有这个键，尝试英语
        if (this.i18n.en && this.i18n.en[key]) {
          return this.i18n.en[key]
        }
  
        // 最后返回后备文本
        return fallback || key
      } catch (e) {
        console.error("Translation error:", e)
        return fallback || key
      }
    },
  
    // 创建通知容器
    createContainer() {
      if (document.getElementById("yuujin-toast-container")) {
        return document.getElementById("yuujin-toast-container")
      }
  
      const container = document.createElement("div")
      container.id = "yuujin-toast-container"
      container.style.position = "fixed"
      container.style.bottom = "24px"
      container.style.right = "24px"
      container.style.zIndex = "9999"
      container.style.display = "flex"
      container.style.flexDirection = "column"
      container.style.gap = "12px"
      container.style.maxWidth = "100%"
      container.style.maxHeight = "100vh"
      container.style.overflow = "hidden"
      container.style.pointerEvents = "none"
      document.body.appendChild(container)
      return container
    },
  
    // 显示通知
    show(message, options = {}) {
      const container = this.createContainer()
      const vueApp = document.querySelector("#app").__vue__
  
      // 默认选项
      const defaultOptions = {
        type: "info",
        icon: null,
        duration: 3000,
        id: null,
        progress: false,
        action: null,
        actionText: null,
      }
  
      // 合并选项
      const finalOptions = { ...defaultOptions, ...options }
  
      // 如果提供了ID，检查是否有相同ID的通知
      if (finalOptions.id && this.activeNotifications[finalOptions.id]) {
        // 更新现有通知
        return this.updateNotification(finalOptions.id, message, finalOptions)
      }
  
      // 创建新通知并添加到队列
      this.queue.push({ message, options: finalOptions })
  
      // 如果没有正在处理的通知，开始处理队列
      if (!this.isProcessing) {
        this.processQueue()
      }
    },
  
    // 处理通知队列
    processQueue() {
      if (this.queue.length === 0) {
        this.isProcessing = false
        return
      }
  
      this.isProcessing = true
      const { message, options } = this.queue.shift()
  
      // 创建并显示通知
      const notification = this.createNotification(message, options)
  
      // 如果有ID，存储通知引用
      if (options.id) {
        this.activeNotifications[options.id] = notification
      }
  
      // 设置自动移除
      if (options.duration > 0) {
        setTimeout(() => {
          this.removeNotification(notification, options.id)
        }, options.duration)
      }
    },
  
    // 更新现有通知
    updateNotification(id, message, options) {
      const notification = this.activeNotifications[id]
      if (!notification) return
  
      // 更新消息
      const messageEl = notification.querySelector(".toast-message")
      if (messageEl) messageEl.textContent = message
  
      // 如果有进度条，重置它
      const progressBar = notification.querySelector(".toast-progress")
      if (progressBar && options.progress) {
        progressBar.style.transition = "none"
        progressBar.style.width = "0%"
  
        setTimeout(() => {
          progressBar.style.transition = `width ${options.duration}ms linear`
          progressBar.style.width = "100%"
        }, 10)
      }
  
      // 重置自动移除计时器
      clearTimeout(notification.removeTimeout)
      if (options.duration > 0) {
        notification.removeTimeout = setTimeout(() => {
          this.removeNotification(notification, id)
        }, options.duration)
      }
  
      // 添加更新动画
      notification.classList.add("toast-update")
      setTimeout(() => {
        notification.classList.remove("toast-update")
      }, 300)
  
      return notification
    },
  
    // 创建通知元素
    createNotification(message, options) {
      const container = this.createContainer()
      const vueApp = document.querySelector("#app").__vue__
      const isDarkMode = vueApp.isDarkMode
  
      // 创建通知元素
      const notification = document.createElement("div")
      notification.className = "yuujin-toast"
      notification.style.pointerEvents = "auto"
  
      // 设置通知样式
      this.applyNotificationStyles(notification, options.type, isDarkMode)
  
      // 创建内容
      let iconMarkup = ""
      if (options.icon) {
        iconMarkup = `<div class="toast-icon">${options.icon.outerHTML || options.icon}</div>`
      } else {
        const iconName = this.getIconForType(options.type)
        const iconColor = this.getColorForType(options.type, isDarkMode)
        iconMarkup = `
                  <div class="toast-icon">
                      <i data-feather="${iconName}" style="color: ${iconColor}; width: 18px; height: 18px;"></i>
                  </div>
              `
      }
  
      // 构建通知HTML
      notification.innerHTML = `
              <div class="toast-content">
                  ${iconMarkup}
                  <div class="toast-body">
                      <span class="toast-message">${message}</span>
                      ${
                        options.action
                          ? `
                          <button class="toast-action">${options.actionText || this.t("action", "Action")}</button>
                      `
                          : ""
                      }
                  </div>
                  ${
                    options.dismissible
                      ? `
                      <button class="toast-close">
                          <i data-feather="x" style="width: 14px; height: 14px;"></i>
                      </button>
                  `
                      : ""
                  }
              </div>
              ${options.progress ? '<div class="toast-progress"></div>' : ""}
          `
  
      // 如果有自定义内容，添加它
      if (options.customContent) {
        const customContentContainer = document.createElement("div")
        customContentContainer.className = "toast-custom-content"
        customContentContainer.style.padding = "0 16px 16px"
  
        if (typeof options.customContent === "string") {
          customContentContainer.innerHTML = options.customContent
        } else {
          customContentContainer.appendChild(options.customContent)
        }
  
        notification.appendChild(customContentContainer)
      }
  
      // 应用内部样式
      this.applyInnerStyles(notification, isDarkMode)
  
      // 添加到容器
      container.appendChild(notification)
  
      // 如果有进度条，启动进度动画
      if (options.progress) {
        const progressBar = notification.querySelector(".toast-progress")
        setTimeout(() => {
          progressBar.style.width = "100%"
        }, 10)
      }
  
      // 添加事件监听器
      if (options.action && options.onAction) {
        const actionButton = notification.querySelector(".toast-action")
        if (actionButton) {
          actionButton.addEventListener("click", () => {
            options.onAction()
            this.removeNotification(notification, options.id)
          })
        }
      }
  
      if (options.dismissible) {
        const closeButton = notification.querySelector(".toast-close")
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            this.removeNotification(notification, options.id)
          })
        }
      }
  
      // 添加悬停暂停功能
      notification.addEventListener("mouseenter", () => {
        if (options.progress) {
          const progressBar = notification.querySelector(".toast-progress")
          progressBar.style.animationPlayState = "paused"
        }
        clearTimeout(notification.removeTimeout)
      })
  
      notification.addEventListener("mouseleave", () => {
        if (options.progress) {
          const progressBar = notification.querySelector(".toast-progress")
          progressBar.style.animationPlayState = "running"
        }
        if (options.duration > 0) {
          notification.removeTimeout = setTimeout(() => {
            this.removeNotification(notification, options.id)
          }, options.duration)
        }
      })
  
      // 更新 feather 图标
      if (window.feather) {
        feather.replace()
      }
  
      // 触发进入动画
      setTimeout(() => {
        notification.style.transform = "translateX(0)"
        notification.style.opacity = "1"
      }, 10)
  
      return notification
    },
  
    // 移除通知
    removeNotification(notification, id) {
      if (!notification) return
  
      // 触发退出动画
      notification.style.transform = "translateX(100%)"
      notification.style.opacity = "0"
  
      // 移除元素
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
  
        // 如果有ID，从活跃通知中移除
        if (id && this.activeNotifications[id]) {
          delete this.activeNotifications[id]
        }
  
        // 继续处理队列
        this.processQueue()
      }, 300)
    },
  
    // 应用通知样式
    applyNotificationStyles(notification, type, isDarkMode) {
      notification.style.display = "flex"
      notification.style.flexDirection = "column"
      notification.style.maxWidth = "380px"
      notification.style.minWidth = "300px"
      notification.style.borderRadius = "12px"
      notification.style.overflow = "hidden"
      notification.style.boxShadow = isDarkMode
        ? "0 8px 16px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)"
        : "0 8px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)"
      notification.style.transform = "translateX(100%)"
      notification.style.opacity = "0"
      notification.style.transition =
        "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      notification.style.backdropFilter = "blur(16px)"
      notification.style.WebkitBackdropFilter = "blur(16px)"
  
      // 根据类型和主题设置背景色
      const bgColor = this.getBackgroundForType(type, isDarkMode)
      notification.style.backgroundColor = bgColor
    },
  
    // 应用内部样式
    applyInnerStyles(notification, isDarkMode) {
      const content = notification.querySelector(".toast-content")
      content.style.display = "flex"
      content.style.padding = "16px"
      content.style.alignItems = "center"
      content.style.gap = "12px"
  
      const icon = notification.querySelector(".toast-icon")
      if (icon) {
        icon.style.display = "flex"
        icon.style.alignItems = "center"
        icon.style.justifyContent = "center"
        icon.style.flexShrink = "0"
      }
  
      const body = notification.querySelector(".toast-body")
      body.style.flex = "1"
      body.style.display = "flex"
      body.style.flexDirection = "column"
      body.style.gap = "4px"
  
      const message = notification.querySelector(".toast-message")
      message.style.fontSize = "14px"
      message.style.fontWeight = "500"
      message.style.color = isDarkMode ? "#ffffff" : "#000000"
      message.style.lineHeight = "1.4"
  
      const action = notification.querySelector(".toast-action")
      if (action) {
        action.style.alignSelf = "flex-start"
        action.style.marginTop = "4px"
        action.style.padding = "4px 8px"
        action.style.fontSize = "12px"
        action.style.fontWeight = "600"
        action.style.color = isDarkMode ? "#0a84ff" : "#0071e3"
        action.style.backgroundColor = "transparent"
        action.style.border = "none"
        action.style.borderRadius = "4px"
        action.style.cursor = "pointer"
        action.style.transition = "background-color 0.2s"
      }
  
      const close = notification.querySelector(".toast-close")
      if (close) {
        close.style.display = "flex"
        close.style.alignItems = "center"
        close.style.justifyContent = "center"
        close.style.width = "24px"
        close.style.height = "24px"
        close.style.borderRadius = "50%"
        close.style.backgroundColor = "transparent"
        close.style.border = "none"
        close.style.cursor = "pointer"
        close.style.color = isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"
        close.style.transition = "background-color 0.2s, color 0.2s"
      }
  
      const progress = notification.querySelector(".toast-progress")
      if (progress) {
        progress.style.height = "3px"
        progress.style.width = "0%"
        progress.style.backgroundColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
        progress.style.transition = "width linear"
        progress.style.transitionDuration = "3000ms" // 默认3秒
      }
    },
  
    // 根据类型获取图标
    getIconForType(type) {
      switch (type) {
        case "success":
          return "check-circle"
        case "error":
          return "alert-circle"
        case "warning":
          return "alert-triangle"
        case "keyboard":
          return "command"
        case "volume":
          return "volume-2"
        case "music":
          return "music"
        case "navigation":
          return "compass"
        default:
          return "info"
      }
    },
  
    // 根据类型获取颜色
    getColorForType(type, isDarkMode) {
      if (isDarkMode) {
        switch (type) {
          case "success":
            return "#30d158"
          case "error":
            return "#ff453a"
          case "warning":
            return "#ffd60a"
          case "keyboard":
            return "#bf5af2"
          case "volume":
            return "#64d2ff"
          case "music":
            return "#5e5ce6"
          case "navigation":
            return "#0a84ff"
          default:
            return "#0a84ff"
        }
      } else {
        switch (type) {
          case "success":
            return "#28cd41"
          case "error":
            return "#ff3b30"
          case "warning":
            return "#ff9f0a"
          case "keyboard":
            return "#af52de"
          case "volume":
            return "#5ac8fa"
          case "music":
            return "#5856d6"
          case "navigation":
            return "#007aff"
          default:
            return "#0071e3"
        }
      }
    },
  
    // 根据类型获取背景色
    getBackgroundForType(type, isDarkMode) {
      if (isDarkMode) {
        switch (type) {
          case "success":
            return "rgba(48, 209, 88, 0.1)"
          case "error":
            return "rgba(255, 69, 58, 0.1)"
          case "warning":
            return "rgba(255, 214, 10, 0.1)"
          case "keyboard":
            return "rgba(191, 90, 242, 0.1)"
          case "volume":
            return "rgba(100, 210, 255, 0.1)"
          case "music":
            return "rgba(94, 92, 230, 0.1)"
          case "navigation":
            return "rgba(10, 132, 255, 0.1)"
          default:
            return "rgba(44, 44, 46, 0.85)"
        }
      } else {
        switch (type) {
          case "success":
            return "rgba(40, 205, 65, 0.1)"
          case "error":
            return "rgba(255, 59, 48, 0.1)"
          case "warning":
            return "rgba(255, 159, 10, 0.1)"
          case "keyboard":
            return "rgba(175, 82, 222, 0.1)"
          case "volume":
            return "rgba(90, 200, 250, 0.1)"
          case "music":
            return "rgba(88, 86, 214, 0.1)"
          case "navigation":
            return "rgba(0, 122, 255, 0.1)"
          default:
            return "rgba(255, 255, 255, 0.85)"
        }
      }
    },
  }
  
  // 添加动画样式
  function addToastStyles() {
    if (document.getElementById("yuujin-toast-styles")) return
  
    const style = document.createElement("style")
    style.id = "yuujin-toast-styles"
    style.textContent = `
          @keyframes toast-progress {
              from { width: 0; }
              to { width: 100%; }
          }
          
          @keyframes toast-update-pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.02); }
              100% { transform: scale(1); }
          }
          
          .yuujin-toast {
              will-change: transform, opacity;
          }
          
          .yuujin-toast:hover .toast-progress {
              animation-play-state: paused;
          }
          
          .toast-update {
              animation: toast-update-pulse 0.3s ease;
          }
          
          .toast-action:hover {
              background-color: rgba(0, 0, 0, 0.05);
          }
          
          .dark .toast-action:hover {
              background-color: rgba(255, 255, 255, 0.1);
          }
          
          .toast-close:hover {
              background-color: rgba(0, 0, 0, 0.05);
              color: rgba(0, 0, 0, 0.8) !important;
          }
          
          .dark .toast-close:hover {
              background-color: rgba(255, 255, 255, 0.1);
              color: rgba(255, 255, 255, 0.8) !important;
          }
          
          .toast-progress {
              animation: toast-progress linear forwards;
          }
      `
    document.head.appendChild(style)
  }
  
  // 键盘快捷键管理器
  const KeyboardShortcuts = {
    // 存储所有注册的快捷键
    shortcuts: [],
  
    // 存储最近的快捷键操作
    recentOperations: {},
  
    // 初始化键盘快捷键
    init(vueApp) {
      this.vueApp = vueApp
  
      // 注册默认快捷键
      this.registerDefaultShortcuts()
  
      // 添加键盘事件监听器
      document.addEventListener("keydown", this.handleKeyDown.bind(this))
  
      // 添加设置页面的快捷键按钮
      this.addShortcutsButton()
  
      // 监听视图变化
      vueApp.$watch("currentView", (newView) => {
        if (newView === "settings") {
          setTimeout(() => this.addShortcutsButton(), 500)
        }
      })
  
      // 初始化后显示提示
      setTimeout(() => {
        this.showToast(NotificationManager.t("pressQuestionMarkForShortcuts", "按 ? 键查看快捷键"), "keyboard")
      }, 2000)
    },
  
    // 注册默认快捷键
    registerDefaultShortcuts() {
      // 播放控制
      this.registerShortcut(" ", "playPause", () => {
        this.vueApp.togglePlay()
        this.showToast(
          this.vueApp.isPlaying
            ? NotificationManager.t("playing", "正在播放")
            : NotificationManager.t("paused", "已暂停"),
          "music",
          { id: "playback-status" },
        )
      })
  
      this.registerShortcut("ArrowRight", "nextTrack", () => {
        this.vueApp.playNext()
        this.showToast(NotificationManager.t("nextTrack", "下一曲"), "music", { id: "track-navigation" })
      })
  
      this.registerShortcut("ArrowLeft", "previousTrack", () => {
        this.vueApp.playPrevious()
        this.showToast(NotificationManager.t("previousTrack", "上一曲"), "music", { id: "track-navigation" })
      })
  
      // 音量控制
      this.registerShortcut("ArrowUp", "volumeUp", () => {
        this.vueApp.volume = Math.min(this.vueApp.volume + 5, 100)
        this.showVolumeToast()
      })
  
      this.registerShortcut("ArrowDown", "volumeDown", () => {
        this.vueApp.volume = Math.max(this.vueApp.volume - 5, 0)
        this.showVolumeToast()
      })
  
      this.registerShortcut("m", "muteUnmute", () => {
        if (!this.vueApp.previousVolume) {
          this.vueApp.previousVolume = this.vueApp.volume
        }
  
        if (this.vueApp.volume > 0) {
          this.vueApp.previousVolume = this.vueApp.volume
          this.vueApp.volume = 0
          this.showToast(NotificationManager.t("muted", "已静音"), "volume", { id: "volume-status" })
        } else {
          this.vueApp.volume = this.vueApp.previousVolume || 100
          this.showToast(NotificationManager.t("unmuted", "已取消静音"), "volume", { id: "volume-status" })
        }
      })
  
      // 视图导航
      this.registerShortcut("l", "showLyrics", () => {
        this.vueApp.setView("lyrics")
        this.showToast(NotificationManager.t("showingLyrics", "显示歌词"), "navigation", { id: "view-navigation" })
      })
  
      this.registerShortcut("p", "nowPlaying", () => {
        this.vueApp.setView("nowPlaying")
        this.showToast(NotificationManager.t("nowPlaying", "正在播放"), "navigation", { id: "view-navigation" })
      })
  
      this.registerShortcut("h", "library", () => {
        this.vueApp.setView("library")
        this.showToast(NotificationManager.t("library", "音乐库"), "navigation", { id: "view-navigation" })
      })
  
      this.registerShortcut("s", "settings", () => {
        this.vueApp.setView("settings")
        this.showToast(NotificationManager.t("settings", "设置"), "navigation", { id: "view-navigation" })
      })
  
      // 其他功能
      this.registerShortcut("t", "toggleTheme", () => {
        this.vueApp.toggleDarkMode()
        this.showToast(
          this.vueApp.isDarkMode
            ? NotificationManager.t("darkMode", "深色模式")
            : NotificationManager.t("lightMode", "浅色模式"),
          "keyboard",
          { id: "theme-toggle" },
        )
      })
  
      this.registerShortcut("b", "toggleBackgroundMode", () => {
        this.vueApp.toggleBackgroundMode()
        this.showToast(this.vueApp.backgroundMode === 1 ? "Arcylic" : "Mica", "keyboard", { id: "background-toggle" })
      })
  
      this.registerShortcut("f", "toggleFullscreen", () => {
        this.toggleFullscreen()
        this.showToast(NotificationManager.t("toggledFullscreen", "切换全屏"), "keyboard", { id: "fullscreen-toggle" })
      })
  
      // 帮助
      this.registerShortcut("?", "showShortcutsHelp", () => {
        this.showShortcutsModal()
        this.showToast(NotificationManager.t("keyboardShortcutsHelp", "键盘快捷键帮助"), "keyboard", {
          id: "shortcuts-help",
        })
      })
    },
  
    // 注册快捷键
    registerShortcut(key, name, callback) {
      this.shortcuts.push({
        key: key,
        name: name,
        callback: callback,
      })
    },
  
    // 处理键盘事件
    handleKeyDown(event) {
      // 如果用户正在输入，不触发快捷键
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }
  
      // 查找匹配的快捷键
      const shortcut = this.shortcuts.find((s) => s.key.toLowerCase() === event.key.toLowerCase())
      if (shortcut) {
        event.preventDefault()
        shortcut.callback()
      }
    },
  
    // 显示音量 toast
    showVolumeToast() {
      // 创建音量条
      const volumeBar = document.createElement("div")
      volumeBar.style.width = "100%"
      volumeBar.style.height = "4px"
      volumeBar.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
      volumeBar.style.borderRadius = "2px"
      volumeBar.style.marginTop = "8px"
      volumeBar.style.position = "relative"
  
      const volumeFill = document.createElement("div")
      volumeFill.style.position = "absolute"
      volumeFill.style.left = "0"
      volumeFill.style.top = "0"
      volumeFill.style.height = "100%"
      volumeFill.style.width = `${this.vueApp.volume}%`
      volumeFill.style.backgroundColor = this.vueApp.isDarkMode ? "#0a84ff" : "#0071e3"
      volumeFill.style.borderRadius = "2px"
      volumeFill.style.transition = "width 0.2s ease"
  
      volumeBar.appendChild(volumeFill)
  
      // 创建自定义图标
      const volumeIcon = this.getVolumeIcon()
  
      // 显示 toast
      NotificationManager.show(`${NotificationManager.t("volume", "音量")}: ${this.vueApp.volume}%`, {
        type: "volume",
        id: "volume-level",
        icon: volumeIcon,
        duration: 1500,
        customContent: volumeBar,
      })
    },
  
    // 获取音量图标
    getVolumeIcon() {
      const volume = this.vueApp.volume
      let iconName
  
      if (volume === 0) {
        iconName = "volume-x"
      } else if (volume < 30) {
        iconName = "volume"
      } else if (volume < 70) {
        iconName = "volume-1"
      } else {
        iconName = "volume-2"
      }
  
      const color = this.vueApp.isDarkMode ? "#64d2ff" : "#5ac8fa"
  
      const iconContainer = document.createElement("div")
      iconContainer.innerHTML = `<i data-feather="${iconName}" style="color: ${color}; width: 18px; height: 18px;"></i>`
  
      return iconContainer
    },
  
    // 显示 toast 通知
    showToast(message, type = "info", options = {}) {
      NotificationManager.show(message, {
        type: type,
        duration: 2000,
        progress: true,
        ...options,
      })
    },
  
    // 切换全屏
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          this.showToast(`${NotificationManager.t("error", "错误")}: ${err.message}`, "error")
        })
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    },
  
    // 显示快捷键模态框
    showShortcutsModal() {
      // 检查是否已存在模态框
      let modal = document.getElementById("shortcuts-help-modal")
      if (modal) {
        modal.style.display = "flex"
        return
      }
  
      // 创建模态框
      modal = document.createElement("div")
      modal.id = "shortcuts-help-modal"
      modal.style.position = "fixed"
      modal.style.inset = "0"
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
      modal.style.backdropFilter = "blur(10px)"
      modal.style.WebkitBackdropFilter = "blur(10px)"
      modal.style.display = "flex"
      modal.style.alignItems = "center"
      modal.style.justifyContent = "center"
      modal.style.zIndex = "9999"
  
      // 创建模态框内容
      const modalContent = document.createElement("div")
      modalContent.style.backgroundColor = this.vueApp.isDarkMode ? "rgba(44, 44, 46, 0.95)" : "rgba(255, 255, 255, 0.95)"
      modalContent.style.color = this.vueApp.isDarkMode ? "#ffffff" : "#1d1d1f"
      modalContent.style.borderRadius = "16px"
      modalContent.style.boxShadow = this.vueApp.isDarkMode
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      modalContent.style.width = "90%"
      modalContent.style.maxWidth = "600px"
      modalContent.style.maxHeight = "80vh"
      modalContent.style.overflow = "hidden"
      modalContent.style.display = "flex"
      modalContent.style.flexDirection = "column"
      modalContent.style.border = this.vueApp.isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.1)"
  
      // 创建标题栏
      const modalHeader = document.createElement("div")
      modalHeader.style.display = "flex"
      modalHeader.style.alignItems = "center"
      modalHeader.style.justifyContent = "space-between"
      modalHeader.style.padding = "16px 20px"
      modalHeader.style.borderBottom = this.vueApp.isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.1)"
  
      const modalTitle = document.createElement("h3")
      modalTitle.textContent = NotificationManager.t("keyboardShortcuts", "键盘快捷键")
      modalTitle.style.margin = "0"
      modalTitle.style.fontSize = "18px"
      modalTitle.style.fontWeight = "600"
  
      const closeButton = document.createElement("button")
      closeButton.innerHTML = `<i data-feather="x"></i>`
      closeButton.style.background = "none"
      closeButton.style.border = "none"
      closeButton.style.cursor = "pointer"
      closeButton.style.display = "flex"
      closeButton.style.alignItems = "center"
      closeButton.style.justifyContent = "center"
      closeButton.style.width = "32px"
      closeButton.style.height = "32px"
      closeButton.style.borderRadius = "50%"
      closeButton.style.color = this.vueApp.isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"
  
      closeButton.addEventListener("mouseover", () => {
        closeButton.style.backgroundColor = this.vueApp.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
      })
  
      closeButton.addEventListener("mouseout", () => {
        closeButton.style.backgroundColor = "transparent"
      })
  
      closeButton.addEventListener("click", () => {
        modal.style.display = "none"
      })
  
      modalHeader.appendChild(modalTitle)
      modalHeader.appendChild(closeButton)
  
      // 创建内容区域
      const modalBody = document.createElement("div")
      modalBody.style.padding = "0"
      modalBody.style.overflowY = "auto"
      modalBody.style.maxHeight = "calc(80vh - 60px)"
  
      // 分类快捷键
      const categories = {
        playback: {
          title: NotificationManager.t("playback", "播放控制"),
          shortcuts: [],
        },
        navigation: {
          title: NotificationManager.t("navigation", "导航"),
          shortcuts: [],
        },
        other: {
          title: NotificationManager.t("other", "其他"),
          shortcuts: [],
        },
      }
  
      // 对快捷键进行分类
      this.shortcuts.forEach((shortcut) => {
        const name = shortcut.name
        if (["playPause", "nextTrack", "previousTrack", "volumeUp", "volumeDown", "muteUnmute"].includes(name)) {
          categories.playback.shortcuts.push(shortcut)
        } else if (["showLyrics", "nowPlaying", "library", "settings"].includes(name)) {
          categories.navigation.shortcuts.push(shortcut)
        } else {
          categories.other.shortcuts.push(shortcut)
        }
      })
  
      // 创建分类内容
      const categoriesContainer = document.createElement("div")
      categoriesContainer.style.display = "grid"
      categoriesContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))"
      categoriesContainer.style.gap = "0"
  
      // 添加每个分类
      Object.entries(categories).forEach(([key, category]) => {
        const categorySection = document.createElement("div")
        categorySection.style.padding = "20px"
        categorySection.style.borderRight = this.vueApp.isDarkMode
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.05)"
        categorySection.style.borderBottom = this.vueApp.isDarkMode
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.05)"
  
        const categoryTitle = document.createElement("h4")
        categoryTitle.textContent = category.title
        categoryTitle.style.margin = "0 0 16px 0"
        categoryTitle.style.fontSize = "16px"
        categoryTitle.style.fontWeight = "600"
        categoryTitle.style.color = this.vueApp.isDarkMode ? "#0a84ff" : "#0071e3"
  
        categorySection.appendChild(categoryTitle)
  
        // 添加快捷键
        category.shortcuts.forEach((shortcut) => {
          const shortcutItem = document.createElement("div")
          shortcutItem.style.display = "flex"
          shortcutItem.style.justifyContent = "space-between"
          shortcutItem.style.alignItems = "center"
          shortcutItem.style.marginBottom = "12px"
  
          const description = document.createElement("span")
          description.textContent = this.getLocalizedShortcutName(shortcut.name)
          description.style.fontSize = "14px"
  
          const keyDisplay = document.createElement("kbd")
          keyDisplay.textContent = this.getDisplayKey(shortcut.key)
          keyDisplay.style.display = "inline-block"
          keyDisplay.style.padding = "3px 6px"
          keyDisplay.style.borderRadius = "4px"
          keyDisplay.style.fontSize = "12px"
          keyDisplay.style.fontFamily = "SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          keyDisplay.style.backgroundColor = this.vueApp.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
          keyDisplay.style.border = this.vueApp.isDarkMode
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid rgba(0, 0, 0, 0.1)"
          keyDisplay.style.boxShadow = this.vueApp.isDarkMode ? "none" : "0 1px 0 rgba(0, 0, 0, 0.05)"
  
          shortcutItem.appendChild(description)
          shortcutItem.appendChild(keyDisplay)
          categorySection.appendChild(shortcutItem)
        })
  
        categoriesContainer.appendChild(categorySection)
      })
  
      modalBody.appendChild(categoriesContainer)
  
      // 添加底部提示
      const modalFooter = document.createElement("div")
      modalFooter.style.padding = "16px 20px"
      modalFooter.style.borderTop = this.vueApp.isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.05)"
      modalFooter.style.fontSize = "13px"
      modalFooter.style.color = this.vueApp.isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"
      modalFooter.style.textAlign = "center"
      modalFooter.textContent = NotificationManager.t("pressEscToClose", "按 ESC 键关闭")
  
      // 组装模态框
      modalContent.appendChild(modalHeader)
      modalContent.appendChild(modalBody)
      modalContent.appendChild(modalFooter)
      modal.appendChild(modalContent)
  
      // 添加到文档
      document.body.appendChild(modal)
  
      // 更新 feather 图标
      if (window.feather) {
        feather.replace()
      }
  
      // 添加 ESC 键关闭功能
      const handleEscKey = (e) => {
        if (e.key === "Escape" && modal.style.display !== "none") {
          modal.style.display = "none"
        }
      }
  
      document.addEventListener("keydown", handleEscKey)
  
      // 点击背景关闭
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none"
        }
      })
    },
  
    // 获取本地化的快捷键名称
    getLocalizedShortcutName(name) {
      const translations = {
        playPause: {
          en: "Play/Pause",
          zh: "播放/暂停",
          ja: "再生/一時停止",
          jakanjionly: "再生/停止",
          zh_TW: "播放/暫停",
          ko_KP: "재생/일시 중지",
        },
        nextTrack: {
          en: "Next Track",
          zh: "下一曲",
          ja: "次のトラック",
          jakanjionly: "次曲",
          zh_TW: "下一首",
          ko_KP: "다음 트랙",
        },
        previousTrack: {
          en: "Previous Track",
          zh: "上一曲",
          ja: "前のトラック",
          jakanjionly: "前曲",
          zh_TW: "上一首",
          ko_KP: "이전 트랙",
        },
        volumeUp: {
          en: "Volume Up",
          zh: "增加音量",
          ja: "音量を上げる",
          jakanjionly: "音量増加",
          zh_TW: "增加音量",
          ko_KP: "볼륨 증가",
        },
        volumeDown: {
          en: "Volume Down",
          zh: "减小音量",
          ja: "音量を下げる",
          jakanjionly: "音量減少",
          zh_TW: "降低音量",
          ko_KP: "볼륨 감소",
        },
        muteUnmute: {
          en: "Mute/Unmute",
          zh: "静音/取消静音",
          ja: "ミュート切替",
          jakanjionly: "消音切替",
          zh_TW: "靜音/取消靜音",
          ko_KP: "음소거/음소거 해제",
        },
        showLyrics: {
          en: "Show Lyrics",
          zh: "显示歌词",
          ja: "歌詞を表示",
          jakanjionly: "歌詞表示",
          zh_TW: "顯示歌詞",
          ko_KP: "가사 표시",
        },
        nowPlaying: {
          en: "Now Playing",
          zh: "正在播放",
          ja: "再生中",
          jakanjionly: "再生中",
          zh_TW: "正在播放",
          ko_KP: "지금 재생 중",
        },
        library: {
          en: "Library",
          zh: "音乐库",
          ja: "ライブラリ",
          jakanjionly: "音楽庫",
          zh_TW: "音樂庫",
          ko_KP: "라이브러리",
        },
        settings: {
          en: "Settings",
          zh: "设置",
          ja: "設定",
          jakanjionly: "設定",
          zh_TW: "設定",
          ko_KP: "설정",
        },
        toggleTheme: {
          en: "Toggle Theme",
          zh: "切换主题",
          ja: "テーマ切替",
          jakanjionly: "主題切替",
          zh_TW: "切換主題",
          ko_KP: "테마 전환",
        },
        toggleBackgroundMode: {
          en: "Toggle Background Mode",
          zh: "切换背景模式",
          ja: "背景モード切替",
          jakanjionly: "背景模式切替",
          zh_TW: "切換背景模式",
          ko_KP: "배경 모드 전환",
        },
        toggleFullscreen: {
          en: "Toggle Fullscreen",
          zh: "切换全屏",
          ja: "全画面切替",
          jakanjionly: "全画面切替",
          zh_TW: "切換全螢幕",
          ko_KP: "전체 화면 전환",
        },
        showShortcutsHelp: {
          en: "Show Keyboard Shortcuts",
          zh: "显示键盘快捷键",
          ja: "キーボードショートカットを表示",
          jakanjionly: "鍵盤捷徑表示",
          zh_TW: "顯示鍵盤快捷鍵",
          ko_KP: "키보드 단축키 표시",
        },
      }
  
      const locale = this.vueApp.$i18n.locale
      return translations[name] && translations[name][locale] ? translations[name][locale] : translations[name].en
    },
  
    // 获取显示的按键名称
    getDisplayKey(key) {
      switch (key) {
        case " ":
          return "Space"
        case "ArrowUp":
          return "↑"
        case "ArrowDown":
          return "↓"
        case "ArrowLeft":
          return "←"
        case "ArrowRight":
          return "→"
        default:
          return key.length === 1 ? key.toUpperCase() : key
      }
    },
  
    // 在设置页面添加快捷键按钮
    addShortcutsButton() {
      // 查找设置页面的最后一个部分
      const settingsSections = document.querySelectorAll(
        ".max-w-3xl.mx-auto.p-6 .space-y-6 section, .max-w-3xl.mx-auto.p-8 .space-y-6 section",
      )
      if (settingsSections.length === 0) return
  
      // 检查是否已存在按钮
      if (document.getElementById("keyboard-shortcuts-button")) return
  
      const lastSection = settingsSections[settingsSections.length - 1]
  
      // 创建按钮
      const shortcutsButton = document.createElement("button")
      shortcutsButton.id = "keyboard-shortcuts-button"
      shortcutsButton.className =
        "w-full p-3 bg-apple-highlight-light dark:bg-apple-highlight-dark text-white hover:opacity-90 transition-opacity flex items-center justify-between mt-4"
      shortcutsButton.innerHTML = `
              <span class="flex items-center gap-2">
                  <i data-feather="command" class="w-4 h-4"></i>
                  ${NotificationManager.t("keyboardShortcuts", "键盘快捷键")}
              </span>
              <i data-feather="chevron-right" class="w-4 h-4"></i>
          `
  
      shortcutsButton.addEventListener("click", () => {
        this.showShortcutsModal()
      })
  
      // 添加到设置页面
      lastSection.appendChild(shortcutsButton)
  
      // 更新 feather 图标
      if (window.feather) {
        feather.replace()
      }
    },
  }
  
  // 当文档加载完成时初始化
  document.addEventListener("DOMContentLoaded", () => {
    // 添加 toast 样式
    addToastStyles()
  
    // 等待 Vue 实例加载完成
    const checkVueLoaded = setInterval(() => {
      const app = document.querySelector("#app").__vue__
      if (app) {
        clearInterval(checkVueLoaded)
  
        // 添加属性以存储之前的音量
        app.previousVolume = app.volume
  
        // 初始化键盘快捷键
        KeyboardShortcuts.init(app)
  
        // 将函数暴露给全局作用域，以便其他脚本可以使用
        window.showToast = (message, type, options) => {
          NotificationManager.show(message, { type, ...options })
        }
  
        window.showShortcutsModal = () => {
          KeyboardShortcuts.showShortcutsModal()
        }
  
        console.log("键盘快捷键系统已初始化")
      }
    }, 100)
  })
  
  // Import Feather icons (if not already imported)
  if (typeof feather === "undefined") {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"
    script.onload = () => {
      feather.replace()
    }
    document.head.appendChild(script)
  } else {
    feather.replace()
  }
  