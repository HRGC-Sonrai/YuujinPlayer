const messages = {
    en: {
        musicPlayer: 'Music Player',
        library: 'Library',
        nowPlaying: 'Now Playing',
        lyrics: 'Lyrics',
        playlist: 'Playlist',
        addTrack: 'Add Track',
        addFolder: 'Add Folder',
        importLyrics: 'Import Lyrics',
        importTranslation: 'Import Translation',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        settings: 'Settings',
        language: 'Language',
        theme: 'Theme',
        equalizer: 'Equalizer',
        performanceMode: 'Performance Mode',
        enablePerformanceMode: 'Enable Performance Mode',
        enableExtremePerformanceMode: 'Enable Extreme Performance Mode',
        disablePerformanceMode: 'Disable Performance Mode',
        en: 'English',
        zh: '中文',
        ja: '日本語',
        generalSettings: 'General Settings',
        audioSettings: 'Audio Settings',
        performanceSettings: 'Performance Settings',
        dataManagement: 'Data Management',
        volume: 'Volume',
        backgroundEffects: 'Background Effects',
        enableBackgroundEffects: 'Enable Background Effects',
        exportData: 'Export Data',
        importData: 'Import Data',
        clearAllData: 'Clear All Data',
        playerName: 'Yuujin Player',
        playerNameEn: 'Yuujin Player',
        version: 'Version: Release {version}',
        supportText: 'Yuujin Player project is supported by the following projects:',
        supportList: ['Vue.js', 'Tailwind CSS', 'MIDI.js', 'EDGE Webview2(Only Windows)', 'feather-icons'],
        showDesktopLyrics: 'Show Desktop Lyrics',
        hideDesktopLyrics: 'Hide Desktop Lyrics',
        backgroundMode: 'Background Mode',
        defaultBackground: 'Default Background',
        visualizerBackground: 'Music Visualization',
    },
    zh: {
        musicPlayer: '音乐播放器',
        library: '音乐库',
        nowPlaying: '正在播放',
        lyrics: '歌词',
        playlist: '播放列表',
        addTrack: '添加歌曲',
        addFolder: '添加文件夹',
        importLyrics: '导入歌词',
        importTranslation: '导入翻译',
        darkMode: '深色模式',
        lightMode: '浅色模式',
        settings: '设置',
        language: '语言',
        theme: '主题',
        equalizer: '均衡器',
        performanceMode: '性能模式',
        enablePerformanceMode: '启用性能模式',
        enableExtremePerformanceMode: '启用极限性能模式',
        disablePerformanceMode: '禁用性能模式',
        en: 'English',
        zh: '中文',
        ja: '日本語',
        generalSettings: '常规设置',
        audioSettings: '音频设置',
        performanceSettings: '性能设置',
        dataManagement: '数据管理',
        volume: '音量',
        backgroundEffects: '背景效果',
        enableBackgroundEffects: '启用背景效果',
        exportData: '导出数据',
        importData: '导入数据',
        clearAllData: '清除所有数据',
        playerName: 'ユウジン プレイヤー',
        playerNameEn: 'Yuujin Player',
        version: '版本：Release {version}',
        supportText: 'ユウジン プレイヤー项目离不开以下项目的支持:',
        supportList: ['Vue.js', 'Tailwind CSS', 'MIDI.js', 'EDGE Webview2(Windows 独占)', 'feather-icons'],
        showDesktopLyrics: '显示桌面歌词',
        hideDesktopLyrics: '隐藏桌面歌词',
        backgroundMode: '背景模式',
        defaultBackground: '默认背景',
        visualizerBackground: '音乐可视化',
    },
    ja: {
        musicPlayer: 'ミュージックプレーヤー',
        library: 'ライブラリ',
        nowPlaying: '再生中',
        lyrics: '歌詞',
        playlist: 'プレイリスト',
        addTrack: 'トラックを追加',
        addFolder: 'フォルダを追加',
        importLyrics: '歌詞をインポート',
        importTranslation: '翻訳をインポート',
        darkMode: 'ダークモード',
        lightMode: 'ライトモード',
        settings: '設定',
        language: '言語',
        theme: 'テーマ',
        equalizer: 'イコライザー',
        performanceMode: 'パフォーマンスモード',
        enablePerformanceMode: 'パフォーマンスモードを有効にする',
        enableExtremePerformanceMode: '極限パフォーマンスモードを有効にする',
        disablePerformanceMode: 'パフォーマンスモードを無効にする',
        en: 'English',
        zh: '中文',
        ja: '日本語',
        generalSettings: '一般設定',
        audioSettings: 'オーディオ設定',
        performanceSettings: 'パフォーマンス設定',
        dataManagement: 'データ管理',
        volume: '音量',
        backgroundEffects: '背景エフェクト',
        enableBackgroundEffects: '背景エフェクトを有効にする',
        exportData: 'データをエクスポート',
        importData: 'データをインポート',
        clearAllData: 'すべてのデータをクリア',
        playerName: 'ユウジン プレイヤー',
        playerNameEn: 'Yuujin Player',
        version: 'バージョン：Release {version}',
        supportText: 'ユウジン プレイヤープロジェクトは以下のプロジェクトのサポートを受けています：',
        supportList: ['Vue.js', 'Tailwind CSS', 'MIDI.js', 'EDGE Webview2（ウインドウズ Only）', 'feather-icons'],
        showDesktopLyrics: 'デスクトップ歌詞を表示',
        hideDesktopLyrics: 'デスクトップ歌詞を隠す',
        backgroundMode: '背景モード',
        defaultBackground: 'デフォルト背景',
        visualizerBackground: '音楽可視化',
    },
    jakanjionly: {
        musicPlayer: '音楽播放器',
        library: '音楽庫',
        nowPlaying: '再生中',
        lyrics: '歌詞',
        playlist: '再生目録',
        addTrack: '曲目追加',
        addFolder: '目録追加',
        importLyrics: '歌詞輸入',
        importTranslation: '翻訳輸入',
        darkMode: '暗色模式',
        lightMode: '明色模式',
        settings: '設定',
        language: '言語',
        theme: '主題',
        equalizer: '均衡器',
        performanceMode: '性能模式',
        enablePerformanceMode: '性能模式有効化',
        enableExtremePerformanceMode: '極限性能模式有効化',
        disablePerformanceMode: '性能模式無効化',
        en: '英語',
        zh: '中国語',
        ja: '日本語',
        generalSettings: '一般設定',
        audioSettings: '音響設定',
        performanceSettings: '性能設定',
        dataManagement: '資料管理',
        volume: '音量',
        backgroundEffects: '背景効果',
        enableBackgroundEffects: '背景効果有効化',
        exportData: '資料書出',
        importData: '資料取込',
        clearAllData: '全資料消去',
        playerName: '莜仁播放器',
        playerNameEn: 'Yuujin Player',
        version: '版本：Release {version}',
        supportText: '莜仁播放器項目は以下の項目の支持を受けています:',
        supportList: ['Vue.js', 'Tailwind CSS', 'MIDI.js', 'EDGE Webview2（WINDOWS 専用）', 'FEATHER ICONS'],
        showDesktopLyrics: '机上歌詞表示',
        hideDesktopLyrics: '机上歌詞隠蔽',
        backgroundMode: '背景模式',
        defaultBackground: '既定背景',
        visualizerBackground: '音楽視覚化'
    },
    zh_TW: {
        musicPlayer: '音樂播放器',
        library: '音樂庫',
        nowPlaying: '正在播放',
        lyrics: '歌詞',
        playlist: '播放清單',
        addTrack: '新增歌曲',
        addFolder: '新增資料夾',
        importLyrics: '匯入歌詞',
        importTranslation: '匯入翻譯',
        darkMode: '深色模式',
        lightMode: '淺色模式',
        settings: '設定',
        language: '語言',
        theme: '主題',
        equalizer: '等化器',
        performanceMode: '效能模式',
        enablePerformanceMode: '啟用效能模式',
        enableExtremePerformanceMode: '啟用極限效能模式',
        disablePerformanceMode: '停用效能模式',
        en: 'English',
        zh: '中文',
        ja: '日本語',
        generalSettings: '一般設定',
        audioSettings: '音訊設定',
        performanceSettings: '效能設定',
        dataManagement: '資料管理',
        volume: '音量',
        backgroundEffects: '背景效果',
        enableBackgroundEffects: '啟用背景效果',
        exportData: '匯出資料',
        importData: '匯入資料',
        clearAllData: '清除所有資料',
        playerName: 'ユウジン 播放器',
        playerNameEn: 'Yuujin Player',
        version: '版本：Release {version}',
        supportText: 'ユウジン 播放器專案離不開以下專案的支援:',
        supportList: ['Vue.js', 'Tailwind CSS', 'MIDI.js', 'EDGE Webview2(Windows 獨佔)', 'feather-icons'],
        showDesktopLyrics: '顯示桌面歌詞',
        hideDesktopLyrics: '隱藏桌面歌詞',
        backgroundMode: '背景模式',
        defaultBackground: '預設背景',
        visualizerBackground: '音樂視覺化'
      },
    ko_KP: {
        musicPlayer: '음악 재생기',
        library: '음악 도서관',
        nowPlaying: '지금 재생 중',
        lyrics: '가사',
        playlist: '재생 목록',
        addTrack: '노래 추가',
        addFolder: '폴더 추가',
        importLyrics: '가사 가져오기',
        importTranslation: '번역 가져오기',
        darkMode: '어두운 모드',
        lightMode: '밝은 모드',
        settings: '설정',
        language: '언어',
        theme: '테마',
        equalizer: '이퀄라이저',
        performanceMode: '성능 모드',
        enablePerformanceMode: '성능 모드 활성화',
        enableExtremePerformanceMode: '극한 성능 모드 활성화',
        disablePerformanceMode: '성능 모드 비활성화',
        en: 'English',
        zh: '中文',
        ja: '日本語',
        generalSettings: '일반 설정',
        audioSettings: '오디오 설정',
        performanceSettings: '성능 설정',
        dataManagement: '데이터 관리',
        volume: '음량',
        backgroundEffects: '배경 효과',
        enableBackgroundEffects: '배경 효과 활성화',
        exportData: '데이터 내보내기',
        importData: '데이터 가져오기',
        clearAllData: '모든 데이터 지우기',
        playerName: 'ユウジン 재생기',
        playerNameEn: 'Yuujin Player',
        version: '버전: Release {version}',
        supportText: 'ユウジン 재생기 프로젝트는 다음 프로젝트의 지원을 받고 있습니다:',
        supportList: ['Vue.js', 'Tailwind CSS', 'MIDI.js', 'EDGE Webview2(Windows 독점)', 'feather-icons'],
        showDesktopLyrics: '데스크톱 가사 표시',
        hideDesktopLyrics: '데스크톱 가사 숨기기',
        backgroundMode: '배경 모드',
        defaultBackground: '기본 배경',
        visualizerBackground: '음악 시각화'
    }
};

