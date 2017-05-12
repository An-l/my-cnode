export default function getSize() {
    let windowW, windowH, contentH, contentW, scrollT;
    windowH = window.innerHeight;
    windowW = window.innerWidth;
    scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    contentH = (document.documentElement.scrollHeight > document.body.scrollHeight)
        ? document.documentElement.scrollHeight
        : document.body.scrollHeight;
    contentW = (document.documentElement.scrollWidth > document.body.scrollWidth)
        ? document.documentElement.scrollWidth
        : document.body.scrollWidth;
    
    return {
        windowH,
        windowW,
        contentH,
        contentW,
        scrollT
    }
}