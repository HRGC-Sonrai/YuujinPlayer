const SystemLanguageDetector = {
  languageMap: {
    // 英语变体 English variants
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'en-CA': 'en',
    'en-AU': 'en',
    
    // 中文变体 Chinese variants
    'zh': 'zh',
    'zh-CN': 'zh',
    'zh-Hans': 'zh',
    'zh-Hans-CN': 'zh',
    'zh-TW': 'zh_TW',
    'zh-Hant': 'zh_TW',
    'zh-Hant-TW': 'zh_TW',
    'zh-HK': 'zh_TW',
    'zh-MO': 'zh_TW',
    
    // 日语变体 Japanese variants
    'ja': 'ja',
    'ja-JP': 'ja',
    
    // 韩语变体 Korean variants
    'ko': 'ko_KP',
    'ko-KR': 'ko_KP',
    'ko-KP': 'ko_KP'
  },

  // 默认语言 Default language
  defaultLanguage: 'en',

  // 应用支持的语言列表 App supported languages
  supportedLanguages: ['en', 'zh', 'zh_TW', 'ja', 'jakanjionly', 'ko_KP'],

  /**
   * 检测用户系统语言
   * Detect user's system language
   * @returns {string} 检测到的语言代码 Detected language code
   */
  detectSystemLanguage() {
    try {
      // 优先使用 navigator.languages 数组（更准确）
      // Prefer navigator.languages array (more accurate)
      if (navigator.languages && navigator.languages.length > 0) {
        for (const lang of navigator.languages) {
          const mappedLang = this.mapLanguageCode(lang);
          if (mappedLang) {
            console.log(`System language detected from languages array: ${lang} -> ${mappedLang}`);
            return mappedLang;
          }
        }
      }

      // 备用：使用 navigator.language
      // Fallback: use navigator.language
      if (navigator.language) {
        const mappedLang = this.mapLanguageCode(navigator.language);
        if (mappedLang) {
          console.log(`System language detected from navigator.language: ${navigator.language} -> ${mappedLang}`);
          return mappedLang;
        }
      }

      // 最后备用：使用 navigator.userLanguage (IE)
      // Final fallback: use navigator.userLanguage (IE)
      if (navigator.userLanguage) {
        const mappedLang = this.mapLanguageCode(navigator.userLanguage);
        if (mappedLang) {
          console.log(`System language detected from userLanguage: ${navigator.userLanguage} -> ${mappedLang}`);
          return mappedLang;
        }
      }

      console.log(`No system language detected, using default: ${this.defaultLanguage}`);
      return this.defaultLanguage;
    } catch (error) {
      console.error('Error detecting system language:', error);
      return this.defaultLanguage;
    }
  },

  /**
   * 将系统语言代码映射到应用支持的语言
   * Map system language code to app-supported language
   * @param {string} langCode 系统语言代码 System language code
   * @returns {string|null} 映射后的语言代码或null Mapped language code or null
   */
  mapLanguageCode(langCode) {
    if (!langCode) return null;

    // 直接匹配 Direct match
    if (this.languageMap[langCode]) {
      return this.languageMap[langCode];
    }

    // 尝试匹配主要语言代码（去掉地区代码）
    // Try to match primary language code (remove region code)
    const primaryLang = langCode.split('-')[0];
    if (this.languageMap[primaryLang]) {
      return this.languageMap[primaryLang];
    }

    // 特殊处理：检测是否为中文繁体相关
    // Special handling: detect if it's Traditional Chinese related
    if (langCode.includes('Hant') || langCode.includes('TW') || langCode.includes('HK') || langCode.includes('MO')) {
      return 'zh_TW';
    }

    // 特殊处理：检测是否为中文简体相关
    // Special handling: detect if it's Simplified Chinese related
    if (langCode.includes('Hans') || langCode.includes('CN')) {
      return 'zh';
    }

    return null;
  },

  /**
   * 检查语言是否被应用支持
   * Check if language is supported by the app
   * @param {string} langCode 语言代码 Language code
   * @returns {boolean} 是否支持 Whether supported
   */
  isLanguageSupported(langCode) {
    return this.supportedLanguages.includes(langCode);
  },

  /**
   * 获取语言的本地化名称
   * Get localized name of the language
   * @param {string} langCode 语言代码 Language code
   * @returns {string} 本地化名称 Localized name
   */
  getLanguageDisplayName(langCode) {
    const displayNames = {
      'en': 'English',
      'zh': '中文（简体）',
      'zh_TW': '中文（繁體）',
      'ja': '日本語',
      'jakanjionly': '日本語（偽中国語）',
      'ko_KP': '조선어'
    };
    return displayNames[langCode] || langCode;
  },

  /**
   * 应用系统语言设置
   * Apply system language setting
   * @param {Object} vueApp Vue应用实例 Vue app instance
   * @param {boolean} force 是否强制设置（忽略已保存的用户偏好）Whether to force setting (ignore saved user preference)
   */
  applySystemLanguage(vueApp, force = false) {
    try {
      // 检查是否已有用户手动设置的语言偏好
      // Check if there's already a manually set language preference
      const savedLanguage = localStorage.getItem('yuujin-player-language');
      
      if (!force && savedLanguage && this.isLanguageSupported(savedLanguage)) {
        console.log(`Using saved language preference: ${savedLanguage}`);
        vueApp.$i18n.locale = savedLanguage;
        return savedLanguage;
      }

      // 检测系统语言
      // Detect system language
      const detectedLanguage = this.detectSystemLanguage();
      
      if (this.isLanguageSupported(detectedLanguage)) {
        console.log(`Applying detected system language: ${detectedLanguage}`);
        vueApp.$i18n.locale = detectedLanguage;
        
        // 保存检测到的语言作为用户偏好（如果没有手动设置过）
        // Save detected language as user preference (if not manually set before)
        if (!savedLanguage) {
          localStorage.setItem('yuujin-player-language', detectedLanguage);
        }
        
        return detectedLanguage;
      } else {
        console.log(`Detected language ${detectedLanguage} not supported, using default: ${this.defaultLanguage}`);
        vueApp.$i18n.locale = this.defaultLanguage;
        return this.defaultLanguage;
      }
    } catch (error) {
      console.error('Error applying system language:', error);
      vueApp.$i18n.locale = this.defaultLanguage;
      return this.defaultLanguage;
    }
  },

  /**
   * 监听语言变化并保存用户偏好
   * Listen for language changes and save user preference
   * @param {Object} vueApp Vue应用实例 Vue app instance
   */
  setupLanguageChangeListener(vueApp) {
    // 监听Vue i18n的语言变化
    // Listen for Vue i18n language changes
    vueApp.$watch('$i18n.locale', (newLocale, oldLocale) => {
      if (newLocale !== oldLocale) {
        console.log(`Language changed from ${oldLocale} to ${newLocale}`);
        
        // 保存用户的语言选择
        // Save user's language choice
        localStorage.setItem('yuujin-player-language', newLocale);
        
        // 触发自定义事件，通知其他组件语言已变化
        // Trigger custom event to notify other components of language change
        const event = new CustomEvent('yuujin-language-changed', {
          detail: { 
            newLanguage: newLocale, 
            oldLanguage: oldLocale,
            displayName: this.getLanguageDisplayName(newLocale)
          }
        });
        document.dispatchEvent(event);
        
        // 显示语言变化通知（如果通知系统可用）
        // Show language change notification (if notification system is available)
        if (window.showToast) {
          const displayName = this.getLanguageDisplayName(newLocale);
          window.showToast(`Language changed to ${displayName}`, 'info', {
            duration: 2000,
            id: 'language-change'
          });
        }
      }
    });
  },

  /**
   * 获取系统语言信息（调试用）
   * Get system language info (for debugging)
   * @returns {Object} 系统语言信息 System language info
   */
  getSystemLanguageInfo() {
    return {
      languages: navigator.languages || [],
      language: navigator.language || '',
      userLanguage: navigator.userLanguage || '',
      detectedLanguage: this.detectSystemLanguage(),
      supportedLanguages: this.supportedLanguages,
      languageMap: this.languageMap
    };
  },

  /**
   * 重置语言设置为系统检测的语言
   * Reset language setting to system-detected language
   * @param {Object} vueApp Vue应用实例 Vue app instance
   */
  resetToSystemLanguage(vueApp) {
    // 清除保存的用户偏好
    // Clear saved user preference
    localStorage.removeItem('yuujin-player-language');
    
    // 重新应用系统语言
    // Reapply system language
    const appliedLanguage = this.applySystemLanguage(vueApp, true);
    
    console.log(`Language reset to system default: ${appliedLanguage}`);
    
    if (window.showToast) {
      const displayName = this.getLanguageDisplayName(appliedLanguage);
      window.showToast(`Language reset to system default: ${displayName}`, 'info', {
        duration: 3000,
        id: 'language-reset'
      });
    }
    
    return appliedLanguage;
  }
};