const i18n = new VueI18n({
    locale: 'en',
    messages,
});

new Vue({
    el: '#app',
    i18n,
    data: {
        sidebarOpen: true,
        currentView: 'library',
        playlist: [],
        currentTrackIndex: -1,
        isPlaying: false,
        audio: new Audio(),
        progress: 0,
        currentTime: 0,
        duration: 0,
        lyrics: [],
        translations: {},
        activeLyricIndex: -1,
        waveform: null,
        isDarkMode: false,
        resizeObserver: null,
        lyricsTranslateY: 0,
        isMidiTrack: false,
        midiPlayer: null,
        equalizerBands: [
            { frequency: 32, gain: 0 },
            { frequency: 64, gain: 0 },
            { frequency: 125, gain: 0 },
            { frequency: 250, gain: 0 },
            { frequency: 500, gain: 0 },
            { frequency: 1000, gain: 0 },
            { frequency: 2000, gain: 0 },
            { frequency: 4000, gain: 0 },
            { frequency: 8000, gain: 0 },
            { frequency: 16000, gain: 0 }
        ],
        audioContext: null,
        equalizer: null,
        backgroundImage: '',
        isDropdownOpen: false,
        performanceMode: false,
        extremePerformanceMode: false,
        volume: 100,
        backgroundEffects: true,
        libraryLayout: 'grid',
        showModal: false,
        desktopLyricsEnabled: false,
        backgroundMode: 1, // 1 = default background, 2 = bar visualizer
        barVisualizerActive: false,
        barAnalyser: null,
    },
    computed: {
        currentTrack() {
            return this.playlist[this.currentTrackIndex] || { 
                title: this.$t('musicPlayer'), 
                artist: '',
                album: '',
                coverArt: 'https://via.placeholder.com/300'
            };
        },
        displayedLyrics() {
            return this.lyrics.map(line => ({
                ...line,
                translation: this.translations[line.time]
            }));
        },
        currentLyric() {
            if (this.lyrics.length > 0 && this.activeLyricIndex >= 0) {
              return this.lyrics[this.activeLyricIndex].parts.map(part => part.text).join('');
            }
            return '';
          },
    },
    watch: {
        '$i18n.locale': function (newLocale) {
            console.log('Language changed to: ' + newLocale);
        },
        currentTrackIndex: function() {
            this.updateWaveform();
        },
        isDarkMode: {
            handler() {
                this.adjustTransparency();
            },
            immediate: true
        },
        currentTrackIndex: {
            handler(newIndex) {
                if (newIndex >= 0 && newIndex < this.playlist.length) {
                    const track = this.playlist[newIndex];
                    this.updateBackgroundFromAlbumArt(track.coverArt);
                }
            },
            immediate: true
        },
        volume: function(newVolume) {
            this.audio.volume = newVolume / 100;
        },
        backgroundMode: function(newMode) {
            if (newMode === 2 && this.isPlaying) {
                this.setupBarVisualizer();
            } else {
                this.stopBarVisualizer();
            }
        }
    },
    methods: {
        setView(view) {
            this.currentView = view;
        },
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        togglePlay() {
            if (this.isMidiTrack) {
                if (this.isPlaying) {
                    this.midiPlayer.pause();
                } else {
                    this.midiPlayer.resume();
                }
            } else {
                if (this.isPlaying) {
                    this.audio.pause();
                    if (this.backgroundMode === 2) {
                        this.stopBarVisualizer();
                    }
                } else {
                    if (this.audioContext && this.audioContext.state === 'suspended') {
                        this.audioContext.resume();
                    }
                    this.audio.play().catch(e => console.error("Error playing audio:", e));
                    if (this.backgroundMode === 2) {
                        this.setupBarVisualizer();
                    }
                }
            }
            this.isPlaying = !this.isPlaying;
            this.updateFeatherIcons();
        },
        async playTrack(index) {
            if (index >= 0 && index < this.playlist.length) {
                this.currentTrackIndex = index;
                const track = this.playlist[this.currentTrackIndex];
                this.isMidiTrack = track.isMidi;

                await this.updateBackgroundFromAlbumArt(track.coverArt);

                if (this.isMidiTrack) {
                    this.audio.pause();
                    try {
                        await this.initMidiPlayer(track.file);
                        this.isPlaying = true;
                    } catch (error) {
                        console.error("Error initializing MIDI player:", error);
                        this.isPlaying = false;
                    }
                } else {
                    if (this.midiPlayer) {
                        this.midiPlayer.stop();
                    }
                    this.audio.src = URL.createObjectURL(track.file);
                    
                    try {
                        await new Promise((resolve, reject) => {
                            this.audio.oncanplaythrough = resolve;
                            this.audio.onerror = reject;
                            this.audio.load();
                        });

                        await this.audio.play();
                        this.isPlaying = true;
                        console.log("Audio started playing successfully");
                    } catch (error) {
                        console.error("Error playing audio:", error);
                        console.log("Current track:", track);
                        console.log("Audio src:", this.audio.src);
                        this.isPlaying = false;
                    }
                }

                this.setView('nowPlaying');
                this.updateWaveform();
                this.updateFeatherIcons();
                
                // Setup bar visualizer if in that mode
                if (this.backgroundMode === 2 && this.isPlaying) {
                    this.setupBarVisualizer();
                }
            }
        },
        playNext() {
            if (this.playlist.length > 0) {
                this.playTrack((this.currentTrackIndex + 1) % this.playlist.length);
            }
        },
        playPrevious() {
            if (this.playlist.length > 0) {
                this.playTrack((this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length);
            }
        },
        updateProgress() {
            if (this.isMidiTrack) {
                if (this.midiPlayer) {
                    const currentTime = this.midiPlayer.getSongTime();
                    const totalTime = this.midiPlayer.getSongTime(true);
                    this.progress = (currentTime / totalTime) * 100 || 0;
                    this.currentTime = currentTime;
                    this.duration = totalTime;
                }
            } else {
                if (this.audio.duration && !isNaN(this.audio.duration)) {
                    this.progress = (this.audio.currentTime / this.audio.duration) * 100 || 0;
                    this.currentTime = this.audio.currentTime;
                    this.duration = this.audio.duration;
                } else {
                    this.progress = 0;
                    this.currentTime = 0;
                    this.duration = 0;
                }
            }
            this.updateActiveLyric();
        },
        formatTime(time) {
            if (isNaN(time) || time === Infinity) {
                return '0:00';
            }
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        async handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                await this.addTrackToPlaylist(file);
            }
        },
        async handleFolderSelect(event) {
            const files = Array.from(event.target.files);
            for (const file of files) {
                if (file.type.startsWith('audio/') || file.name.endsWith('.mid') || file.name.endsWith('.midi')) {
                    await this.addTrackToPlaylist(file);
                }
            }
        },
        async addTrackToPlaylist(file) {
            if (file.type.startsWith('audio/') || file.name.endsWith('.mp3')) {
                try {
                    const tags = await this.getAudioTags(file);
                    const track = {
                        id: Date.now() + Math.random(),
                        title: tags.title || file.name.replace(/\.[^/.]+$/, ""),
                        artist: tags.artist || 'Unknown Artist',
                        album: tags.album || 'Unknown Album',
                        file: file,
                        coverArt: tags.picture ? this.getAlbumArtUrl(tags.picture) : 'https://via.placeholder.com/300',
                        isMidi: false
                    };
                    this.playlist.push(track);
                    if (this.playlist.length === 1) {
                        this.playTrack(0);
                    }
                } catch (error) {
                    console.error('Error parsing metadata:', error);
                    const track = {
                        id: Date.now() + Math.random(),
                        title: file.name.replace(/\.[^/.]+$/, ""),
                        artist: 'Unknown Artist',
                        album: 'Unknown Album',
                        file: file,
                        coverArt: 'https://via.placeholder.com/300',
                        isMidi: false
                    };
                    this.playlist.push(track);
                }
            } else if (file.name.endsWith('.mid') || file.name.endsWith('.midi')) {
                const track = {
                    id: Date.now() + Math.random(),
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    artist: 'MIDI Track',
                    album: 'MIDI Album',
                    file: file,
                    coverArt: 'https://via.placeholder.com/300?text=MIDI',
                    isMidi: true
                };
                this.playlist.push(track);
                if (this.playlist.length === 1) {
                    this.playTrack(0);
                }
            }
        },
        getAudioTags(file) {
            return new Promise((resolve, reject) => {
                jsmediatags.read(file, {
                    onSuccess: function(tag) {
                        resolve({
                            title: tag.tags.title,
                            artist: tag.tags.artist,
                            album: tag.tags.album,
                            picture: tag.tags.picture
                        });
                    },
                    onError: function(error) {
                        reject(error);
                    }
                });
            });
        },
        getAlbumArtUrl(picture) {
            if (picture) {
                let base64String = "";
                for (let i = 0; i < picture.data.length; i++) {
                    base64String += String.fromCharCode(picture.data[i]);
                }
                return `data:${picture.format};base64,${window.btoa(base64String)}`;
            }
            return 'https://via.placeholder.com/300';
        },
        importLyrics() {
            this.$refs.lyricsInput.click();
        },
        importTranslation() {
            this.$refs.translationInput.click();
        },
        handleLyricsImport(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    this.lyrics = this.parseLRC(content);
                };
                reader.readAsText(file);
            }
        },
        handleTranslationImport(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    this.translations = this.parseLRC(content).reduce((acc, line) => {
                        acc[line.time] = line.parts.map(part => part.text).join('');
                        return acc;
                    }, {});
                };
                reader.readAsText(file);
            }
        },
        parseLRC(lrc) {
            const lines = lrc.split('\n');
            const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})(\/?r?)\]/;
            return lines
                .map(line => {
                    const match = timeRegex.exec(line);
                    if (match) {
                        const [, min, sec, ms, alignment] = match;
                        const time = parseFloat(min) * 60 + parseFloat(sec) + parseFloat(ms) / 1000;
                        const text = line.replace(timeRegex, '').trim();
                        const parts = this.parseHarmony(text);
                        const isRightAligned = alignment === '/r';
                        return { time, parts, isRightAligned };
                    }
                    return null;
                })
                .filter(line => line !== null)
                .sort((a, b) => a.time - b.time);
        },
        parseHarmony(text) {
            const parts = [];
            let isHarmony = false;
            let currentPart = '';

            for (let i = 0; i < text.length; i++) {
                if (text[i] === '(') {
                    if (currentPart) {
                        parts.push({ text: currentPart, isHarmony: false });
                        currentPart = '';
                    }
                    isHarmony = true;
                } else if (text[i] === ')') {
                    parts.push({ text: currentPart, isHarmony: true });
                    currentPart = '';
                    isHarmony = false;
                } else {
                    currentPart += text[i];
                }
            }

            if (currentPart) {
                parts.push({ text: currentPart, isHarmony: isHarmony });
            }

            return parts;
        },
        updateActiveLyric() {
            const currentTime = this.isMidiTrack ? (this.midiPlayer ? this.midiPlayer.getSongTime() : 0) : this.audio.currentTime;
            let newIndex = this.lyrics.findIndex(line => line.time > currentTime);
            if (newIndex === -1) {
                newIndex = this.lyrics.length - 1;
            } else {
                newIndex = Math.max(0, newIndex - 1);
            }
            if (newIndex !== this.activeLyricIndex) {
                this.activeLyricIndex = newIndex;
                this.$nextTick(() => {
                    this.scrollToActiveLyric();
                    if (this.desktopLyricsEnabled) {
                        this.showDesktopLyrics();
                    }
                });
            }
        },
        scrollToActiveLyric() {
            const container = this.$refs.lyricsContainer;
            const activeElement = this.$refs['lyricLine_' + this.activeLyricIndex][0];
        
            if (container && activeElement) {
                const containerHeight = container.clientHeight;
                const elementTop = activeElement.offsetTop;
                const elementHeight = activeElement.clientHeight;
                
                // Calculate the target scroll position, moving the active lyric to 20% from the top
                const targetScrollPosition = elementTop - (containerHeight * 0.2) + (elementHeight / 2);
        
                // Use GSAP to create a faster scroll
                gsap.to(container, {
                    duration: 0.55, // Reduced duration for faster scroll
                    scrollTop: targetScrollPosition,
                    ease: "power2.out",
                    onUpdate: () => {
                        // Ensure the lyrics content doesn't scroll beyond the container's boundaries
                        const lyricsContent = container.querySelector('.lyrics-content');
                        const maxScroll = lyricsContent.clientHeight - container.clientHeight;
        
                        if (container.scrollTop > maxScroll) {
                            container.scrollTop = maxScroll;
                        }
        
                        // Apply highlight and blur effects to lyric lines
                        const lyrics = container.querySelectorAll('.lyric-line');
                        lyrics.forEach((lyric, index) => {
                            const distance = Math.abs(lyric.offsetTop - elementTop);
                            const blurAmount = Math.min(distance / 150, 2);
        
                            if (index === this.activeLyricIndex) {
                                // Immediate highlight for active lyric (unchanged)
                                gsap.to(lyric, {
                                    duration: 0,
                                    color: 'rgba(255, 255, 255, 1)',
                                    filter: 'blur(0px)',
                                    fontWeight: 'bold',
                                    ease: "none"
                                });
        
                            } else {
                                // Smooth transition for non-active lyrics
                                gsap.to(lyric, { 
                                    duration: 0.1, // Reduced duration for faster transition
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textShadow: 'none',
                                    filter: `blur(${blurAmount}px)`,
                                    fontWeight: 'normal',
                                    ease: "power2.inOut"
                                });
        
                                // Remove shadow from translation for non-active lyrics
                                const translation = lyric.querySelector('.translation');
                                if (translation) {
                                    gsap.to(translation, {
                                        duration: 0.1,
                                        textShadow: 'none',
                                        ease: "power2.inOut"
                                    });
                                }
                            }
                        });
                    }
                });
            }
        },
        updateWaveform() {
            if (this.waveform) {
                this.waveform.destroy();
            }
            
            if (this.isMidiTrack) {
                const options = {
                    chart: {
                        type: 'line',
                        height: this.extremePerformanceMode ? 25 : (this.performanceMode ? 50 : 100),
                        width: this.extremePerformanceMode ? '25%' : (this.performanceMode ? '50%' : '100%'),
                        animations: {
                            enabled: !this.performanceMode,
                        },
                        toolbar: {
                            show: false
                        },
                        background: 'transparent'
                    },
                    series: [{
                        name: 'MIDI Visualization',
                        data: Array(128).fill(0)
                    }],
                    xaxis: {
                        labels: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        },
                        max: 127
                    },
                    grid: {
                        show: false
                    },
                    colors: [this.isDarkMode ? '#0a84ff' : '#0071e3']
                };
                
                this.waveform = new ApexCharts(document.querySelector("#waveform"), options);
                this.waveform.render();
                
                const updateMidiVisualization = () => {
                    if (this.midiPlayer && this.midiPlayer.playback) {
                        const activeNotes = this.midiPlayer.playback.activeNotes;
                        const visualizationData = Array(128).fill(0);
                        activeNotes.forEach(note => {
                            visualizationData[note.noteNumber] = note.velocity;
                        });
                        this.waveform.updateSeries([{
                            data: visualizationData
                        }]);
                    }
                    if (!this.extremePerformanceMode) {
                        requestAnimationFrame(updateMidiVisualization);
                    }
                };
                
                updateMidiVisualization();
            } else {
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                const analyser = this.audioContext.createAnalyser();
                const source = this.audioContext.createMediaElementSource(this.audio);
                source.connect(analyser);
                analyser.connect(this.audioContext.destination);
                
                analyser.fftSize = 256;
                const bufferLength = this.extremePerformanceMode ? analyser.frequencyBinCount / 4 : (this.performanceMode ? analyser.frequencyBinCount / 2 : analyser.frequencyBinCount);
                const dataArray = new Uint8Array(bufferLength);
                
                const options = {
                    chart: {
                        type: 'bar',
                        height: this.extremePerformanceMode ? 25 : (this.performanceMode ? 50 : 100),
                        width: this.extremePerformanceMode ? '25%' : (this.performanceMode ? '50%' : '100%'),
                        animations: {
                            enabled: !this.performanceMode,
                        },
                        toolbar: {
                            show: false
                        },
                        background: 'transparent'
                    },
                    series: [{
                        name: 'waveform',
                        data: Array(bufferLength).fill(0)
                    }],
                    xaxis: {
                        labels: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        },
                        max: 255
                    },
                    grid: {
                        show: false
                    },
                    colors: [this.isDarkMode ? '#0a84ff' : '#0071e3']
                };
                
                this.waveform = new ApexCharts(document.querySelector("#waveform"), options);
                this.waveform.render();
                
                const updateWaveform = () => {
                    analyser.getByteFrequencyData(dataArray);
                    this.waveform.updateSeries([{
                        data: Array.from(dataArray)
                    }]);
                    if (this.extremePerformanceMode) {
                        setTimeout(updateWaveform, 500);
                    } else if (this.performanceMode) {
                        setTimeout(updateWaveform, 100);
                    } else {
                        requestAnimationFrame(updateWaveform);
                    }
                };
                
                updateWaveform();
            }
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            }
            if (this.waveform) {
                this.waveform.updateOptions({
                    colors: [this.isDarkMode ? '#0a84ff' : '#0071e3']
                });
            }
            this.updateOverlayColor();
            this.updateFeatherIcons();
        },
        updateFeatherIcons() {
            this.$nextTick(() => {
                feather.replace();
            });
        },
        async initMidiPlayer(file) {
            await MIDI.loadPlugin({
                soundfontUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
                instrument: "acoustic_grand_piano",
                onprogress: (state, progress) => {
                    console.log(state, progress);
                },
                onsuccess: () => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const midiFile = new Uint8Array(e.target.result);
                        this.midiPlayer = new MIDI.Player();
                        this.midiPlayer.loadArrayBuffer(midiFile);
                        this.midiPlayer.start();
                        this.midiPlayer.on('endOfFile', () => {
                            this.playNext();
                        });
                    };
                    reader.readAsArrayBuffer(file);
                }
            });
        },
        initEqualizer() {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            const source = this.audioContext.createMediaElementSource(this.audio);

            this.equalizer = this.equalizerBands.map(band => {
                const filter = this.audioContext.createBiquadFilter();
                filter.type = 'peaking';
                filter.frequency.value = band.frequency;
                filter.Q.value = 1;
                filter.gain.value = band.gain;
                return filter;
            });

            source.connect(this.equalizer[0]);
            for (let i = 0; i < this.equalizer.length - 1; i++) {
                this.equalizer[i].connect(this.equalizer[i + 1]);
            }
            this.equalizer[this.equalizer.length - 1].connect(this.audioContext.destination);

            this.$nextTick(() => {
                this.equalizerBands.forEach((band, index) => {
                    const slider = document.getElementById(`eq-slider-${index}`);
                    noUiSlider.create(slider, {
                        start: [0],
                        range: {
                            'min': -12,
                            'max': 12
                        },
                        orientation: 'vertical',
                        direction: 'rtl'
                    });

                    slider.noUiSlider.on('update', (values) => {
                        const gain = parseFloat(values[0]);
                        this.equalizer[index].gain.setValueAtTime(gain, this.audioContext.currentTime);
                        this.equalizerBands[index].gain = gain;
                    });
                });
            });
        },
        async updateBackgroundFromAlbumArt(coverArtUrl) {
            this.backgroundImage = coverArtUrl;
            
            const flowingAlbum1 = document.getElementById('flowingAlbum1');
            const flowingAlbum2 = document.getElementById('flowingAlbum2');
            
            flowingAlbum1.style.backgroundImage = `url(${coverArtUrl})`;
            flowingAlbum2.style.backgroundImage = `url(${coverArtUrl})`;
            
            flowingAlbum2.style.animationDelay = '10s';
            
            this.updateOverlayColor();
            
            // If we're in bar visualizer mode, set it up
            if (this.backgroundMode === 2 && this.isPlaying) {
                this.setupBarVisualizer();
            }
        },
        updateOverlayColor() {
            const overlay = document.getElementById('backgroundOverlay');
            if (this.isDarkMode) {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            } else {
                overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            }
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        toggleLibraryLayout() {
            this.libraryLayout = this.libraryLayout === 'grid' ? 'list' : 'grid';
          },
        selectLanguage(locale) {
            this.$i18n.locale = locale;
            this.isDropdownOpen = false;
        },
        togglePerformanceMode() {
            if (!this.performanceMode) {
                this.performanceMode = true;
                this.extremePerformanceMode = false;
            } else if (this.performanceMode && !this.extremePerformanceMode) {
                this.extremePerformanceMode = true;
            } else {
                this.performanceMode = false;
                this.extremePerformanceMode = false;
            }
            this.applyPerformanceMode();
        },
        applyPerformanceMode() {
            if (this.performanceMode) {
                document.body.classList.add('performance-mode');
                if (this.extremePerformanceMode) {
                    document.body.classList.add('extreme-performance-mode');
                } else {
                    document.body.classList.remove('extreme-performance-mode');
                }
                
                const flowingAlbums = document.querySelectorAll('.flowing-album');
                flowingAlbums.forEach(album => {
                    album.style.animation = 'none';
                });

                this.lowerImageResolution();

                if (this.extremePerformanceMode) {
                    this.hideWaveform();
                } else {
                    this.updateWaveform();
                }

                this.lowerCanvasResolution();

                document.body.classList.add('disable-animations');

                if (this.extremePerformanceMode) {
                    this.simplifyUI();
                }
            } else {
                document.body.classList.remove('performance-mode', 'extreme-performance-mode', 'disable-animations');
                
                const flowingAlbums = document.querySelectorAll('.flowing-album');
                flowingAlbums.forEach(album => {
                    album.style.animation = '';
                });

                this.restoreImageResolution();

                this.showWaveform();
                this.updateWaveform();

                this.restoreCanvasResolution();

                this.restoreUI();
            }
        },
        hideWaveform() {
            if (this.waveform) {
                this.waveform.destroy();
            }
            const waveformElement = document.querySelector("#waveform");
            if (waveformElement) {
                waveformElement.style.display = 'none';
            }
        },
        showWaveform() {
            const waveformElement = document.querySelector("#waveform");
            if (waveformElement) {
                waveformElement.style.display = '';
            }
            this.updateWaveform();
        },
        simplifyUI() {
            document.querySelectorAll('.non-essential').forEach(el => el.style.display = 'none');
            document.querySelector('main').classList.add('simplified-layout');
            document.querySelectorAll('.reduce-spacing').forEach(el => el.classList.add('reduced-spacing'));
        },
        restoreUI() {
            document.querySelectorAll('.non-essential').forEach(el => el.style.display = '');
            document.querySelector('main').classList.remove('simplified-layout');
            document.querySelectorAll('.reduce-spacing').forEach(el => el.classList.remove('reduced-spacing'));
        },
        lowerImageResolution() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.dataset.originalSrc) {
                    img.dataset.originalSrc = img.src;
                    img.dataset.originalWidth = img.width;
                    img.dataset.originalHeight = img.height;
                }
                let scaleFactor;
                if (this.extremePerformanceMode) {
                    scaleFactor = 0.1;
                } else if (this.performanceMode) {
                    scaleFactor = 0.5;
                } else {
                    scaleFactor = 1;
                }
                const newWidth = Math.max(Math.floor(img.dataset.originalWidth * scaleFactor), 16);
                const newHeight = Math.max(Math.floor(img.dataset.originalHeight * scaleFactor), 16);
                img.src = this.resizeImage(img, newWidth, newHeight);
                
                if (this.extremePerformanceMode) {
                    img.classList.add('extreme-low-res');
                } else {
                    img.classList.remove('extreme-low-res');
                }
            });
        },
        restoreImageResolution() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.originalSrc) {
                    img.src = img.dataset.originalSrc;
                    img.width = img.dataset.originalWidth;
                    img.height = img.dataset.originalHeight;
                }
                img.classList.remove('extreme-low-res');
            });
        },
        resizeImage(img, width, height) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            
            if (this.extremePerformanceMode) {
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = Math.max(width / 4, 1);
                tempCanvas.height = Math.max(height / 4, 1);
                tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(tempCanvas, 0, 0, width, height);
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            
            return canvas.toDataURL();
        },
        lowerCanvasResolution() {
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                const ctx = canvas.getContext('2d');
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                canvas.style.width = canvas.width + 'px';
                canvas.style.height = canvas.height + 'px';
                canvas.width = Math.floor(canvas.width * 0.5);
                canvas.height = Math.floor(canvas.height * 0.5);
                ctx.putImageData(imageData, 0, 0);
            });
        },
        restoreCanvasResolution() {
            // This method would need to redraw the canvas at full resolution
            // The implementation depends on how you're originally drawing on the canvas
            // You might need to trigger a redraw of your visualizations here
        },
        isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        isLowEndDevice() {
            const navigator = window.navigator;
            const hardwareConcurrency = navigator.hardwareConcurrency || 2;
            const deviceMemory = navigator.deviceMemory || 2;
            
            return hardwareConcurrency <= 2 || deviceMemory <= 2;
        },
        exportData() {
            const data = {
                playlist: this.playlist,
                currentTrackIndex: this.currentTrackIndex,
                volume: this.volume,
                equalizerBands: this.equalizerBands,
                performanceMode: this.performanceMode,
                extremePerformanceMode: this.extremePerformanceMode,
                backgroundEffects: this.backgroundEffects,
                backgroundMode: this.backgroundMode
            };
            const dataStr = JSON.stringify(data);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = 'yuujin_player_data.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        },
        importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = event => {
                    try {
                        const data = JSON.parse(event.target.result);
                        this.playlist = data.playlist || [];
                        this.currentTrackIndex = data.currentTrackIndex || -1;
                        this.volume = data.volume || 100;
                        this.equalizerBands = data.equalizerBands || this.equalizerBands;
                        this.performanceMode = data.performanceMode || false;
                        this.extremePerformanceMode = data.extremePerformanceMode || false;
                        this.backgroundEffects = data.backgroundEffects !== undefined ? data.backgroundEffects : true;
                        this.backgroundMode = data.backgroundMode || 1;
                        
                        this.applyPerformanceMode();
                        this.initEqualizer();
                        if (this.currentTrackIndex >= 0 && this.currentTrackIndex < this.playlist.length) {
                            this.playTrack(this.currentTrackIndex);
                        }
                    } catch (error) {
                        console.error('Error parsing imported data:', error);
                        alert('Error importing data. Please check the file and try again.');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        },
        clearData() {
            if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                this.playlist = [];
                this.currentTrackIndex = -1;
                this.volume = 100;
                this.equalizerBands = this.equalizerBands.map(band => ({ ...band, gain: 0 }));
                this.performanceMode = false;
                this.extremePerformanceMode = false;
                this.backgroundEffects = true;
                this.backgroundMode = 1;
                
                this.applyPerformanceMode();
                this.initEqualizer();
                this.audio.pause();
                this.isPlaying = false;
                this.currentView = 'library';
            }
        },
        showArtistInfo() {
            const artistName = encodeURIComponent(this.currentTrack.artist);
            this.artistInfoUrl = `https://www.bing.com/search?q=${artistName}`;
            this.showArtistInfoModal = true;
        },
        closeArtistInfo() {
            this.showArtistInfoModal = false;
        },
        openModal() {
            this.showModal = true;
            document.getElementById('infoModal').style.display = 'flex';
        },
        closeModal() {
            this.showModal = false;
            document.getElementById('infoModal').style.display = 'none';
        },
        toggleDesktopLyrics() {
            if (this.desktopLyricsEnabled) {
              this.hideDesktopLyrics();
            } else {
              this.showDesktopLyrics();
            }
          },
        
          showDesktopLyrics() {
            if (window.pywebview) {
              window.pywebview.api.show_desktop_lyrics(this.currentLyric)
                .then(response => {
                  console.log('Desktop lyrics shown:', response);
                  this.desktopLyricsEnabled = true;
                })
                .catch(error => {
                  console.error('Error showing desktop lyrics:', error);
                  this.desktopLyricsEnabled = false;
                });
            } else {
              console.warn('pywebview is not available. Desktop lyrics cannot be shown.');
              this.desktopLyricsEnabled = false;
            }
          },
        
          hideDesktopLyrics() {
            if (window.pywebview) {
              window.pywebview.api.show_desktop_lyrics('')
                .then(() => {
                  this.desktopLyricsEnabled = false;
                })
                .catch(error => {
                  console.error('Error hiding desktop lyrics:', error);
                });
            }
          },

          adjustTransparency() {
            const root = document.documentElement;
            const opacity = this.isDarkMode ? '0.7' : '0.5';
            root.style.setProperty('--bg-opacity', opacity);
        },
        
        toggleBackgroundMode() {
            this.backgroundMode = this.backgroundMode === 1 ? 2 : 1;
            
            // Update the visualization
            if (this.backgroundMode === 2 && this.isPlaying) {
                this.setupBarVisualizer();
            } else {
                this.stopBarVisualizer();
            }
        },
        
        setupBarVisualizer() {
            const canvas = document.getElementById('barVisualizer');
            if (!canvas) return;
            
            canvas.style.display = 'block';
            
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // If we're already connected to an analyzer, don't create a new one
            if (!this.barAnalyser) {
                this.barAnalyser = this.audioContext.createAnalyser();
                const source = this.audioContext.createMediaElementSource(this.audio);
                source.connect(this.barAnalyser);
                this.barAnalyser.connect(this.audioContext.destination);
            }
            
            this.barAnalyser.fftSize = 256;
            const bufferLength = this.barAnalyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const ctx = canvas.getContext('2d');
            const width = canvas.width = window.innerWidth;
            const height = canvas.height = window.innerHeight;
            
            // Set barVisualizerActive to true to start the animation
            this.barVisualizerActive = true;
            
            const renderFrame = () => {
                if (!this.barVisualizerActive) return;
                
                requestAnimationFrame(renderFrame);
                
                this.barAnalyser.getByteFrequencyData(dataArray);
                
                ctx.clearRect(0, 0, width, height);
                
                // Create gradient background
                const gradient = ctx.createLinearGradient(0, 0, 0, height);
                if (this.isDarkMode) {
                    gradient.addColorStop(0, 'rgba(10, 10, 30, 0.8)');
                    gradient.addColorStop(1, 'rgba(30, 30, 60, 0.8)');
                } else {
                    gradient.addColorStop(0, 'rgba(200, 220, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(230, 240, 255, 0.8)');
                }
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
                
                // Draw bars
                const barWidth = (width / bufferLength) * 2.5;
                let x = 0;
                
                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = (dataArray[i] / 255) * height * 0.8;
                    
                    // Create gradient for bars
                    const barGradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
                    if (this.isDarkMode) {
                        barGradient.addColorStop(0, '#0a84ff');
                        barGradient.addColorStop(1, '#0071e3');
                    } else {
                        barGradient.addColorStop(0, '#0071e3');
                        barGradient.addColorStop(1, '#0a84ff');
                    }
                    
                    ctx.fillStyle = barGradient;
                    ctx.fillRect(x, height - barHeight, barWidth, barHeight);
                    
                    x += barWidth + 1;
                }
            };
            
            renderFrame();

            
        },
        
        stopBarVisualizer() {
            this.barVisualizerActive = false;
            const canvas = document.getElementById('barVisualizer');
            if (canvas) {
                canvas.style.display = 'none';
            }
        }
    },
    mounted() {
        this.audio.addEventListener('timeupdate', this.updateProgress);
        this.audio.addEventListener('ended', this.playNext);
        
        this.audio.addEventListener('error', (e) => {
            console.error("Audio error:", e);
        });

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.toggleDarkMode();
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                if (!this.isDarkMode) this.toggleDarkMode();
            } else {
                if (this.isDarkMode) this.toggleDarkMode();
            }
        });

        if (window.innerWidth < 768) {
            this.sidebarOpen = false;
        }

        window.addEventListener('resize', () => {
            if (this.backgroundMode === 2 && this.barVisualizerActive) {
                this.setupBarVisualizer();
            }
            
            if (window.innerWidth >= 768 && !this.sidebarOpen) {
                this.sidebarOpen = true;
            } else if (window.innerWidth < 768 && this.sidebarOpen) {
                this.sidebarOpen = false;
            }
        });

        this.updateFeatherIcons();

        this.resizeObserver = new ResizeObserver(() => {
            if (this.currentView === 'lyrics') {
                this.scrollToActiveLyric();
            }
        });
        this.resizeObserver.observe(this.$el);

        MIDI.loadPlugin({
            soundfontUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
            instrument: "acoustic_grand_piano",
            onprogress: (state, progress) => {
                console.log(state, progress);
            },
            onsuccess: () => {
                console.log('MIDI.js initialized');
            }
        });

        this.initEqualizer();

        document.addEventListener('click', (event) => {
            const dropdown = this.$el.querySelector('.custom-select');
            if (dropdown && !dropdown.contains(event.target)) {
                this.isDropdownOpen = false;
            }
        });

        if (this.isMobileDevice()) {
            this.performanceMode = true;
            if (this.isLowEndDevice()) {
                this.extremePerformanceMode = true;
            }
            this.applyPerformanceMode();
        }
    },
    updated() {
        this.updateFeatherIcons();
    },
    beforeDestroy() {
        this.audio.removeEventListener('timeupdate', this.updateProgress);
        this.audio.removeEventListener('ended', this.playNext);
        this.audio.removeEventListener('error', this.handleAudioError);
        if (this.waveform) {
            this.waveform.destroy();
        }
        window.removeEventListener('resize', this.handleResize);
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.handleColorSchemeChange);
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.audioContext) {    
            this.audioContext.close();
        }
        document.removeEventListener('click', this.handleOutsideClick);
        
        this.stopBarVisualizer();
    }
});
