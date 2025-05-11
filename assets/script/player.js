document.addEventListener('DOMContentLoaded', function() {
    createMusicPlayer()
    
    initializePlayer()
})

const playlist = [
    {
        title: "no hay problema",
        artist: "Ed Maverick",
        url: "https://files.catbox.moe/ca6kdt.mp3",
        cover: "../assets/covers/eddy.jpeg"
    },
    {
        title: "Voices of Despair",
        artist: "Dhioma",
        url: "https://files.catbox.moe/7cgqmw.mp3",
        cover: "../assets/covers/voices.jpeg"
    },
    {
        title: "Unity 2017",
        artist: "Konrad Mil",
        url: "https://files.catbox.moe/gmhnld.mp3",
        cover: "../assets/covers/unity.jpeg"
    },
    {
        title: "Road So Far",
        artist: "TonyZ",
        url: "https://files.catbox.moe/duiq6a.mp3",
        cover: "../assets/covers/tony.jpg"
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        url: "https://files.catbox.moe/otpzpg.mp3",
        cover: "../assets/covers/faded.png"
    },
    {
        title: "Landscape",
        artist: "Jarico",
        url: "https://files.catbox.moe/vwdkft.mp3",
        cover: "../assets/covers/landsc.jpeg"
    }
]

function createMusicPlayer() {
    const playerWrapper = document.createElement('div')
    playerWrapper.className = 'music-player-wrapper'
    
    const playerContainer = document.createElement('div')
    playerContainer.className = 'music-player'
    playerContainer.id = 'musicPlayer'
    
    const toggleButton = document.createElement('div')
    toggleButton.className = 'player-toggle'
    toggleButton.innerHTML = '<i class="fas fa-music"></i>'
    
    const albumArt = document.createElement('div')
    albumArt.className = 'album-art'
    albumArt.id = 'albumArt'
    
    const songInfo = document.createElement('div')
    songInfo.className = 'song-info'
    songInfo.innerHTML = `
        <div class="song-title" id="songTitle"></div>
        <div class="song-artist" id="songArtist"></div>
    `
    
    const progressContainer = document.createElement('div')
    progressContainer.className = 'progress-container'
    progressContainer.id = 'progressContainer'
    
    const progressBar = document.createElement('div')
    progressBar.className = 'progress-bar'
    progressBar.id = 'progressBar'
    
    progressContainer.appendChild(progressBar)
    
    const playerControls = document.createElement('div')
    playerControls.className = 'player-controls'
    playerControls.innerHTML = `
        <div class="control-button" id="prevButton">
            <i class="fas fa-step-backward"></i>
        </div>
        <div class="control-button play-pause" id="playPauseButton">
            <i class="fas fa-play" id="playPauseIcon"></i>
        </div>
        <div class="control-button" id="nextButton">
            <i class="fas fa-step-forward"></i>
        </div>
    `
    
    const volumeContainer = document.createElement('div')
    volumeContainer.className = 'volume-container'
    
    const volumeIcon = document.createElement('div')
    volumeIcon.className = 'volume-icon'
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'
    
    const volumeSlider = document.createElement('div')
    volumeSlider.className = 'volume-slider'
    volumeSlider.id = 'volumeSlider'
    
    const volumeLevel = document.createElement('div')
    volumeLevel.className = 'volume-level'
    volumeLevel.id = 'volumeLevel'
    
    volumeSlider.appendChild(volumeLevel)
    volumeContainer.appendChild(volumeIcon)
    volumeContainer.appendChild(volumeSlider)
    
    const closeButton = document.createElement('div')
    closeButton.className = 'close-player'
    closeButton.id = 'closePlayer'
    closeButton.innerHTML = '<i class="fas fa-times"></i>'
    
    const playlistToggle = document.createElement('div')
    playlistToggle.className = 'playlist-toggle'
    playlistToggle.id = 'playlistToggle'
    playlistToggle.innerHTML = '<i class="fas fa-list"></i>'
    
    playerContainer.appendChild(toggleButton)
    playerContainer.appendChild(albumArt)
    playerContainer.appendChild(songInfo)
    playerContainer.appendChild(progressContainer)
    playerContainer.appendChild(playerControls)
    playerContainer.appendChild(volumeContainer)
    playerContainer.appendChild(closeButton)
    playerContainer.appendChild(playlistToggle)
    
    playerWrapper.appendChild(playerContainer)
    
    const playlistContainer = document.createElement('div')
    playlistContainer.className = 'playlist-container'
    playlistContainer.id = 'playlistContainer'
    
    const playlistHeader = document.createElement('div')
    playlistHeader.className = 'playlist-header'
    playlistHeader.textContent = 'Playlist'
    
    playlistContainer.appendChild(playlistHeader)
    
    playlist.forEach((song, index) => {
        const playlistItem = document.createElement('div')
        playlistItem.className = 'playlist-item'
        playlistItem.dataset.index = index
        
        const thumbnail = document.createElement('div')
        thumbnail.className = 'playlist-thumbnail'
        thumbnail.style.backgroundImage = `url('${song.cover}')`
        
        const info = document.createElement('div')
        info.className = 'playlist-info'
        info.innerHTML = `
            <div class="playlist-title">${song.title}</div>
            <div class="playlist-artist">${song.artist}</div>
        `
        
        playlistItem.appendChild(thumbnail)
        playlistItem.appendChild(info)
        
        playlistContainer.appendChild(playlistItem)
    })
    
    document.body.appendChild(playlistContainer)
    
    document.body.appendChild(playerWrapper)
    
    const audioElement = document.createElement('audio')
    audioElement.id = 'audioElement'
    document.body.appendChild(audioElement)
}

