// Hamburger-Menü für Mobilgeräte
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Beitragsübersicht laden
    const postList = document.getElementById('post-list');
    const posts = [
        {
            title: 'Zahlungsverkehr in SAP Treasury optimieren',
            excerpt: 'Erfahren Sie, wie Sie den Zahlungsverkehr in SAP Treasury effizient konfigurieren und automatisieren.',
            link: 'posts/post1.html',
            date: '04. Juli 2025',
            category: 'SAP Treasury',
            readTime: '5 Min. Lesezeit'
        },
        {
            title: 'ABAP Best Practices für S/4HANA',
            excerpt: 'Erfahren Sie, wie Sie sauberen und effizienten ABAP-Code für SAP S/4HANA schreiben.',
            link: 'posts/post2.html',
            date: '05. Juli 2025',
            category: 'ABAP',
            readTime: '6 Min. Lesezeit'
        },
        {
            title: 'Einführung in SAP Fiori für Anfänger',
            excerpt: 'Eine Schritt-für-Schritt-Anleitung zur Erstellung Ihrer ersten SAP Fiori-App.',
            link: 'posts/post3.html',
            date: '06. Juli 2025',
            category: 'SAP Fiori',
            readTime: '4 Min. Lesezeit'
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
});