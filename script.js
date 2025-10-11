// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button click handlers
    const tryNowBtn = document.querySelector('.btn-primary');
    const learnMoreBtn = document.querySelector('.btn-secondary');
    const getAllInfoBtn = document.querySelector('.btn-info');

    if (tryNowBtn) {
        tryNowBtn.addEventListener('click', function() {
            // In a real application, this would redirect to the try-on interface
            alert('Try-on feature coming soon! This would redirect to the virtual try-on interface.');
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to features section
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                const offsetTop = featuresSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (getAllInfoBtn) {
        getAllInfoBtn.addEventListener('click', function() {
            displayAllInfo();
        });
    }

    // Add active nav link highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', highlightActiveNavLink);

    // Header background opacity on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(102, 126, 234, 0.95)';
        } else {
            header.style.backgroundColor = '';
        }
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Simple form validation for future contact form
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const animatedElements = document.querySelectorAll('section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Console welcome message
    console.log('Welcome to TryOnYou! 👔✨');
    console.log('Virtual try-on technology powered by Ya-va');

    // Extract all website information function
    function getAllWebsiteInfo() {
        const info = {
            company: {
                name: "TryOnYou",
                tagline: "Experience Virtual Try-On",
                description: "Revolutionize your shopping experience with our cutting-edge virtual try-on technology. See how clothes, accessories, and more look on you before making a purchase.",
                about: "We're pioneering the future of online retail with innovative virtual try-on solutions. Our technology helps customers make better purchasing decisions while reducing returns and increasing satisfaction.",
                technology: "Powered by Ya-va Technology",
                copyright: "© 2024 TryOnYou. All rights reserved."
            },
            contact: {
                email: "hello@tryonyou.app",
                website: "tryonyou.app"
            },
            features: [],
            navigation: [],
            content: {
                sections: []
            }
        };

        // Extract navigation items
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            info.navigation.push({
                text: link.textContent.trim(),
                href: link.getAttribute('href'),
                target: link.getAttribute('href').replace('#', '')
            });
        });

        // Extract features
        const featureElements = document.querySelectorAll('.feature');
        featureElements.forEach(feature => {
            const icon = feature.querySelector('.feature-icon')?.textContent.trim();
            const title = feature.querySelector('h3')?.textContent.trim();
            const description = feature.querySelector('p')?.textContent.trim();
            
            info.features.push({
                icon: icon,
                title: title,
                description: description
            });
        });

        // Extract all sections content
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const heading = section.querySelector('h2')?.textContent.trim();
            const paragraphs = Array.from(section.querySelectorAll('p')).map(p => p.textContent.trim());
            const buttons = Array.from(section.querySelectorAll('button')).map(btn => btn.textContent.trim());
            
            info.content.sections.push({
                id: sectionId,
                heading: heading,
                paragraphs: paragraphs,
                buttons: buttons
            });
        });

        return info;
    }

    // Make the function globally accessible
    window.getAllWebsiteInfo = getAllWebsiteInfo;

    // Display all info function
    function displayAllInfo() {
        const allInfo = getAllWebsiteInfo();
        console.log('=== ALL WEBSITE INFORMATION ===');
        console.log(JSON.stringify(allInfo, null, 2));
        
        // Create a formatted display
        let infoDisplay = `
=== TryOnYou Complete Information ===

COMPANY INFORMATION:
- Name: ${allInfo.company.name}
- Tagline: ${allInfo.company.tagline}
- Description: ${allInfo.company.description}
- About: ${allInfo.company.about}
- Technology: ${allInfo.company.technology}
- Copyright: ${allInfo.company.copyright}

CONTACT INFORMATION:
- Email: ${allInfo.contact.email}
- Website: ${allInfo.contact.website}

NAVIGATION STRUCTURE:
${allInfo.navigation.map(nav => `- ${nav.text} (${nav.href})`).join('\n')}

FEATURES & BENEFITS:
${allInfo.features.map(feature => `- ${feature.icon} ${feature.title}: ${feature.description}`).join('\n')}

WEBSITE SECTIONS:
${allInfo.content.sections.map(section => {
    let sectionText = `\n[${section.id.toUpperCase()}]`;
    if (section.heading) sectionText += `\nHeading: ${section.heading}`;
    if (section.paragraphs.length) sectionText += `\nContent: ${section.paragraphs.join(' ')}`;
    if (section.buttons.length) sectionText += `\nButtons: ${section.buttons.join(', ')}`;
    return sectionText;
}).join('\n')}
        `;

        // Create options for user
        const choice = prompt(`Choose how to get the information:
1. View formatted text (type 'text')
2. Download as JSON file (type 'json')  
3. Copy to clipboard (type 'copy')
4. View in console (type 'console')

Type your choice:`);

        switch(choice?.toLowerCase()) {
            case 'text':
                alert(infoDisplay);
                break;
            case 'json':
                downloadInfoAsJSON(allInfo);
                break;
            case 'copy':
                copyToClipboard(infoDisplay);
                break;
            case 'console':
            default:
                console.log(infoDisplay);
                alert('Information has been logged to the browser console (F12 → Console tab)');
                break;
        }
        
        return allInfo;
    }

    // Download information as JSON file
    function downloadInfoAsJSON(info) {
        const dataStr = JSON.stringify(info, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'tryonyou-website-info.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        alert('Website information has been downloaded as JSON file!');
    }

    // Copy to clipboard function
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Information copied to clipboard!');
            }).catch(() => {
                fallbackCopyTextToClipboard(text);
            });
        } else {
            fallbackCopyTextToClipboard(text);
        }
    }

    // Fallback copy function for older browsers
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('Information copied to clipboard!');
        } catch (err) {
            alert('Unable to copy to clipboard. Information is available in the console.');
            console.log(text);
        }
        
        document.body.removeChild(textArea);
    }

    // Make display function globally accessible
    window.displayAllInfo = displayAllInfo;

    // Add keyboard shortcut to extract info (Ctrl+I or Cmd+I)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            displayAllInfo();
        }
    });
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        opacity: 1;
        border-bottom: 2px solid white;
        padding-bottom: 2px;
    }
`;
document.head.appendChild(style);