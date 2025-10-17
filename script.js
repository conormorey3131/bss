// Enhanced language switcher script
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Check if translations are available
    if (!window.translations) {
        console.error('Translations object not found!');
        window.translations = { en: {}, ru: {} };
    } else {
        console.log('Translations found:', Object.keys(window.translations));
        console.log('Russian translations keys:', Object.keys(window.translations.ru || {}).length);
    }
    
    const languageButtons = document.querySelectorAll('.lang-btn');
    if (languageButtons.length === 0) {
        console.error('Language buttons not found!');
        return;
    }
    
    const translateElements = document.querySelectorAll('[data-translate-key]');
    console.log(`Found ${translateElements.length} elements with data-translate-key`);
    
    let currentLanguage = 'en'; // Default language
    
    // Function to update text content based on selected language
    function updateLanguage(language) {
        console.log(`Updating language to: ${language}`);
        currentLanguage = language;
        
        if (!window.translations[language]) {
            console.error(`No translations found for language: ${language}`);
            return;
        }
        
        // Update active button styling
        languageButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === language) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update video source based on language
        const videoElement = document.getElementById('presentation-video');
        if (videoElement) {
            // Save current time and playing state
            const currentTime = videoElement.currentTime;
            const wasPlaying = !videoElement.paused;
            
            // Change video source based on language
            if (language === 'ru') {
                videoElement.querySelector('source').src = '2141654424972243138-r.mp4';
            } else {
                // For English, use the English video
                videoElement.querySelector('source').src = '532693626218070186-e.mp4';
            }
            
            // Reload the video with the new source
            videoElement.load();
            
            // Restore time position and playing state
            videoElement.addEventListener('loadedmetadata', function onceLoaded() {
                videoElement.currentTime = currentTime;
                if (wasPlaying) {
                    videoElement.play();
                }
                videoElement.removeEventListener('loadedmetadata', onceLoaded);
            });
        }
        
        // Update all elements with translations
        translateElements.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            
            if (language === 'en') {
                // For English, use the original text in the data-translate-key attribute
                // or the English translation if available
                const text = window.translations.en[key] || key;
                element.innerHTML = text;
                
                // For input placeholders
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', text);
                }
            } else if (window.translations[language] && window.translations[language][key]) {
                // Use translation from the selected language
                element.innerHTML = window.translations[language][key];
                
                // For input placeholders
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', window.translations[language][key]);
                }
            } else {
                console.warn(`No translation found for key: ${key} in language: ${language}`);
            }
        });
        
        // Save language preference
        localStorage.setItem('preferredLanguage', language);
        
        // Update HTML lang attribute
        document.documentElement.lang = language;
        
        console.log(`Language switched to: ${language}`);
    }
    
    // Add event listeners to language buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log(`Language button clicked: ${lang}`);
            updateLanguage(lang);
        });
    });
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        console.log(`Found saved language preference: ${savedLanguage}`);
        updateLanguage(savedLanguage);
    }
    
    // Add subtle animation effects to enhance UX
    const sections = document.querySelectorAll('section');
    
    // Simple scroll animation using Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        console.log('Hamburger menu clicked');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
        }
    });
});
