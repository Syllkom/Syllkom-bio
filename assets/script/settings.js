document.addEventListener('DOMContentLoaded', function() {
    createThemeElements()
    initializeTheme()
    setupThemeEventListeners()
})

function createThemeElements() {
    const themeToggle = document.createElement('div')
    themeToggle.id = 'theme-toggle'
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>'
    document.body.appendChild(themeToggle)
    
    const themePanel = document.createElement('div')
    themePanel.className = 'theme-panel'
    
    const themeOptions = document.createElement('div')
    themeOptions.className = 'theme-options'
    
    const themes = [
        ['default', 'Default Theme'],
        ['dark', 'Dark Theme'],
        ['grey', 'Grey Theme']
    ]
    
    themes.forEach(theme => {
        const themeOption = document.createElement('div')
        themeOption.className = `theme-option theme-${theme[0]}`
        themeOption.dataset.theme = theme[0]
        themeOption.title = theme[1]
        themeOptions.appendChild(themeOption)
    })
    
    themePanel.appendChild(themeOptions)
    
    document.body.appendChild(themePanel)
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('biolink-theme')
    
    if (savedTheme) {
        applyTheme(savedTheme)
        
        const activeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`)
        if (activeOption) {
            activeOption.classList.add('active')
        }
    } else {
        const defaultOption = document.querySelector('.theme-option[data-theme="default"]')
        if (defaultOption) {
            defaultOption.classList.add('active')
        }
    }
}

function setupThemeEventListeners() {
    const themeToggle = document.getElementById('theme-toggle')
    const themePanel = document.querySelector('.theme-panel')
    
    if (themeToggle && themePanel) {
        themeToggle.addEventListener('click', function() {
            themePanel.classList.toggle('active')
        })
    }
    
    const themeOptions = document.querySelectorAll('.theme-option')
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme
            
            themeOptions.forEach(opt => opt.classList.remove('active'))
            
            this.classList.add('active')
            
            applyTheme(theme)
            
            
            themeToggle.classList.add('animate-theme-change')
            setTimeout(() => {
                themeToggle.classList.remove('animate-theme-change')
            }, 500)
            
            setTimeout(() => {
                themePanel.classList.remove('active')
            }, 300)
        })
    })
    
    document.addEventListener('click', function(e) {
        if (!themePanel.contains(e.target) && e.target !== themeToggle && !themeToggle.contains(e.target)) {
            themePanel.classList.remove('active')
        }
    })
}

function applyTheme(theme) {
    const themeClasses = ['theme-default', 'theme-dark', 'theme-grey']
    
    document.body.classList.remove(...themeClasses)
    
    if (theme !== 'default') {
        document.body.classList.add(`theme-${theme}`)
    }
    
    document.body.classList.add('theme-transition')
    
    setTimeout(() => {
        document.body.classList.remove('theme-transition')
    }, 1000)
}

const styleSheet = document.createElement('style')
styleSheet.textContent = `
    @keyframes theme-button-pulse {
        0% { transform: scale(1) }
        50% { transform: scale(1.2) }
        100% { transform: scale(1) }
    }
    
    .animate-theme-change {
        animation: theme-button-pulse 0.5s ease;
    }
    
    .theme-transition * {
        transition: all 0.5s ease !important;
    }
`
document.head.appendChild(styleSheet)