function initializePlayer() {
    let currentSongIndex = 0
    let isPlaying = false
    let volume = 0.7
    
    const player = document.getElementById('musicPlayer')
    const playlistContainer = document.getElementById('playlistContainer')
    const toggleButton = document.querySelector('.player-toggle')
    const audioElement = document.getElementById('audioElement')
    const playPauseButton = document.getElementById('playPauseButton')
    const playPauseIcon = document.getElementById('playPauseIcon')
    const prevButton = document.getElementById('prevButton')
    const nextButton = document.getElementById('nextButton')
    const closeButton = document.getElementById('closePlayer')
    const playlistToggle = document.getElementById('playlistToggle')
    const progressContainer = document.getElementById('progressContainer')
    const progressBar = document.getElementById('progressBar')
    const volumeSlider = document.getElementById('volumeSlider')
    const volumeLevel = document.getElementById('volumeLevel')
    const volumeIcon = document.querySelector('.volume-icon')
    
    audioElement.volume = volume
    volumeLevel.style.width = (volume * 100) + '%'
    
    toggleButton.addEventListener('click', function() {
        player.classList.toggle('expanded')
        
        if (player.classList.contains('expanded') && !audioElement.src) {
            loadSong(currentSongIndex)
        }
    })
    
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation()
        player.classList.remove('expanded')
    })
    
    playlistToggle.addEventListener('click', function(e) {
        e.stopPropagation()
        playlistContainer.classList.toggle('active')
    })
    
    document.addEventListener('click', function(e) {
        if (!playlistContainer.contains(e.target) && e.target !== playlistToggle && !playlistToggle.contains(e.target)) {
            playlistContainer.classList.remove('active')
        }
    })
    
    playPauseButton.addEventListener('click', function(e) {
        e.stopPropagation()
        
        if (isPlaying) {
            pauseSong()
        } else {
            playSong()
        }
    })
    
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation()
        playPrevious()
    })
    
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation()
        playNext()
    })
    
    audioElement.addEventListener('timeupdate', function() {
        const progressPercent = (audioElement.currentTime / audioElement.duration) * 100
        progressBar.style.width = progressPercent + '%'
    })
    
    progressContainer.addEventListener('click', function(e) {
        e.stopPropagation()
        const width = this.clientWidth
        const clickX = e.offsetX
        const duration = audioElement.duration
        
        audioElement.currentTime = (clickX / width) * duration
    })
    
    volumeSlider.addEventListener('click', function(e) {
        e.stopPropagation()
        const width = this.clientWidth
        const clickX = e.offsetX
        
        volume = clickX / width
        audioElement.volume = volume
        volumeLevel.style.width = (volume * 100) + '%'
        
        updateVolumeIcon()
    })
    
    volumeIcon.addEventListener('click', function(e) {
        e.stopPropagation()
        
        if (audioElement.volume > 0) {
            volumeIcon.dataset.lastVolume = audioElement.volume
            audioElement.volume = 0
            volumeLevel.style.width = '0%'
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
        } else {
            const lastVol = volumeIcon.dataset.lastVolume || 0.7
            audioElement.volume = lastVol
            volumeLevel.style.width = (lastVol * 100) + '%'
            updateVolumeIcon()
        }
    })
    
    const playlistItems = document.querySelectorAll('.playlist-item')
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.dataset.index)
            currentSongIndex = index
            loadSong(currentSongIndex)
            playSong()
            
            if (!player.classList.contains('expanded')) {
                player.classList.add('expanded')
            }
            
            playlistContainer.classList.remove('active')
        })
    })
    
    audioElement.addEventListener('ended', function() {
        playNext()
    })
    
    function loadSong(index) {
        currentSongIndex = index
        
        const song = playlist[index]
        
        audioElement.src = song.url
        
        document.getElementById('albumArt').style.backgroundImage = `url('${song.cover}')`
        document.getElementById('songTitle').textContent = song.title
        document.getElementById('songArtist').textContent = song.artist
        
        playlistItems.forEach(item => {
            item.classList.remove('playing')
            if (parseInt(item.dataset.index) === index) {
                item.classList.add('playing')
            }
        })
    }
    
    function playSong() {
        if (!audioElement.src) {
            loadSong(currentSongIndex)
        }
        
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error)
            
            alert('Unable to play audio. Make sure a valid audio URL is provided.')
        })
        
        isPlaying = true
        playPauseIcon.className = 'fas fa-pause'
        playPauseButton.classList.add('play-pulse')
        
        toggleButton.innerHTML = '<i class="fas fa-pause"></i>'
    }
    
    function pauseSong() {
        audioElement.pause()
        isPlaying = false
        playPauseIcon.className = 'fas fa-play'
        playPauseButton.classList.remove('play-pulse')
        
        toggleButton.innerHTML = '<i class="fas fa-music"></i>'
    }
    
    function playNext() {
        currentSongIndex++
        if (currentSongIndex > playlist.length - 1) {
            currentSongIndex = 0
        }
        
        loadSong(currentSongIndex)
        playSong()
    }
    
    function playPrevious() {
        currentSongIndex--
        if (currentSongIndex < 0) {
            currentSongIndex = playlist.length - 1
        }
        
        loadSong(currentSongIndex)
        playSong()
    }
    
    function updateVolumeIcon() {
        if (audioElement.volume > 0.5) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'
        } else if (audioElement.volume > 0) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>'
        } else {
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
        }
    }
    
    document.addEventListener('keydown', function(e) {
        if (player.classList.contains('expanded')) {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault()
                if (isPlaying) {
                    pauseSong()
                } else {
                    playSong()
                }
            }
            
            if (e.code === 'ArrowLeft' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                playPrevious()
            }
            
            if (e.code === 'ArrowRight' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                playNext()
            }
            
            if ((e.code === 'ArrowUp' || e.code === 'ArrowDown') && 
                e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault()
                
                if (e.code === 'ArrowUp') {
                    volume = Math.min(volume + 0.1, 1)
                } else {
                    volume = Math.max(volume - 0.1, 0)
                }
                
                audioElement.volume = volume
                volumeLevel.style.width = (volume * 100) + '%'
                updateVolumeIcon()
            }
        }
    })
    
    loadSong(currentSongIndex)
}