/**
 * 初始化系统语言检测功能
 * Initialize system language detection feature
 */
function initializeSystemLanguageDetection() {
  // 等待Vue应用加载完成
  // Wait for Vue app to load
  const checkVueLoaded = setInterval(() => {
    const app = document.querySelector("#app").__vue__;
    if (app && app.$i18n) {
      clearInterval(checkVueLoaded);
      
      console.log('Initializing system language detection...');
      
      // 应用系统语言设置
      // Apply system language setting
      const appliedLanguage = SystemLanguageDetector.applySystemLanguage(app);
      
      // 设置语言变化监听器
      // Setup language change listener
      SystemLanguageDetector.setupLanguageChangeListener(app);
      
      // 将功能暴露到全局作用域，方便调试和其他脚本使用
      // Expose functionality to global scope for debugging and other scripts
      window.SystemLanguageDetector = SystemLanguageDetector;
      
      // 添加重置语言的全局函数
      // Add global function to reset language
      window.resetToSystemLanguage = () => {
        return SystemLanguageDetector.resetToSystemLanguage(app);
      };
      
      // 添加获取语言信息的全局函数
      // Add global function to get language info
      window.getSystemLanguageInfo = () => {
        return SystemLanguageDetector.getSystemLanguageInfo();
      };
      
      console.log(`System language detection initialized. Applied language: ${appliedLanguage}`);
      console.log('Available functions: resetToSystemLanguage(), getSystemLanguageInfo()');
      
      // 显示初始化完成通知
      // Show initialization complete notification
      setTimeout(() => {
        if (window.showToast) {
          const displayName = SystemLanguageDetector.getLanguageDisplayName(appliedLanguage);
          window.showToast(`Language set to: ${displayName}`, 'info', {
            duration: 2000,
            id: 'language-init'
          });
        }
      }, 1000);
    }
  }, 100);
  
  // 防止无限等待
  // Prevent infinite waiting
  setTimeout(() => {
    clearInterval(checkVueLoaded);
    console.warn('Vue app not found within timeout, system language detection not initialized');
  }, 10000);
}

// 监听DOM加载完成事件
// Listen for DOM content loaded event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSystemLanguageDetection);
} else {
  // DOM已经加载完成
  // DOM already loaded
  initializeSystemLanguageDetection();
}

// 监听自定义语言变化事件（示例用法）
// Listen for custom language change events (example usage)
document.addEventListener('yuujin-language-changed', (event) => {
  console.log('Language change event received:', event.detail);
  
  // 这里可以添加其他需要响应语言变化的逻辑
  // Add other logic that needs to respond to language changes here
  
  // 例如：更新页面标题
  // Example: update page title
  const titles = {
    'en': 'Yuujin Player',
    'zh': 'ユウジン 播放器',
    'zh_TW': 'ユウジン 播放器',
    'ja': 'ユウジン プレイヤー',
    'jakanjionly': '莜仁播放器',
    'ko_KP': 'ユウジン 재생기'
  };
  
  const newTitle = titles[event.detail.newLanguage] || 'Yuujin Player';
  document.title = newTitle;
});

// 导出模块（如果使用模块系统）
// Export module (if using module system)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SystemLanguageDetector;
}