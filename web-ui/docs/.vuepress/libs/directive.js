let fadeInElements = null;
let curElement = null;

let visibleRect = null;
let visibleRectElemTop = null;
let visibleRectElemBottom = null;

let unvisibleRect = null;
let unvisibleRectElemTop = null;
let unvisibleRectElemBottom = null;
let unvisibleRectElemTopAll = null;
let fadeinArr = [];

const privacyMethods = {

    isElemVisible (el) {
        visibleRect = el.getBoundingClientRect();
        visibleRectElemTop = visibleRect.top + 200;
        visibleRectElemBottom = visibleRect.bottom - 200;
        return visibleRectElemTop < window.innerHeight && visibleRectElemBottom >= 0;
    },
    isElemUnvisible (el) {
        unvisibleRect = el.getBoundingClientRect();
        unvisibleRectElemTopAll = unvisibleRect.top;
        unvisibleRectElemBottom = unvisibleRect.bottom;
        unvisibleRectElemTop = unvisibleRect.top + unvisibleRect.height;
        return unvisibleRectElemTop <  0 || !(unvisibleRectElemTopAll < window.innerHeight && unvisibleRectElemBottom >= 0);
    },
    handleScroll () {
        for (let i = 0; i < fadeInElements.length; i++) {
            curElement = fadeInElements[i];
            if (privacyMethods.isElemVisible(curElement)) {
                curElement.style.opacity = '1';
                curElement.style.transform = 'translate3d(0, 0, 0) scale(1)';
            }
            if(privacyMethods.isElemUnvisible(curElement)){
                curElement.style.opacity = '0';
                curElement.style.transform = 'scale(0.8)';
            }
        }
    }
}

const exportMethods = {
    fade : {
        inserted(el){
            fadeInElements = fadeinArr.concat(Array.from(el.getElementsByClassName('fade-in')));
            fadeinArr = fadeInElements;
            document.addEventListener('scroll', privacyMethods.handleScroll);
            privacyMethods.handleScroll();
        },
        unbind() {
            document.removeEventListener('scroll', privacyMethods.handleScroll);
            fadeinArr = [];
        }
    }
};

export default exportMethods;