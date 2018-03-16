const throttle = require('./utils/throttle.js');
const requestAnimFrame = require('./utils/requestAnimFrame.js');

module.exports = function( stickyElt, givenPosition, {
    unit = 'px',
    updateHeightOnScroll = false,
    wrapper = true,
    minimumWidth = false,
    bottom = false
} = {} ){

    if ( typeof stickyElt == 'undefined' || stickyElt == null ) return;
    
    let position, eltHeight, posTop, belowWidth, offset;
    let windowHeight = window.innerHeight; 
    let windowWidth = window.outerWidth; 
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let wrapperSticky;


    const checkWindowHeight = () => {
        windowHeight = window.innerHeight; 
        windowWidth = window.outerWidth; 

        if( unit === 'vh' ){
            eltHeight = stickyElt.offsetHeight;
            position = windowHeight / (100/givenPosition) - eltHeight/2;
        }else{
            position = givenPosition;
        }
    }
    
    const scrollHandler = () => {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;         

        if( updateHeightOnScroll && stickyElt.classList.contains('collant')) stickyElt.dataset.height = stickyElt.offsetHeight;

        if( bottom ){

            if( scrollTop + windowHeight >= parseFloat(stickyElt.dataset.offsetBottom, 10) + position ){
                stickyElt.classList.remove('collant');
                stickyElt.style.bottom = parseFloat(stickyElt.dataset.initialPos, 10);
            }else{
                stickyElt.classList.add('collant');
                stickyElt.style.bottom = position+'px';
            }

            if( minimumWidth && belowWidth ){
                stickyElt.classList.remove('collant', 'collant-stuck');
                stickyElt.style.top = '';
                stickyElt.style.bottom = parseFloat(stickyElt.dataset.initialPos, 10);
            }

        }else{

            posTop = stickyElt.dataset.initialPos === 'auto' ? 0 : parseFloat(stickyElt.dataset.initialPos, 10);


            if( scrollTop >= parseFloat(stickyElt.dataset.offsetTop, 10) - position + posTop ){
                stickyElt.classList.add('collant')
                stickyElt.style.top = `${position}px`;
                console.log(offset.top + scrollTop, offset.top, scrollTop)

                if( scrollTop + position + parseFloat(stickyElt.dataset.height, 10) >= parseFloat(stickyElt.dataset.offsetBottom, 10) ){
                    stickyElt.classList.remove('collant')
                    stickyElt.classList.add('collant-stuck')
                    stickyElt.style.top = 'auto';
                    stickyElt.style.bottom = '0';
                }else{
                    stickyElt.classList.add('collant')
                    stickyElt.classList.remove('collant-stuck')
                    stickyElt.style.top = `${position}px`;
                    stickyElt.style.bottom = '';
                }
            }else{
                stickyElt.classList.remove('collant');
                stickyElt.style.top = parseFloat(stickyElt.dataset.initialPos, 10);
            }

            if( minimumWidth && belowWidth ){
                stickyElt.classList.remove('collant', 'collant-stuck')
                stickyElt.style.top = parseFloat(stickyElt.dataset.initialPos, 10);
                stickyElt.style.bottom = '';
            }

        }
    }

    const setDatas = () => {
        offset = wrapperSticky.getBoundingClientRect();
        belowWidth = minimumWidth && windowWidth <= minimumWidth;

        stickyElt.dataset.offsetTop = wrapper ? offset.top + scrollTop : 0;


        stickyElt.dataset.offsetBottom = offset.top + scrollTop + wrapperSticky.offsetHeight;
        stickyElt.dataset.height = stickyElt.offsetHeight;
    }

    const resizeHandler = () => {
        checkWindowHeight();
        setDatas();
        scrollHandler();
    }

    wrapperSticky = stickyElt.dataset.collant ? document.querySelector(`.wrapper-collant[data-collant="${stickyElt.dataset.collant}"]`) : document.querySelector(`.wrapper-collant`);

    setDatas();
    stickyElt.dataset.initialPos = bottom ? getComputedStyle(stickyElt)['bottom'] : getComputedStyle(stickyElt)['top'];

    checkWindowHeight();
    scrollHandler();

    
    document.addEventListener('scroll', throttle(function(){
        requestAnimFrame(scrollHandler);
    }, 10), false);

    window.addEventListener('resize', throttle(function(){
        requestAnimFrame(resizeHandler);
    }, 10));
}
