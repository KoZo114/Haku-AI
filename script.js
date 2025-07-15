// カテゴリ切り替え機能
document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const workCategories = document.querySelectorAll('.work-category');

    // カテゴリタブのクリックイベント
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.dataset.category;
            
            // アクティブなタブの切り替え
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // アクティブなカテゴリの切り替え
            workCategories.forEach(category => {
                category.classList.remove('active');
                if (category.dataset.category === targetCategory) {
                    category.classList.add('active');
                }
            });
            
            // スムーズスクロール
            const worksSection = document.querySelector('.works-section');
            worksSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // パーティクルアニメーションの追加効果
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // マウス追従エフェクト
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const particleBg = heroSection.querySelector('.particle-bg::before');
            if (particleBg) {
                heroSection.style.setProperty('--mouse-x', x + '%');
                heroSection.style.setProperty('--mouse-y', y + '%');
            }
        });
    }

    // スクロール時のヘッダー効果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const opacity = Math.max(0, 1 - scrollTop / window.innerHeight);
            heroSection.style.opacity = opacity;
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 観察対象の要素を設定
    const animatedElements = document.querySelectorAll('.work-item, .category-section, .about-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ビデオの自動再生制御
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            if (this.paused) {
                this.currentTime = 0;
            }
        });
    });

    // 外部リンクのセキュリティ強化
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // パフォーマンス最適化: 画像とビデオの遅延読み込み
    const mediaElements = document.querySelectorAll('img, video');
    const mediaObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;
                if (media.dataset.src) {
                    media.src = media.dataset.src;
                    media.removeAttribute('data-src');
                }
                mediaObserver.unobserve(media);
            }
        });
    });

    mediaElements.forEach(media => {
        mediaObserver.observe(media);
    });

    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.warn('メディアファイルの読み込みエラー:', e.target.src);
    });

    // アクセシビリティの向上
    const focusableElements = document.querySelectorAll('button, a, video');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid hsl(266, 100%, 70%)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// ユーティリティ関数
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// パフォーマンス監視
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('ページ読み込み時間:', loadTime + 'ms');
    });
}
