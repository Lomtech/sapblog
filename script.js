// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded'); // Debug log

    // Basis-URL für GitHub Pages und lokale Entwicklung
    const baseUrl = window.location.hostname === 'localhost' ? '' : '/sapblog';

    // Hamburger-Menü für Mobilgeräte
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Verhindert Doppelklicks auf Touch
            toggleMenu();
        });

        // Schließt Menü bei Klick außerhalb
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Beitragsübersicht laden
    const postList = document.getElementById('post-list');
    if (postList) {
        const posts = [
            {
                title: 'BADI Implementierung zur Prüfung von Wertpapierstammdaten',
                excerpt: 'Erfahren Sie, wie Sie den Zahlungsverkehr in SAP Treasury effizient konfigurieren und automatisieren.',
                link: `${baseUrl}/posts/post1.html`,
                date: '04. Juli 2025',
                category: 'SAP Treasury',
                readTime: '5 Min. Lesezeit'
            }
        ];

        postList.innerHTML = posts
            .map(
                (post) => `
            <div class="post-card">
                <div class="post-image">
                    <div class="placeholder-image">${post.category}</div>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="category">${post.category}</span>
                        <time>${post.date}</time>
                        <span class="read-time">${post.readTime}</span>
                    </div>
                    <h3 class="post-title"><a href="${post.link}">${post.title}</a></h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="${post.link}" class="read-more">Weiterlesen</a>
                </div>
            </div>
        `
            )
            .join('');
    }

    // Dynamische Navigation: Unterstrich verschieben
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    // Funktion zum Entfernen und Setzen der .active-Klasse
    const setActiveLink = (href) => {
        navLinks.forEach((link) => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            const normalizedLink = linkHref.startsWith('/') ? linkHref : `/${linkHref}`;
            const normalizedHref = href.startsWith('/') ? href : `/${href}`;
            if (normalizedLink === normalizedHref || normalizedLink.split('#')[0] === normalizedHref) {
                link.classList.add('active');
            }
        });
    };

    // Setze .active basierend auf der aktuellen Seite
    const pathSegments = currentPath.split('/');
    const currentFile = pathSegments[pathSegments.length - 1] || '';

    if (currentFile === '' || currentPath === '/sapblog/' || currentPath === '/sapblog') {
        setActiveLink('/sapblog/');
    } else if (currentFile === 'datenschutz.html') {
        setActiveLink('/sapblog/datenschutz.html');
    } else if (pathSegments.includes('posts')) {
        setActiveLink('/sapblog/');
    }

    // Behandle Ankerlinks (#about, #contact) auf index.html
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && (currentFile === '' || currentPath === '/sapblog/' || currentPath === '/sapblog')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    setActiveLink(href);
                    // Schließt Menü bei Klick auf Ankerlink (Mobilgeräte)
                    if (navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            } else {
                setActiveLink(href);
            }
        });

        // Touch-Event für bessere Reaktionszeit
        link.addEventListener('touchstart', (e) => {
            e.preventDefault();
            link.click();
        });
    });

    // Aktualisiere .active beim Scrollen auf index.html
    if (currentFile === '' || currentPath === '/sapblog/' || currentPath === '/sapblog') {
        const sections = ['posts', 'about', 'contact'];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        const href = sectionId ? `#${sectionId}` : '/sapblog/';
                        setActiveLink(href);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -50% 0px',
                threshold: 0.1
            }
        );

        sections.forEach((id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }
});