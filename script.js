// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded'); // Debug log

    // Hamburger-Menü für Mobilgeräte
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Beitragsübersicht laden
    const postList = document.getElementById('post-list');
    if (postList) {
        const posts = [
            {
                title: 'BADI Implementierung zur Prüfung von Wertpapierstammdaten',
                excerpt: 'Erfahren Sie, wie Sie den Zahlungsverkehr in SAP Treasury effizient konfigurieren und automatisieren.',
                link: '/posts/post1',
                date: '04. Juli 2025',
                category: 'SAP Treasury',
                readTime: '5 Min. Lesezeit'
            }
        ];

        postList.innerHTML = posts.map(post => `
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
        `).join('');
    }

    // Dynamische Navigation: Unterstrich verschieben
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Funktion zum Entfernen und Setzen der .active-Klasse
    const setActiveLink = (href) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    };

    // Setze .active basierend auf der aktuellen Seite
    if (currentPath === 'index.html' || currentPath === '') {
        setActiveLink('index.html');
    } else if (currentPath === 'datenschutz.html') {
        setActiveLink('datenschutz.html');
    } else {
        // Für Post-Seiten (z. B. post1.html) Home aktivieren
        setActiveLink('../index.html');
    }

    // Behandle Ankerlinks (#about, #contact) auf index.html
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && currentPath === 'index.html') {
                e.preventDefault(); // Verhindert Standard-Scroll
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Berücksichtigt fixed Header
                        behavior: 'smooth'
                    });
                    setActiveLink(href);
                }
            } else {
                setActiveLink(href);
            }
        });
    });

    // Aktualisiere .active beim Scrollen auf index.html
    if (currentPath === 'index.html' || currentPath === '') {
        const sections = ['posts', 'about', 'contact'];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const href = sectionId ? `#${sectionId}` : 'index.html';
                    setActiveLink(href);
                }
            });
        }, {
            rootMargin: '-100px 0px -50% 0px', // Trigger, wenn Abschnitt 50% sichtbar ist
            threshold: 0.1
        });

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }
});