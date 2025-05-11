// Settings all
const all = {
    name: 'David',
    nickname: '@Syllkom',
    about: 'La peor enfermedad es el aburrimiento. Programar es una medicina que combate la inactividad. Al sumergirse en líneas de código, se generan soluciones y se estimula la mente. La creatividad se activa y el tiempo se ocupa de manera productiva. Así, la monotonía se disipa y surgen nuevos desafíos.',
    image: './assets/img/icon.png', // icon
    website: 'https://syllkom-proto.netlify.app/'
}

// Media link's
const mediaLinks = {
    facebook: 'https://facebook.com/syllkom374',
    whatsapp: 'https://wa.me/573113825327',
    instagram: 'https://instagram.com/syllkom',
    youtube: 'https://youtube.com/syllkom',
    github: 'https://github.com/syllkom'
}

// Action link's
const actionLinks = {
    portfolio: 'https://syllkom-proto.netlify.app/',
    contact: 'https://wa.me/573113825327',
    projects: 'https://horekuos.netlify.app/',
    freeCall: 'https://wa.me/573113825327',
    codeFree: 'https://github.com/syllkom',
    plugins: 'https://github.com/syllkom'
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('profileName').textContent = all.name
    document.getElementById('profileNickname').textContent = all.nickname
    document.getElementById('profileAbout').textContent = all.about
    document.getElementById('websiteUrl').textContent = all.website
    document.getElementById('websiteUrl').href = all.website
    
    document.getElementById('profileImage').style.backgroundImage = `url('${all.image}')`
    
    const websiteLink = document.getElementById('websiteUrl')
    const websiteLinkContainer = document.querySelector('.website-link')
    
    websiteLink.addEventListener('click', function(e) {
        e.preventDefault()
        websiteLinkContainer.classList.add('active')
        
        const linkGlow = document.createElement('div')
        linkGlow.classList.add('link-glow')
        websiteLinkContainer.appendChild(linkGlow)
        
        setTimeout(() => {
            window.location.href = all.website
        }, 500)
    })
    
    websiteLink.addEventListener('mousedown', function() {
        websiteLinkContainer.classList.add('active')
    })
    
    websiteLink.addEventListener('mouseout', function() {
        websiteLinkContainer.classList.remove('active')
    })
    
    websiteLink.addEventListener('mouseup', function() {
        setTimeout(() => {
            if (!websiteLinkContainer.contains(document.activeElement)) {
                websiteLinkContainer.classList.remove('active')
            }
        }, 100)
    })
    
    function animateButtonClick(element, url) {
        element.addEventListener('click', function(e) {
            e.currentTarget.classList.add('clicked')
            
            const ripple = document.createElement('span')
            ripple.classList.add('ripple')
            this.appendChild(ripple)
            
            const x = e.clientX - e.target.getBoundingClientRect().left
            const y = e.clientY - e.target.getBoundingClientRect().top
            
            ripple.style.left = `${x}px`
            ripple.style.top = `${y}px`
            
            setTimeout(() => {
                ripple.remove()
                window.location.href = url
            }, 300)
        })
    }
    
    animateButtonClick(document.getElementById('portfolioLink'), actionLinks.portfolio)
    animateButtonClick(document.getElementById('contactLink'), actionLinks.contact)
    animateButtonClick(document.getElementById('projectsLink'), actionLinks.projects)
    animateButtonClick(document.getElementById('freeCallLink'), actionLinks.freeCall)
    animateButtonClick(document.getElementById('codeFreeLink'), actionLinks.codeFree)
    animateButtonClick(document.getElementById('pluginsLink'), actionLinks.plugins)
    
    const socialContainer = document.getElementById('socialLinksContainer')
    
    function createSocialIcon(platform, url) {
        const link = document.createElement('a')
        link.href = url
        link.className = 'social-icon'
        link.target = '_blank'
        
        const icon = document.createElement('i')
        
        switch(platform) {
            case 'facebook':
                icon.className = 'fab fa-facebook-f'
                break
            case 'whatsapp':
                icon.className = 'fab fa-whatsapp'
                break
            case 'instagram':
                icon.className = 'fab fa-instagram'
                break
            case 'youtube':
                icon.className = 'fab fa-youtube'
                break
            case 'github':
                icon.className = 'fab fa-github'
                break
            default:
                icon.className = 'fas fa-link'
        }
        
        link.appendChild(icon)
        return link
    }
    
    for (const [platform, url] of Object.entries(mediaLinks)) {
        if (url) {
            const socialIcon = createSocialIcon(platform, url)
            socialContainer.appendChild(socialIcon)
        }
    }
})
