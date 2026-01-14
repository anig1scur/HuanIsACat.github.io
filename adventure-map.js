// ==========================================
// 1. 数据配置中心 (Data Config)
// ==========================================
const adventureData = [
    {
        id: 'profile',
        x: '45%', y: '50%',
        type: 'image',
        iconSrc: 'images/main/warrior.png', 
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
        x: '90%', y: '40%',
        type: 'image',
        iconSrc: 'images/main/scroll.png', 
        title: { zh: '卷轴', en: 'Scrolls' },
        desc: {
            zh: '这里存放着关于技术与哲学的思考记录。',
            en: 'Records of thoughts on technology and philosophy.'
        },
        links: [
            { url: 'dream-journals.html', zh: '✦ 梦境幻象', en: '✦ Dream Visions' },
            { url: 'campaign-logs.html', zh: '✦ 炉火轶闻', en: '✦ Hearthside Tales' },
            // 记叙那些惊心动魄的战役，与火光中的笑语。
        ]
    },
    {
        id: 'crystal',
        x: '30%', y: '38%',
        type: 'image',
        iconSrc: 'images/main/crystal.png',
        title: { zh: '记忆碎片', en: 'Crystal Visions' },
        desc: {
            zh: '透过水晶球，你可以看到过去的影像。',
            en: 'View images and recordings from the past.'
        },
        links: [
            { url: 'jiong-journals.html', zh: '✦ 魔宠观察档案', en: '✦ Familiar Observation Notes' },
            { url: 'real-life-journals.html', zh: '✦ 尘世行纪', en: '✦ Mundane Journal' }
        ]
    }
];



// ==========================================
// 2. 核心渲染逻辑
// ==========================================
function renderMarkers() {
    // 修改这里：目标变为 markersWrapper
    const layer = document.getElementById('markersWrapper'); 
    if (!layer) return;
    
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