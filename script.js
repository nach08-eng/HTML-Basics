document.addEventListener('DOMContentLoaded', () => {
    const flipbookElement = document.getElementById('flipbook');
    
    // SMART SPREAD CONFIGURATION
    const pageFlip = new St.PageFlip(
        flipbookElement,
        {
            width: 600, // Base page width
            height: 850, // Base page height
            size: 'stretch',
            minWidth: 300,
            maxWidth: 1200, 
            minHeight: 400,
            maxHeight: 1800, 
            maxShadowOpacity: 0.6,
            showCover: true,
            mobileScrollSupport: true,
            usePortrait: false, // Always show side-by-side spread
            startPage: 0,
            drawShadow: true,
            flippingTime: 600,
            useMouseEvents: true,
            swipeDistance: 30,
            showPageCorners: true,
            disableFlipByClick: true
        }
    );

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    const pageNum = document.getElementById('page-num');
    const updatePageUI = () => {
        const current = pageFlip.getCurrentPageIndex() + 1;
        const total = pageFlip.getPageCount();
        pageNum.innerText = `${current} / ${total}`;
    };

    pageFlip.on('flip', updatePageUI);
    pageFlip.on('init', updatePageUI);

    document.addEventListener('click', (e) => {
        const prevBtn = e.target.closest('#prev-page');
        const nextBtn = e.target.closest('#next-page');
        if (prevBtn) pageFlip.flipPrev();
        if (nextBtn) pageFlip.flipNext();
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.run-btn');
        if (!btn) return;

        const outputId = btn.getAttribute('data-output');
        const parentPage = btn.closest('.page');
        if (!parentPage) return;

        const codeElement = parentPage.querySelector('code');
        if (!codeElement) return;

        const snippet = codeElement.innerText;
        const outputContainer = document.getElementById(outputId);
        
        if (outputContainer) {
            outputContainer.innerHTML = `<div class="output-html-preview">${snippet}</div>`;
            outputContainer.classList.add('run-pulse');
            setTimeout(() => outputContainer.classList.remove('run-pulse'), 600);
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('code[contenteditable]')) {
            e.stopPropagation();
        }
    }, true);

    window.addEventListener('resize', () => {
        pageFlip.update();
    });
});
