// ==========================================
// 1. 数据配置中心 (Data Config)
// ==========================================
const adventureData = [
    {
        id: 'profile',
        x: '60%', y: '35%',
        type: 'image',
        iconSrc: 'mage.png', 
        title: { zh: '冒险者档案', en: 'Adventurer Profile' },
        subtitle: { zh: 'Huan the Nerd (Lv 10)', en: 'Human the Nerd (Lv 10)' },
        desc: {
            zh: '带有“金鱼的记忆”诅咒的冒险者，羽毛球配音演员，过去十年做得最多的是翻译/本地化',
            en: 'An adventurer cursed with the Memory of a Goldfish, voice actress for badminton games, translator for the past decade.'
        },
        stats: [
            { label: 'STR', val: 16 },
            { label: 'CON', val: 14 },
            { label: 'CHA', val: 12 }
        ],
        footer: {
            zh: '❤ 魔宠：白猫囧囧',
            en: '❤ Familiar: Jiong Jiong (囧囧)'
        }
    },
    {
        id: 'scrolls',
        x: '20%', y: '30%',
        type: 'svg',
        iconShape: 'scrollIcon', 
        title: { zh: '卷轴', en: 'Scrolls' },
        desc: {
            zh: '这里存放着关于技术与哲学的思考记录。',
            en: 'Records of thoughts on technology and philosophy.'
        },
        links: [
            { url: '#', zh: '✦ 梦帐', en: '✦ Dreams' },
            { url: '#', zh: '✦ 跑团战报', en: '✦ D&D Adventure Logs' },
            { url: '#', zh: '✦ AI辅助翻译作品', en: '✦ AI-enhanced Translations' }
        ]
    },
    {
        id: 'crystal',
        x: '70%', y: '70%',
        type: 'svg',
        iconShape: 'crystalIcon',
        title: { zh: '记忆碎片', en: 'Crystal Visions' },
        desc: {
            zh: '透过水晶球，你可以看到过去的影像。',
            en: 'View images and recordings from the past.'
        },
        links: [
            { url: '#', zh: '✦ [相册] 魔宠', en: '✦ [Gallery] Familiar' },
            { url: 'story-dany.html', zh: '✦ 精选内容', en: '✦ Selects' }
        ]
    }
];

// SVG 图标库
const svgLibrary = {
    scrollIcon: `
        <circle cx="50" cy="50" r="45" fill="#f3eacb" stroke-width="2"/>
        <rect x="25" y="30" width="50" height="40" rx="5" fill="#fffef0" stroke="#2c241b" stroke-width="2"/>
        <rect x="20" y="30" width="5" height="40" fill="#8b7355"/>
        <rect x="75" y="30" width="5" height="40" fill="#8b7355"/>
        <path d="M75 25 L85 15 L85 20 L75 30 Z" fill="#2c241b" stroke="none"/>
        <line x1="75" y1="25" x2="60" y2="40" stroke="#2c241b" stroke-width="2"/>
    `,
    crystalIcon: `
        <circle cx="50" cy="50" r="45" fill="#f3eacb" stroke-width="2"/>
        <circle cx="50" cy="35" r="25" fill="#fffef0" stroke="#2c241b" stroke-width="2"/>
        <path d="M30 60 L70 60 L65 70 L35 70 Z" fill="#8b7355" stroke="#2c241b" stroke-width="1"/>
        <circle cx="55" cy="30" r="5" fill="#f3eacb" opacity="0.8"/>
    `
};

// ==========================================
// 2. 核心渲染逻辑
// ==========================================
function renderMarkers() {
    const layer = document.getElementById('mapLayer');
    layer.innerHTML = ''; 

    adventureData.forEach(item => {
        const marker = document.createElement('div');
        marker.className = 'marker';
        marker.style.top = item.y;
        marker.style.left = item.x;
        marker.onclick = function() { togglePopup(this); };

        let iconHtml = '';
        if (item.type === 'image') {
            iconHtml = `<img src="${item.iconSrc}" class="marker-img" alt="${item.title.en}">`;
        } else if (item.type === 'svg') {
            iconHtml = `<svg class="marker-icon" viewBox="0 0 100 100" stroke-linecap="round" stroke-linejoin="round">${svgLibrary[item.iconShape]}</svg>`;
        }

        const statsHtml = item.stats ? `
            <div class="stats-row">
                ${item.stats.map(s => `<div class="stat-item"><label>${s.label}</label><span>${s.val}</span></div>`).join('')}
            </div>` : '';

        const footerHtml = item.footer ? `
            <p style="text-align:center; margin-top:10px;">
                <span class="content-zh">${item.footer.zh}</span>
                <span class="content-en">${item.footer.en}</span>
            </p>` : '';

        const linksHtml = item.links ? `
            <ul class="link-list">
                ${item.links.map(l => `<li><a href="${l.url}"><span class="content-zh">${l.zh}</span><span class="content-en">${l.en}</span></a></li>`).join('')}
            </ul>` : '';

        const subtitleHtml = item.subtitle ? `
            <div class="card-subtitle content-zh">${item.subtitle.zh}</div>
            <div class="card-subtitle content-en">${item.subtitle.en}</div>` : '';

        marker.innerHTML = `
            ${iconHtml}
            <div class="card-popup">
                <div class="card-title content-zh">${item.title.zh}</div>
                <div class="card-title content-en">${item.title.en}</div>
                ${subtitleHtml}
                <div class="card-content">
                    <p class="content-zh">${item.desc.zh}</p>
                    <p class="content-en">${item.desc.en}</p>
                    ${statsHtml}
                    ${linksHtml}
                    ${footerHtml}
                </div>
            </div>
        `;
        layer.appendChild(marker);
    });
}

// ==========================================
// 3. 页面交互逻辑
// ==========================================
let currentLang = 'zh';

function switchLanguage() {
    const body = document.body;
    currentLang = body.classList.contains('lang-zh') ? 'en' : 'zh';
    body.classList.remove('lang-zh', 'lang-en');
    body.classList.add(`lang-${currentLang}`);
    document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
}

function togglePopup(element) {
    event.stopPropagation();
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
    if (!isActive) {
        element.classList.add('active');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('lang-zh');
    renderMarkers();
    
    document.getElementById('mapContainer').addEventListener('click', function() {
        document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
    });
});